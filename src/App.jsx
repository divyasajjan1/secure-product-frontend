import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [categories, setCategories] = useState([]);


  const fetchProducts = async (url = "http://127.0.0.1:8001/api/products/") => {
    if (!url) return; // skip if URL is null (like prevUrl on first page)

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      setProducts(response.data.results);
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8001/api/products/categories/"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to load categories");
    }
  };

  const handleApply = () => {
    let url = "http://127.0.0.1:8001/api/products/?";

    if (search) url += `search=${search}&`;
    if (ordering) url += `ordering=${ordering}&`;

    fetchProducts(url);
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(); 
  }, []);


  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Secure Product Management</h1>

      <div className="controls">
        <select value={search} onChange={(e) => setSearch(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
          <option value="">Sort By</option>
          <option value="product_price">Price ↑</option>
          <option value="-product_price">Price ↓</option>
          <option value="product_expiry_date">Expiry Date ↑</option>
          <option value="-product_expiry_date">Expiry Date ↓</option>
        </select>
        <button onClick={handleApply}>Apply</button>
      </div>
      

      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Manufacturing Date</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.product_category}</td>
              <td>${product.product_price}</td>
              <td>{product.product_manufacturing_date}</td>
              <td>{product.product_expiry_date}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <div className="pagination-buttons">
        <button onClick={() => fetchProducts(prevUrl)} disabled={!prevUrl}>
          Previous
        </button>
        <button onClick={() => fetchProducts(nextUrl)} disabled={!nextUrl}>
          Next
        </button>
      </div>

    </div>
  );
}

export default App;
