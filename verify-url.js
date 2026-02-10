const https = require('https');

const url = "https://student-engagement-k7ke0corv-nikhilreddy-hubs-projects.vercel.app/login";

console.log(`Checking URL: ${url}`);

https.get(url, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Headers:', res.headers);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Body snippet:', data.substring(0, 500));
        if (res.statusCode >= 200 && res.statusCode < 400) {
            console.log('URL is accessible.');
        } else {
            console.log('URL returned an error status.');
        }
    });

}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
