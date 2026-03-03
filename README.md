This project uses **React with Vite** for fast development and HMR.

# Secure Product Management Dashboard (Frontend)

This is the **React frontend** for the Secure Product Management system. It connects to a Django backend via REST APIs and supports JWT authentication, product listing, filtering, sorting, pagination, and adding new products.

---

## 🔐 Key Features

- **Product List Table**: View core product details (ID, Category, Price, Dates).
- **Dynamic Data Masking**: Sensitive fields (`Supplier Cost` and `Internal Notes`) are masked with `********` or `Restricted` by default to ensure data privacy.
- **On-Demand Decryption**: Authenticated Admins can click a **Decrypt** button to reveal the true values of sensitive fields.
- **Role-Based UI**: The "Add Product" form and "Decrypt" buttons only appear for authenticated users.
- **Filtering & Sorting**: Search by category and sort by price or manufacturing/expiry dates.
- **Pagination**: Server-side pagination for optimized data loading.

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

## 🔍 Usage

1. **Dashboard Access**: Open the dashboard to view the product list. Sensitive data is masked for all users initially.
2. **Admin Authentication**: Login using staff credentials. The JWT token is stored securely in `localStorage`.
3. **View Sensitive Info**: As an Admin, click the **Decrypt** button on any table row. This sends an authorized request to the backend to retrieve the decrypted value.
4. **Data Management**: Use the "Add New Product" form to enter data. The backend will automatically encrypt the `Supplier Cost` and `Internal Notes` before storing them.

## Notes

- This frontend works with the Django backend supporting JWT authentication.
- All API calls use the api Axios instance with token management handled automatically.
- Styling is designed to match the product table and form layout.
- - **Defense in Depth**: Even if the "Decrypt" button is triggered, the backend Serializer performs a final check on the JWT. If the user is not a staff member, the server will refuse to send the decrypted data.

### Dependencies

- React 18+
- Axios
- Vite (development server)

