# 📦 Inventory Management System - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.9.1-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-7.5.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

</div>

<div align="center">
  <h3>A modern, responsive inventory management frontend application built with React and Vite</h3>
  <p>Intuitive interface for managing product inventory with real-time stock tracking, user authentication, and a beautiful dashboard</p>
</div>

---

## ✨ Features

### 🔐 Authentication & Authorization

- **Firebase Authentication** - Secure user login and registration
- **Private Routes** - Protected pages accessible only to authenticated users
- **Password Recovery** - Forgot password and reset password functionality
- **User Profile** - Display user information with profile icon and email tooltip

### 📊 Inventory Management

- **Product Dashboard** - Overview of all inventory operations
- **Add Products** - Create new product entries with details (Name, ID, Stock, BIN Number)
- **View All Products** - Display all products in a responsive grid layout
- **Update Products** - Search and modify existing product information
- **Delete Products** - Search and remove products with confirmation
- **Stock Management** - Decrease stock quantities with real-time updates

### 🔍 Search & Filter

- **Advanced Search** - Search products by Name, Product ID, or BIN Number
- **Real-time Filtering** - Instant search results as you type
- **No Results Handling** - User-friendly messages when no products match

### 🔔 Notifications

- **Toast Notifications** - Real-time feedback for all operations
- **Notification Center** - Track all inventory changes and updates
- **Activity Log** - Monitor product additions, updates, and deletions

### 🎨 User Interface

- **Modern Dark Theme** - Sleek slate-based color scheme
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive Cards** - Hover effects and smooth transitions
- **Icon Integration** - React Icons for enhanced visual experience
- **Sticky Navigation** - Always-accessible header navigation

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="33%">
<h3>Frontend Framework</h3>
<img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
<br/>
<img src="https://img.shields.io/badge/Vite-6.3.1-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
<br/>
<img src="https://img.shields.io/badge/React_Router-7.5.1-CA4245?style=flat-square&logo=react-router&logoColor=white" alt="React Router"/>
</td>
<td align="center" width="33%">
<h3>Styling</h3>
<img src="https://img.shields.io/badge/Tailwind_CSS-4.1.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind"/>
<br/>
<img src="https://img.shields.io/badge/DaisyUI-5.0.25-5A0EF8?style=flat-square&logo=daisyui&logoColor=white" alt="DaisyUI"/>
<br/>
<img src="https://img.shields.io/badge/CSS3-Custom-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/>
</td>
<td align="center" width="33%">
<h3>Backend & API</h3>
<img src="https://img.shields.io/badge/Firebase-11.9.1-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase"/>
<br/>
<img src="https://img.shields.io/badge/Axios-1.10.0-5A29E4?style=flat-square&logo=axios&logoColor=white" alt="Axios"/>
<br/>
<img src="https://img.shields.io/badge/Context_API-State-61DAFB?style=flat-square&logo=react&logoColor=black" alt="Context API"/>
</td>
</tr>
<tr>
<td align="center" width="33%">
<h3>UI Components</h3>
<img src="https://img.shields.io/badge/React_Icons-5.5.0-E91E63?style=flat-square&logo=react&logoColor=white" alt="React Icons"/>
<br/>
<img src="https://img.shields.io/badge/React_Hot_Toast-2.5.2-FF6B6B?style=flat-square" alt="React Hot Toast"/>
<br/>
<img src="https://img.shields.io/badge/React_Confirm_Alert-3.0.6-FFA500?style=flat-square" alt="React Confirm Alert"/>
</td>
<td align="center" width="33%">
<h3>Development Tools</h3>
<img src="https://img.shields.io/badge/ESLint-9.22.0-4B32C3?style=flat-square&logo=eslint&logoColor=white" alt="ESLint"/>
<br/>
<img src="https://img.shields.io/badge/npm-Package_Manager-CB3837?style=flat-square&logo=npm&logoColor=white" alt="npm"/>
<br/>
<img src="https://img.shields.io/badge/Git-Version_Control-F05032?style=flat-square&logo=git&logoColor=white" alt="Git"/>
</td>
<td align="center" width="33%">
<h3>Deployment</h3>
<img src="https://img.shields.io/badge/Vercel-Ready-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel"/>
<br/>
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/>
</td>
</tr>
</table>

---

## 📁 Project Structure

