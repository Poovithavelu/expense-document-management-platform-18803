import React, { useState } from 'react';
import { Api } from '../services/api';
import { Alert } from '../components/Alert';

// PUBLIC_INTERFACE
export default function UploadPage() {
  /** Page to upload a new receipt/invoice with basic metadata. */
  const [file, setFile] = useState(null);
  const [vendor, setVendor] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!file) {
      setError(new Error('Please choose a file to upload.'));
      return;
    }
    try {
      setLoading(true);
      const res = await Api.uploadDocument(file, { vendor, date, amount });
      setResult(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Upload Document</h2>
      <p>Upload receipts, invoices, PDFs, or images for processing.</p>
      {error && <Alert type="error" message={error.message} />}
      {result && <Alert type="success" message="Upload successful!" />}
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
        <input type="file" accept="image/*,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <label>
          Vendor
          <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="e.g., ACME Corp" />
        </label>
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Amount
          <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 123.45" />
        </label>
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
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
