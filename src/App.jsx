import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = (url = "http://127.0.0.1:8001/api/products/") => {
    setLoading(true);
    setError(null);

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.results);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Secure Product Management</h1>

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
                <td>{product.product_price}</td>
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
