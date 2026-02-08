# Student Engagement App - Quick Reference

## 🚀 Running the Application

### Start Development Server
```bash
npm run dev
```
Access at: **http://localhost:3000**

### View Database (Prisma Studio)
```bash
npx prisma studio
```
Access at: **http://localhost:5555**

## 📁 Key Files

- **`.env`** - Environment configuration (database URL, JWT secret)
- **`prisma/schema.prisma`** - Database schema
- **`prisma/dev.db`** - SQLite database file

## 🔧 Common Commands

### Database Management
```bash
# Generate Prisma client after schema changes
npx prisma generate

# Push schema changes to database
npx prisma db push

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset
```

### Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 👥 User Roles

### Student
- View assigned projects
- Complete tasks
- Submit peer feedback
- Track engagement

### Mentor
- Create projects
- Assign tasks
- Manage team members
- View analytics
- Review feedback

## 🌐 Available Routes

### Public
- `/signup` - Create account
- `/login` - Sign in

### Student Routes
- `/dashboard/student` - Student dashboard
- `/projects` - View projects
- `/tasks` - View tasks
- `/feedback` - Submit/view feedback
- `/profile` - User profile

### Mentor Routes
- `/dashboard/mentor` - Mentor dashboard
- `/projects/create` - Create new project
- `/projects/[id]` - Project details
- `/projects/[id]/members` - Manage members
- `/tasks/create` - Create task

## 🔐 Authentication

The app uses JWT-based authentication:
- Tokens stored in HTTP-only cookies
- Automatic role-based routing
- Secure password hashing with bcrypt

## 📊 Database Schema

**Tables:**
- `User` - User accounts
- `Project` - Projects
- `ProjectMember` - Team membership
- `Task` - Project tasks
- `PeerFeedback` - Feedback records
- `EngagementLog` - Activity tracking

## 🐛 Troubleshooting

### Server won't start
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Database errors
```bash
# Regenerate Prisma client
npx prisma generate
npx prisma db push
```

### Environment issues
- Check `.env` file exists
- Verify `DATABASE_URL` is set
- Ensure `JWT_SECRET` is configured

## 📦 Production Deployment

For production (Vercel):
1. Switch to PostgreSQL in `schema.prisma`
2. Set environment variables in Vercel:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `JWT_SECRET` (secure random string)
   - `NODE_ENV=production`
3. Deploy via Git push or Vercel CLI

See [QUICK_FIX.md](file:///C:/Users/vedan/Downloads/student_app/Student-engagement-app-/QUICK_FIX.md) for detailed deployment instructions.
