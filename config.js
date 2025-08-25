// Configuration for backend API endpoints
const config = {
    // Development (local)
    development: {
        apiBaseUrl: 'http://localhost:3000'
    },
    // Production (Railway)
    production: {
        apiBaseUrl: 'https://your-app-name.railway.app' // Replace with your actual Railway URL
    }
};

// Auto-detect environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? config.development : config.production;

// Export the current configuration
window.API_CONFIG = currentConfig;
