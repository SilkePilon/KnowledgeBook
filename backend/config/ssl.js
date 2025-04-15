const fs = require('fs');
const path = require('path');
const pem = require('pem');
const { promisify } = require('util');

const createCertificateAsync = promisify(pem.createCertificate);

const SSL_DIR = path.join(__dirname, '..', 'ssl');
const KEY_PATH = path.join(SSL_DIR, 'key.pem');
const CERT_PATH = path.join(SSL_DIR, 'cert.pem');

async function ensureSSLDirectory() {
  if (!fs.existsSync(SSL_DIR)) {
    fs.mkdirSync(SSL_DIR, { recursive: true });
  }
}

async function generateCertificate() {
  try {
    await ensureSSLDirectory();
    
    // Check if certificates already exist
    if (fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH)) {
      return {
        key: fs.readFileSync(KEY_PATH),
        cert: fs.readFileSync(CERT_PATH)
      };
    }

    // Generate new certificates
    const keys = await createCertificateAsync({
      days: 365,
      selfSigned: true,
      commonName: 'localhost',
      altNames: ['localhost', '127.0.0.1'],
    });

    // Save the certificates
    fs.writeFileSync(KEY_PATH, keys.clientKey);
    fs.writeFileSync(CERT_PATH, keys.certificate);

    return {
      key: keys.clientKey,
      cert: keys.certificate
    };
  } catch (error) {
    console.error('Error generating SSL certificates:', error);
    throw error;
  }
}

module.exports = {
  generateCertificate
};
