import { useState, useEffect, useCallback } from 'react';
import { fetchSales } from './services/salesApi.js';

function App() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { 
        page, limit: 10, 
        q: search || undefined,
        sortBy,
        ...filters 
      };
      const result = await fetchSales(params);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [search, filters, sortBy]);

  useEffect(() => {
    loadData(1);
  }, [loadData]);

  return (
    <div className="app">
      <h1>Sales Dashboard</h1>
      
      <div className="controls">
        <input 
          className="search"
          placeholder="Search customer name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="date">Date (Newest)</option>
          <option value="quantity">Quantity</option>
          <option value="customerName">Customer Name</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : data.items.length === 0 ? (
        <div>No results</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th><th>Customer</th><th>Phone</th><th>Region</th>
                <th>Product</th><th>Qty</th><th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map(item => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.customerName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.customerRegion}</td>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>${item.finalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button disabled={data.page === 1} onClick={() => loadData(data.page - 1)}>
              Previous
            </button>
            <span>Page {data.page} of {data.totalPages}</span>
            <button disabled={data.page === data.totalPages} onClick={() => loadData(data.page + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
