import React, { useState } from 'react';
import { Api } from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function SearchPage() {
  /** Search by vendor, amount, or date. */
  const [vendor, setVendor] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [results, setResults] = useState([]);

  const onSearch = async (e) => {
    e.preventDefault();
    setErr(null);
    setResults([]);
    try {
      setLoading(true);
      const res = await Api.searchDocuments({ vendor: vendor || undefined, amount: amount || undefined, date: date || undefined });
      setResults(res.items || res.documents || []);
    } catch (e1) {
      setErr(e1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Search Documents</h2>
      <form onSubmit={onSearch} style={{ display: 'grid', gap: 12, maxWidth: 600, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <input placeholder="Vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} />
        <input placeholder="Amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input placeholder="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit" style={btnStyle}>Search</button>
      </form>

      {loading && <Loader label="Searching..." />}
      {err && <ErrorState error={err} />}
      {!loading && !err && !results.length && <EmptyState title="No results" description="Try adjusting your search filters." />}

      {!!results.length && (
        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Vendor</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td><Link to={`/documents/${encodeURIComponent(r.id)}`}>{r.id}</td>
                  <td>{r.vendor || '-'}</td>
                  <td>{r.date || '-'}</td>
                  <td>{r.amount != null ? `$${Number(r.amount).toFixed(2)}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const btnStyle = {
  background: 'var(--button-bg)',
  color: 'var(--button-text)',
  border: 'none',
  borderRadius: 8,
  padding: '10px 14px',
  cursor: 'pointer'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid var(--border-color)',
};
