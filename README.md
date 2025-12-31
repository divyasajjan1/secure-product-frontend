This project uses **React with Vite** for fast development and HMR.

# Secure Product Management Dashboard (Frontend)

This is the **React frontend** for the Secure Product Management system. It connects to a Django backend via REST APIs and supports JWT authentication, product listing, filtering, sorting, pagination, and adding new products.

---

## Features

- **Product List Table**: View all products with details such as ID, category, price, manufacturing date, and expiry date.
- **Filtering & Sorting**:  
  - Search by product ID or category.  
  - Sort by price or expiry/manufacturing dates (ascending/descending).
- **Pagination**: Navigate between product pages using Previous/Next buttons.
- **JWT Authentication**: Login required to add new products.
- **Add New Product**:  
  - Form to create new products with all necessary fields.  
  - Shows success or error messages after submission.
- **Responsive Styling**: Clean and consistent layout for inputs, buttons, tables, and forms.

---

## Installation

1. Clone the frontend repository:

git clone <frontend-repo-url>
cd <frontend-folder>

2. Install dependencies:
npm install

3. Start the development server:
npm run dev

The app should now be running at http://localhost:5173 (or the port Vite specifies).

## Folder Structure:

src/
├─ api/
│  └─ axios.js       // Axios instance with JWT interceptor
├─ App.jsx           // Main dashboard component
├─ Login.jsx         // Login form component
├─ App.css           // Styling for tables, forms, and buttons
├─ main.jsx          // React entry point

## Configuration
- Backend URL: Update baseURL in src/api/axios.js if your backend runs on a different host or port.
    const api = axios.create({
    baseURL: "http://127.0.0.1:8001/api/",
    headers: {
        "Content-Type": "application/json",
    },
    });

- JWT Authentication:
    > Login form stores access_token and refresh_token in localStorage.
    > Axios request interceptor automatically attaches Authorization: Bearer <token> header for protected endpoints.

## Usage

1. Open the dashboard in your browser.
2. Login using admin credentials (JWT token will be stored automatically).
3. View products with filtering, sorting, and pagination.
4. Add a new product using the form (visible only when logged in). Successful submission refreshes the product list automatically.

## Notes

- This frontend works with the Django backend supporting JWT authentication.
- All API calls use the api Axios instance with token management handled automatically.
- Styling is designed to match the product table and form layout.

### Dependencies

- React 18+
- Axios
- Vite (development server)

