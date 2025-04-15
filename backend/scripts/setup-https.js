const path = require('path');
const { generateCertificate } = require('./config/ssl');

async function setupHttps() {
  console.log('Setting up HTTPS development environment...\n');

  try {
    await generateCertificate();
    
    console.log('\n==========================================================');
    console.log('HTTPS Development Environment Setup Complete!');
    console.log('==========================================================\n');
    console.log('To use the secure backend:');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Access the API at: https://localhost:8080\n');
    console.log('Note: You may need to accept the self-signed certificate');
    console.log('in your browser when first accessing the backend API.');
    console.log('==========================================================');
  } catch (error) {
    console.error('Error setting up HTTPS environment:', error);
    process.exit(1);
  }
}

setupHttps();
