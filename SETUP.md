# Expense Manager - Full Stack Setup

## 📋 Project Structure

```
expensemanager/
├── src/                          # Angular Frontend
│   ├── app/
│   │   ├── login/               # Login component
│   │   ├── signup/              # Sign up component
│   │   ├── dashboard/           # Dashboard component
│   │   ├── services/
│   │   │   ├── auth.service.ts  # Authentication service
│   │   │   └── expense.service.ts # Expense service
│   │   ├── app.routes.ts        # Routes configuration
│   │   ├── app.config.ts        # App configuration
│   │   └── ...
│   └── main.ts                  # Angular entry point
├── backend/                      # Node.js Backend
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Expense.js           # Expense schema
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints (login, register)
│   │   └── expenses.js          # Expense CRUD endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   └── server.js                # Express server entry point
├── package.json                 # Dependencies (Frontend + Backend)
├── .env                         # Environment variables
└── README.md
```

---

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
npm install
```

This will install both Angular and Node.js dependencies.

---

### Step 2: Setup MongoDB

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string
5. Update `.env` file:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expensemanager?retryWrites=true&w=majority
```

---

### Step 3: Configure Environment Variables

Update `.env` file (already created):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expensemanager
JWT_SECRET=your_jwt_secret_key_change_this_in_production
```

---

### Step 4: Start the Application

**Option A: Run Both Frontend & Backend Together**
```bash
npm run dev
```

This command runs:
- Angular frontend on `http://localhost:4200`
- Node.js backend on `http://localhost:5000`

**Option B: Run Separately**

Terminal 1 - Frontend:
```bash
ng serve
```

Terminal 2 - Backend:
```bash
npm run server
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Expenses
- `GET /api/expenses` - Get all expenses (requires token)
- `GET /api/expenses/:id` - Get single expense (requires token)
- `POST /api/expenses` - Create expense (requires token)
- `PUT /api/expenses/:id` - Update expense (requires token)
- `DELETE /api/expenses/:id` - Delete expense (requires token)

---

## 🔐 Authentication Flow

1. User signs up with username, email, password
2. Backend hashes password with bcryptjs
3. Backend generates JWT token
4. Frontend stores token in localStorage
5. Frontend includes token in Authorization header for protected routes
6. Backend verifies token on protected endpoints

---

## 📝 Example API Calls

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

### Create Expense
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount": 50,
    "category": "Food",
    "description": "Lunch at restaurant",
    "date": "2024-03-18"
  }'
```

---

## 🛠️ Tech Stack

**Frontend:**
- Angular 21
- Reactive Forms
- RxJS
- TypeScript

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

---

## 📦 Key Dependencies

Frontend & Backend:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-Origin Resource Sharing
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `concurrently` - Run multiple commands

---

## ✅ Features

- ✅ User Registration & Login
- ✅ JWT Token-based Authentication
- ✅ Password Hashing with bcryptjs
- ✅ CRUD Operations for Expenses
- ✅ User-specific Expense Data
- ✅ Form Validation
- ✅ Error Handling
- ✅ Modern UI Design
- ✅ Responsive Design

---

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or MongoDB Atlas credentials are correct
- Check `.env` file MONGO_URI configuration

### CORS Error
- Make sure backend is running on port 5000
- Angular service uses `http://localhost:5000` as base URL

### Token Expired
- Tokens expire after 7 days
- User needs to login again

### Port Already in Use
- Angular: Change port with `ng serve --port 4201`
- Backend: Change PORT in `.env` file

---

## 📚 Next Steps

1. Add expense categories and filtering
2. Add expense statistics/charts
3. Add file export (CSV, PDF)
4. Add email notifications
5. Add budget limits and alerts
6. Deploy frontend to Vercel/Netlify
7. Deploy backend to Railway/Render/Heroku

---

## 📞 Support

For issues or questions, check the console logs in both Angular and Node.js terminals for error details.

Happy coding! 🎉
