/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */


/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});


module.exports = {
  pathPrefix: "my-portfolio/",  // GitHub Pages path 
  assetPrefix: "my-portfolio/", // for broken fonts/images
  siteMetadata: {
    title: `My Portfolio`,
    description: `A simple portfolio website.`,
    author: `@ballack96`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`, // If using styled-components
      options: {
        displayName: true,
        pure: true,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        allowList: ["GATSBY_UNSPLASH_ACCESS_KEY"], // Ensure Gatsby allows this variable
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true, // This helps with local development
      },
    }, // <- Closing bracket added here
  ],
};

