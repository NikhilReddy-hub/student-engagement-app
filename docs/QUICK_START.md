# 🚀 Quick Testing Workflow

## Prerequisites
- ✅ Dev server running on `http://localhost:3000`
- ✅ Prisma Studio running on `http://localhost:5555`

---

## 🧪 Test Workflow (15 minutes)

### Step 1: Create Test Accounts (2 min)

**Create Mentor Account:**
1. Go to `http://localhost:3000/signup`
2. Fill form:
   - Name: `Dr. Smith`
   - Email: `smith@mentor.com`
   - Password: `password123`
   - Role: **Mentor**
3. Click "Sign Up"
4. ✅ Should redirect to mentor dashboard

**Create Student Accounts:**
1. Logout, go to `/signup`
2. Create Student 1:
   - Name: `Alice Johnson`
   - Email: `alice@student.com`
   - Password: `password123`
   - Role: **Student**
3. Logout, create Student 2:
   - Name: `Bob Wilson`
   - Email: `bob@student.com`
   - Password: `password123`
   - Role: **Student**

---

### Step 2: Create Project & Add Members (3 min)

**Login as Mentor** (`smith@mentor.com`)

1. Click **"Create Project"**
2. Fill form:
   - Name: `Mobile App Development`
   - Description: `Build a cross-platform mobile application`
3. Submit → Should redirect to project page

4. Click **"Add Members"** button
5. Select both students (Alice & Bob)
6. Click "Add Selected Members"
7. ✅ Verify both students appear in team members list

---

### Step 3: Assign Tasks (3 min)

**Still as Mentor:**

1. Click **"Assign New Task"**
2. Create Task 1:
   - Title: `Design UI Mockups`
   - Description: `Create wireframes and mockups`
   - Assignee: **Alice Johnson**
   - Due Date: Pick tomorrow
3. Submit → Returns to project page

4. Click **"Assign New Task"** again
5. Create Task 2:
   - Title: `Setup Backend API`
   - Description: `Initialize Node.js backend`
   - Assignee: **Bob Wilson**
   - Due Date: Pick tomorrow
6. ✅ Verify both tasks appear on project page

---

### Step 4: Complete Tasks as Students (3 min)

**Login as Alice** (`alice@student.com`)

1. Check dashboard → See "Design UI Mockups" task
2. Click **"View"** on the task
3. Click **"Mark as Completed"**
4. ✅ Status changes to "Done"
5. Return to dashboard
6. ✅ Project status should update

**Login as Bob** (`bob@student.com`)

1. See "Setup Backend API" task
2. Click "View" → Mark as Completed
3. ✅ Both tasks now done

---

### Step 5: Give Peer Feedback (2 min)

**Still as Bob:**

1. Click **"Give Feedback"** button (blue button in navbar)
2. Select Project: `Mobile App Development`
3. Select Teammate: `Alice Johnson`
4. Rate: Click **5 stars** ⭐⭐⭐⭐⭐
5. Comment: `Great work on the UI! Very clean designs.`
6. Submit
7. ✅ Success message appears

**Login as Alice** (`alice@student.com`)

1. Click **"Give Feedback"**
2. Select Project: `Mobile App Development`
3. Select Teammate: `Bob Wilson`
4. Rate: **4 stars** ⭐⭐⭐⭐
5. Comment: `Solid backend implementation!`
6. Submit

---

### Step 6: Verify Feedback (2 min)

**As Alice:**
1. Click **"My Feedback"** link
2. ✅ See feedback from Bob (4 stars, comment)

**As Bob:**
1. Click **"My Feedback"**
2. ✅ See feedback from Alice (5 stars, comment)

**Login as Mentor** (`smith@mentor.com`)
1. Click **"Team Feedback"** button
2. ✅ See all feedback from the project

---

### Step 7: Test Search (1 min)

**As Student:**
1. Type "mobile" in search box
2. ✅ Project filters in real-time

**As Mentor:**
1. Type "mobile" in search box
2. ✅ Projects filter correctly

---

## ✅ Success Checklist

After testing, verify:
- [ ] All accounts created successfully
- [ ] Project created and visible
- [ ] Students added to project
- [ ] Tasks assigned and appear on student dashboard
- [ ] Tasks can be marked complete
- [ ] Project status shows "Completed" when all tasks done
- [ ] Feedback can be given between students
- [ ] Feedback appears in "My Feedback"
- [ ] Mentor can see all team feedback
- [ ] Search filters projects correctly
- [ ] No console errors
- [ ] UI looks clean and professional

---

## 🐛 If Something Doesn't Work

**Check Prisma Studio** (`http://localhost:5555`):
- Verify users exist in `User` table
- Check projects in `Project` table
- Verify tasks in `Task` table
- Check feedback in `PeerFeedback` table

**Common Issues:**
- **"Not authenticated"** → Clear browser cache, login again
- **Tasks not showing** → Refresh page
- **Feedback not appearing** → Check if users are in same project

---

## 🎉 All Done!

If all checks pass, your app is **production-ready**! 🚀
