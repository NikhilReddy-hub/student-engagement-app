const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function checkMembers() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        const ProjectMemberSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, projectId: mongoose.Schema.Types.ObjectId });
        const ProjectMember = mongoose.models.ProjectMember || mongoose.model('ProjectMember', ProjectMemberSchema);

        const ProjectSchema = new mongoose.Schema({ title: String });
        const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

        const UserSchema = new mongoose.Schema({ name: String, role: String });
        const User = mongoose.models.User || mongoose.model('User', UserSchema);

        const members = await ProjectMember.find().lean();
        console.log(`Total ProjectMembers: ${members.length}`);

        for (const m of members) {
            const project = await Project.findById(m.projectId).lean();
            const user = await User.findById(m.userId).lean();
            console.log(`Member: Project="${project?.title}", User="${user?.name}", Role="${user?.role}"`);
        }

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkMembers();
