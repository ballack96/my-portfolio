import * as React from "react"
import { Link } from "gatsby"
import { withPrefix } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";



const Header = ({ siteTitle = "Ranojoy Deb" }) => {

  const data = useStaticQuery(graphql`
    query {
      contentfulGatsbyPortfolio {
        headshots {
          title
          gatsbyImageData(layout: FIXED, width: 30, placeholder: BLURRED)
        }
      }
    }
  `);
  
  const pixarMeHeadshot = data.contentfulGatsbyPortfolio.headshots.find(
    (img) => img.title.toLowerCase() === "pixarme"
  );

  return (
    <header style={{ background: '#5F6A6A', padding: '0.5%' }}>
      <div style={{ margin: 'auto', minWidth:'100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', fontSize: '1', whiteSpace:'nowrap' }}>
        {pixarMeHeadshot && (
          <GatsbyImage image={getImage(pixarMeHeadshot)} alt="Pixar Avatar" />
        )}
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            {siteTitle}
          </Link>
        </h2>
        <nav>
          <Link to="/profile" style={{ color: 'white', marginRight: '0.5rem', textDecoration: 'none' }}>Profile</Link>
          <Link to="/projects" style={{ color: 'white', marginRight: '0.5rem', textDecoration: 'none' }}>Projects</Link>
          <Link to="/blog" style={{ color: 'white', marginRight: '0.5rem', textDecoration: 'none' }}>Blog</Link>
          <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header
