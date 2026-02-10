const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

// Try loading .env
dotenv.config();

let MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
    console.log('DATABASE_URL not found in .env, checking .env.production...');
    if (fs.existsSync('.env.production')) {
        const envConfig = dotenv.parse(fs.readFileSync('.env.production'));
        MONGODB_URI = envConfig.DATABASE_URL;
        if (MONGODB_URI) {
            console.log('Found DATABASE_URL in .env.production');
        }
    }
}

if (!MONGODB_URI) {
    console.error('Error: DATABASE_URL is not defined in .env or .env.production');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');

// Mask the URI for logging
const maskedURI = MONGODB_URI.replace(/(:[^:@]+@)/, ':****@');
console.log(`Connecting to: ${maskedURI}`);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connection success!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Connection failed:', err.message);
        process.exit(1);
    });
