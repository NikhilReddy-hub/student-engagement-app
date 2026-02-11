const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkMembers() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const members = await mongoose.connection.db.collection('projectmembers').find().toArray();
        console.log("PROJECT_MEMBERS_START");
        console.log(JSON.stringify(members, null, 2));
        console.log("PROJECT_MEMBERS_END");
        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkMembers();
