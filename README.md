# 🛒 ShopHub - Full Stack E-Commerce Platform

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?logo=tailwind-css)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-blue)

### 🚀 A modern full-stack E-Commerce platform built with MERN Stack

🌐 **Live Demo:** https://e-commerce-frontend-ivory-alpha.vercel.app

</div>

---

## 📌 Features

### 👤 Authentication & Authorization

- User Registration & Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control (Admin/User)

### 🛍️ Product Management

- View All Products
- Product Details Page
- Category Filtering
- Search Products
- Sorting Options
- Responsive Product Cards

### 🛒 Shopping Cart

- Add to Cart
- Remove from Cart
- Quantity Management
- Persistent Cart using Local Storage

### ❤️ Wishlist

- Add/Remove Products from Wishlist
- Dedicated Wishlist Page

### 💳 Payments

- Razorpay Payment Gateway Integration
- Order Verification
- Order Creation & Management

### 📦 Order Management

- My Orders Page
- Admin Order Dashboard
- Order Status Updates
- Delete Orders

### 🛠️ Admin Panel

- Dashboard
- Manage Products
- Add/Edit/Delete Products
- Manage Categories
- View All Users
- Manage Orders

### 📱 Responsive Design

- Mobile Friendly
- Tablet Friendly
- Desktop Optimized

---

# 🏗️ Tech Stack

## Frontend

- React 19
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast
- Lucide React
- Vite

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Razorpay SDK
- Bcrypt

---

# 📂 Project Structure

```bash
ShopHub/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── routes/
│
├── server/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── app.js
```

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

RAZORPAY_KEY_ID=YOUR_KEY

RAZORPAY_KEY_SECRET=YOUR_SECRET
```

---

## Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY=YOUR_RAZORPAY_KEY
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Adityagupta6393/E-Commerce-Website.git

cd ShopHub
```

---

## Backend Setup

```bash
cd server

npm install

npm start
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🌍 Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- MongoDB Atlas

---

# 📸 Screenshots

## Home Page

<img width="574" height="491" alt="image" src="https://github.com/user-attachments/assets/51f1d647-b968-4dad-af77-670c0dd4e9e0" />

---

## Product Details

<img width="593" height="491" alt="image" src="https://github.com/user-attachments/assets/0d42264b-c273-41a3-bbfa-293a590c7997" />

---

## Cart Page

<img width="575" height="491" alt="image" src="https://github.com/user-attachments/assets/8985801d-4e10-45b0-8424-a4e46826736f" />

---

## Admin Dashboard

<img width="575" height="491" alt="image" src="https://github.com/user-attachments/assets/0a0beca9-3b79-478e-933c-1642424d0d74" />

<img width="575" height="491" alt="image" src="https://github.com/user-attachments/assets/f1a3fde5-9406-42dc-91d4-a66ac07329b6" />

<img width="575" height="491" alt="image" src="https://github.com/user-attachments/assets/f29ca9f2-ee2b-4e64-9766-03ce70bb70b3" />

<img width="575" height="491" alt="image" src="https://github.com/user-attachments/assets/aee31d84-fa69-492a-9bcf-f88fabf49b63" />

---

# 🔐 Authentication Flow

```text
User Login
    ↓
Generate JWT Token
    ↓
Store Token in LocalStorage
    ↓
Axios Interceptor
    ↓
Protected Backend Routes
```

---

# 💳 Payment Flow

```text
Checkout
    ↓
Create Razorpay Order
    ↓
Complete Payment
    ↓
Verify Signature
    ↓
Create Order in Database
```

---

# 🎯 Future Improvements

- Product Reviews & Ratings
- Coupon System
- Email Notifications
- Cloudinary Image Uploads
- User Profile Management
- Dark Mode
- Inventory Management
- Address Management
- Stripe Integration
- Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome!

Fork the repository and create a pull request.

```bash
git checkout -b feature-name

git commit -m "Added feature"

git push origin feature-name
```

---

# ⭐ Support

If you like this project, please give it a ⭐ on GitHub!

It helps others discover the project and motivates further development.

---

# 👨‍💻 Author

## Aditya Gupta

- GitHub: [https://github.com/Adityagupta6393]
- LinkedIn: [https://www.linkedin.com/in/aditya-gupta-delhi/]

---

<div align="center">

### 🚀 Built with MERN Stack & ❤️

</div>
