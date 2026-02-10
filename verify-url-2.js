const https = require('https');

const url = "https://student-engagement-k7ke0corv-nikhilreddy-hubs-projects.vercel.app/login";

console.log(`Checking URL: ${url}`);

const req = https.get(url, (res) => {
    console.log(`STATUS_CODE: ${res.statusCode}`);
    console.log('HEADERS:', JSON.stringify(res.headers, null, 2));

    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        console.log(`BODY_LENGTH: ${data.length}`);
    });
});

req.on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
});

req.end();