```
inventory-frontend/
│
├── 📂 public/                      # Static assets
│
├── 📂 src/
│   ├── 📂 api/
│   │   └── 📄 api.js               # Axios instance & API configuration
│   │
│   ├── 📂 Context/
│   │   └── 📂 NotificationContext/
│   │       ├── 📄 AuthContext.jsx          # Authentication state management
│   │       └── 📄 NotificationContext.jsx  # Notification state management
│   │
│   ├── 📂 firebase/
│   │   └── 📄 firebase.config.js   # Firebase configuration & initialization
│   │
│   ├── 📂 Layout/
│   │   └── 📄 point.jsx            # Main layout wrapper with Outlet
│   │
│   ├── 📂 pages/
│   │   ├── 📄 Header.jsx           # Navigation header component
│   │   ├── 📄 Footer.jsx           # Footer component
│   │   ├── 📄 Home.jsx             # Dashboard home page
│   │   ├── 📄 Login.jsx            # User login page
│   │   ├── 📄 Signup.jsx           # User registration page
│   │   ├── 📄 Forgot.jsx           # Forgot password page
│   │   ├── 📄 ResetPassword.jsx    # Reset password page
│   │   ├── 📄 AllProducts.jsx      # Product listing & search
│   │   ├── 📄 Addproduts.jsx       # Add new product form
│   │   ├── 📄 UpdateProduct.jsx    # Update product page
│   │   ├── 📄 DeleteProduct.jsx    # Delete product page
│   │   └── 📄 Notification.jsx     # Notification center
│   │
│   ├── 📂 Routes/
│   │   └── 📄 PrivateRoute.jsx     # Protected route wrapper component
│   │
│   ├── 📄 App.jsx                  # Root application component
│   ├── 📄 main.jsx                 # Application entry point & router setup
│   └── 📄 index.css                # Global styles & Tailwind imports
│
├── 📄 .env.local                   # Environment variables (not in repo)
├── 📄 .gitignore                   # Git ignore rules
├── 📄 eslint.config.js             # ESLint configuration
├── 📄 index.html                   # HTML entry point
├── 📄 package.json                 # Dependencies & scripts
├── 📄 tailwind.config.js           # Tailwind CSS configuration
├── 📄 vercel.json                  # Vercel deployment config
└── 📄 vite.config.js               # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-Latest-CB3837?style=flat-square&logo=npm&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Account-FFCA28?style=flat-square&logo=firebase&logoColor=black)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd inventory-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

---

## 📝 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production-ready bundle            |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint for code quality checks       |

---

## 🔑 Key Features Explained

### Authentication Flow

1. Users register with email and password via Firebase
2. Login credentials are validated and stored securely
3. Protected routes check authentication status
4. Users can reset passwords via email

### Product Management Workflow

1. **Add Product**: Fill form with product details → Submit → Product added to database
2. **View Products**: Browse all products → Search/filter → View details
3. **Update Product**: Search by ID/Name/BIN → Modify fields → Save changes
4. **Delete Product**: Search product → Confirm deletion → Product removed
5. **Manage Stock**: Enter quantity → Decrease stock → Real-time update

### Search Functionality

- Search across multiple fields (Name, Product ID, BIN Number)
- Case-insensitive matching
- Instant results with no page reload
- Empty state handling

---

## 🎨 UI/UX Highlights

- **Dark Mode Theme**: Professional slate color palette
- **Responsive Grid**: Adapts from 1 to 4 columns based on screen size
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback for all actions
- **Hover Effects**: Interactive elements with smooth transitions
- **Mobile-First**: Optimized for mobile devices with hamburger menu

---

## 🔗 API Integration

This frontend application uses Axios for HTTP requests and is configured to work with a REST API backend:

### API Configuration

- Centralized Axios instance in `src/api/api.js`
- Base URL configured via environment variable `VITE_API_URL`
- Supports all CRUD operations for product management

### Expected API Endpoints

- `GET /products` - Fetch all products
- `GET /products/search/:term` - Search products
- `POST /products` - Create new product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy automatically

### Build for Production

```bash
npm run build
```

The `dist` folder will contain the production-ready files.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Toufik Labib**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Toufiklabib)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/toufiklabib)

---

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS approach
- Firebase for authentication services
- Vite for the blazing-fast build tool

---

<div align="center">

**Built with ❤️ using React and modern web technologies**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-green?style=for-the-badge)

</div>
