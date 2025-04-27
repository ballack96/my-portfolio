import React, { useEffect, useState } from 'react';
import Layout from "../components/layout";
import axios from 'axios';
import DataCard from '../components/DataCard';

// Safe extract functions that work in both browser and SSR contexts
const extractImageFromHTML = (html) => {
  if (!html || typeof window === 'undefined') {
    // Simple regex-based extraction for SSR
    const imgRegex = /<img.*?src="(.*?)"/;
    const match = html && html.match(imgRegex);
    return match ? match[1] : '';
  }
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const imgTag = doc.querySelector('img');
    return imgTag ? imgTag.src : '';
  } catch (e) {
    return '';
  }
};

const extractTextFromHTML = (html) => {
  if (!html || typeof window === 'undefined') {
    // Simple regex-based extraction for SSR
    return html ? html.replace(/<[^>]*>/g, '').slice(0, 150) + '...' : '';
  }
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent.trim().slice(0, 150) + '...';
  } catch (e) {
    return html ? html.replace(/<[^>]*>/g, '').slice(0, 150) + '...' : '';
  }
};

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent execution during SSR
    if (typeof window === 'undefined') return;
    
    const fetchMediumPosts = async () => {
      try {
        const mediumUsername = 'r.deb1996'; // Replace with your Medium username
        const response = await axios.get(`https://api.rss2json.com/v1/api.json`, {
          params: {
            rss_url: `https://medium.com/feed/@${mediumUsername}`,
          },
        });

        if (response.data && response.data.items) {
          setPosts(response.data.items.map(post => ({
            title: post.title,
            description: extractTextFromHTML(post.description),
            link: post.link,
            image: extractImageFromHTML(post.description),
          })));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching Medium posts:', error);
        setError('Failed to load Medium posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchMediumPosts();
  }, []);

  return (
    <Layout>
      <section style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#34495E' }}>My Blog Posts</h2>
        {loading ? (
          <p style={{ textAlign: 'center' }}>🔄 Loading posts...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        ) : ( 
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}> 
            {posts.map((post, idx) => (
              <DataCard
                key={idx}
                title={post.title}
                description={post.description}
                link={post.link}
                image={post.image}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default BlogPage;