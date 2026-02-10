const https = require('https');
const url = "https://student-engagement-k7ke0corv-nikhilreddy-hubs-projects.vercel.app/login";
https.get(url, (res) => {
    console.log(`STATUS:${res.statusCode}`);
});
