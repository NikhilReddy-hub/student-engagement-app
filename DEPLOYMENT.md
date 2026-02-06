# Deployment Guide - Student Engagement App

This guide will help you deploy your Student Engagement App to Vercel with a PostgreSQL database.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- PostgreSQL database (see options below)

## Step 1: Set Up PostgreSQL Database

Choose one of these options:

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Navigate to **Storage** tab
3. Click **Create Database**
4. Select **Postgres**
5. Choose your region and create the database
6. Copy the `DATABASE_URL` connection string

### Option B: Neon (Free Tier Available)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Format: `postgresql://user:password@host/database?sslmode=require`

### Option C: Supabase (Free Tier Available)

1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection String** (Transaction mode)
5. Replace `[YOUR-PASSWORD]` with your actual password

### Option D: Railway (Free Tier Available)

1. Sign up at [railway.app](https://railway.app)
2. Create a new project
3. Add **PostgreSQL** service
4. Copy the `DATABASE_URL` from the **Connect** tab

## Step 2: Generate JWT Secret

Run this command in your terminal to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output - you'll need it for the next step.

## Step 3: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `DATABASE_URL` | Your PostgreSQL connection string | Production, Preview, Development |
| `JWT_SECRET` | Your generated secret from Step 2 | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

> **Important:** Make sure to select all environments (Production, Preview, Development) for each variable.

## Step 4: Push Code to GitHub

If you haven't already:

```bash
cd Student-engagement-app-
git init
git add .
git commit -m "Initial commit with deployment fixes"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 5: Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js
4. Click **Deploy**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 6: Run Database Migrations

After deployment, you need to run Prisma migrations:

### Option A: Using Vercel CLI

```bash
# Connect to your production environment
vercel env pull .env.production

# Run migrations
npx prisma migrate deploy
```

### Option B: Using Vercel Dashboard

1. Go to your project on Vercel
2. Navigate to **Deployments**
3. Click on the latest deployment
4. Go to **Functions** tab
5. The build process should automatically run `prisma migrate deploy`

### Option C: Manual Migration (if needed)

If migrations don't run automatically:

1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull`
4. Run migrations: `npx prisma migrate deploy`

## Step 7: Verify Deployment

1. Visit your deployed URL (e.g., `https://your-app.vercel.app`)
2. Go to the signup page: `https://your-app.vercel.app/signup`
3. Try creating a new account
4. Check Vercel logs if you encounter errors:
   - Go to **Deployments** → Click on your deployment → **Functions** tab
   - Look for any error messages

## Troubleshooting

### Error: "Can't reach database server"

**Solution:**
- Verify `DATABASE_URL` is correctly set in Vercel environment variables
- Ensure the database is accessible from the internet
- Check if your database requires SSL (add `?sslmode=require` to connection string)

### Error: "Prisma Client not found"

**Solution:**
- Ensure `prisma generate` runs during build
- Check that `package.json` has the correct build script:
  ```json
  "build": "prisma generate && next build"
  ```

### Error: "Invalid JWT Secret"

**Solution:**
- Verify `JWT_SECRET` is set in Vercel environment variables
- Make sure it's a strong, random string (not the default value)

### Error: "Migration failed"

**Solution:**
- Run migrations manually using Vercel CLI
- Check database permissions
- Ensure the database is empty or has compatible schema

### 500 Internal Server Error on /api/auth/register

**Solution:**
- Check Vercel function logs for detailed error
- Verify all environment variables are set
- Ensure database migrations have been applied
- Check that the database is running and accessible

## Post-Deployment Checklist

- [ ] Database is set up and accessible
- [ ] Environment variables are configured in Vercel
- [ ] Database migrations have been applied
- [ ] Signup functionality works
- [ ] Login functionality works
- [ ] JWT tokens are being generated
- [ ] Cookies are being set correctly

## Monitoring and Logs

To view logs in Vercel:

1. Go to your project dashboard
2. Click on **Deployments**
3. Select the deployment you want to inspect
4. Navigate to **Functions** tab to see API route logs
5. Check **Runtime Logs** for real-time error tracking

## Database Management

### View Database Data

Use Prisma Studio to view your production data:

```bash
# Pull production environment variables
vercel env pull .env.production

# Open Prisma Studio
npx prisma studio
```

### Backup Database

For Vercel Postgres:
- Backups are automatic
- Access them in **Storage** → Your database → **Backups**

For other providers, check their documentation for backup procedures.

## Security Best Practices

1. **Never commit `.env` files** - They're in `.gitignore` by default
2. **Use strong JWT secrets** - Generate with crypto.randomBytes
3. **Enable SSL for database** - Add `?sslmode=require` to DATABASE_URL
4. **Rotate secrets regularly** - Update JWT_SECRET periodically
5. **Monitor logs** - Check Vercel logs for suspicious activity

## Need Help?

- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Prisma Documentation](https://www.prisma.io/docs)
- Review error logs in Vercel dashboard
- Check the browser console for client-side errors
