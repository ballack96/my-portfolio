import * as React from "react"
import Layout from "../components/layout"; // Assuming you have a Layout component
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { graphql, useStaticQuery } from "gatsby";
import ThesisCard from '../components/ThesisCard';
import { withPrefix } from 'gatsby';
import { GatsbyImage,getImage } from "gatsby-plugin-image";

const prefixed = (imgPath) => withPrefix(imgPath);


const ProfilePage = () => {
  const techStack = {
    "Scripting Languages": ["python", "javascript", "r", "go", "sql", "bash"],
    "Data Science & Machine Learning": ["huggingface", "pytorch", "tensorflow"],
    "Frameworks & Tools": ["tableau", "powerbi", "react", "angular", "vuejs", "gatsby", "mongodb", "neo4j"],
    "Cloud Platforms & DevOps": ["azure", "aws", "firebase", "git", "docker", "kubernetes", "apacheairflow"]
  };



  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const data = useStaticQuery(graphql`
    query {
      contentfulGatsbyPortfolio {
          achievements {
            id
            title
            description
            gatsbyImageData(layout: CONSTRAINED)
            file {
              url
            }
          },
          imageLibrary{
            id
            title
            description
            gatsbyImageData(layout: CONSTRAINED)
            file {
              url
            }
          },
          logos{
            id
            title
            description
            file {
              url
            }
          }
        }
    }
  `);

  const images = data.contentfulGatsbyPortfolio.imageLibrary;
  
  const achievements = data.contentfulGatsbyPortfolio.achievements;

  const techStackLogo = data.contentfulGatsbyPortfolio.logos.reduce((acc, logo) => {
      acc[logo.title] = acc[logo.file.url]
      return acc;
  }, {});



  const handleIconError = (e, item) => {
    e.target.onerror = null;
    e.target.src = prefixed(`/tech-stack-logos/icons8-${item}.png`); // fallback to local image if CDN fails
  };


  return (
    console.log("Achievements: ", achievements),
    <Layout>
      <section style={{ padding: '0.5rem', maxWidth: '1600px', margin: '0 auto', textAlign: 'justify' }}>
        <h2 style={{ fontSize: '2rem', color: '#34495E' }}>🙋‍♂️ About Me</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          I am an experienced Data Scientist and Software Engineer with expertise in machine learning, cloud platforms, and full-stack development.
          My career has been dedicated to solving real-world problems using AI, DevOps, and scalable software solutions. My journey started with my time working for Mu Sigma in Bangalore, 
          where over the course of 4 years led a team of decision scientists and data engineers to build data products for Fortune 500 companies.
          <br />
          This experience led me to pursue a Master's degree in Data Science from the University of Pennsylvania, where I worked as a Graduate Research Assistant. During this time, I developed my academic research skills while working on my thesis under Dr. Dusan Ramljak.
          <ThesisCard />
          I am passionate about learning and sharing knowledge, which is why I am actively involved in the tech startup community here in the Greater Philadelphia Area. I am always looking for new opportunities to collaborate and innovate.
        </p>
        <h2 style={{ fontSize: '2rem', color: '#34495E', marginTop: '3rem' }}>🎓 Degrees</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{
            backgroundColor: '#f4f6f6',
            padding: '1.5rem',
            borderRadius: '10px',
            width: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2c3e50' }}>M.S. in Data Analytics</h3>
            <p style={{ fontSize: '1rem', color: '#555' }}>
              The Pennsylvania State University, 2024  
            </p>
          </div>

          <div style={{
            backgroundColor: '#f4f6f6',
            padding: '1.5rem',
            borderRadius: '10px',
            width: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2c3e50' }}>B.E. in Civil Engineering</h3>
            <p style={{ fontSize: '1rem', color: '#555' }}>
              Visvesvaraya Technological University, 2018
            </p>
          </div>
        </div>
        <h2 style={{ marginTop: '2rem', fontSize: '2rem', color: '#34495E' }}>💻 Tech Stack</h2>
        {Object.entries(techStack).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '1rem' }}>
          <h3>{category}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {items.map((item, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px' }}>
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item}/${item}-original.svg`}
                  alt={item}
                  title={item.toUpperCase()}
                  onError={(e) => handleIconError(e, item)}
                  style={{ width: '60px', height: '60px', filter: 'brightness(1.1) contrast(1.1)' }}
                />
              </div>
            ))}
          </div>
        </div>
      ))} 
        <h2 style={{ marginTop: '2rem', fontSize: '2rem', color: '#34495E' }}>🏆 Achievements</h2>
        <Carousel responsive={responsive} infinite autoPlay>
        {achievements.map((ach, index) => (
            <div key={index} style={{ padding: '10px', textAlign: 'center' }}>
              <GatsbyImage image={getImage(ach)} alt={ach.title} style={{  width: '7rem', maxHeight: '7rem', objectFit: 'initial' }} />
              <p style={{ fontWeight: 'bold' }}>{ach.title}</p>
            </div>
          ))}
        </Carousel>

        <h2 style={{ marginTop: '2rem', fontSize: '2rem', color: '#34495E' }}>🎯 Hobbies & Pursuits</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Outside of work, I enjoy exploring my adventurous side. After moving to the United States to pursue my masters degree, I also picked up Brazilian Jiu-Jitsu. I am currently blue belt under the tutelage of Jason Santiago in 
          Daniel Gracie Maineline in Paoli, Pennsylvania. Apart from this, I also enjoy hiking and camping in the beautiful state parks of Pennsylvania.
        </p>
        <Carousel responsive={responsive} infinite autoPlay>
          {images.map((img, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '10px' }}>
              <GatsbyImage image={getImage(img)} alt={img.title} style={{ height: '300px' }} />
              <p style={{fontWeight: 'bold'}}>{img.title}</p>
            </div>
          ))}
        </Carousel>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://drive.google.com/file/d/1kzNGTj6rP30FObaK17UHtCDJhQE8DgGT/view"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '10px 20px', backgroundColor: '#48C9B0', color: '#fff', textDecoration: 'none', fontSize: '1.2rem', borderRadius: '5px' }}
          >
            My Resume
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;