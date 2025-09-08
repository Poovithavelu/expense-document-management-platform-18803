import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Api } from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';

// PUBLIC_INTERFACE
export default function DocumentDetailPage() {
  /** Detailed view with file preview and extracted fields. */
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr(null);
    try {
      setLoading(true);
      const data = await Api.getDocument(id);
      setDoc(data);
    } catch (e) {
      setErr(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const fileUrl = useMemo(() => Api.getDocumentFileUrl(id), [id]);

  if (loading) return <Loader label="Loading document..." />;
  if (err) return <ErrorState error={err} onRetry={load} />;
  if (!doc) return null;

  const isPdf = (doc.mime || '').includes('pdf') || (doc.filename || '').toLowerCase().endsWith('.pdf');

  return (
    <section>
      <h2>Document {id}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', minHeight: 300 }}>
          {isPdf ? (
            <iframe title="Document Preview" src={fileUrl} style={{ width: '100%', height: 500, border: 'none' }} />
          ) : (
            <img src={fileUrl} alt={doc.filename || 'document'} style={{ maxWidth: '100%', display: 'block' }} />
          )}
        </div>
        <div>
          <h3>Extracted Fields</h3>
          <ul>
            <li><strong>Vendor:</strong> {doc.vendor || '-'}</li>
            <li><strong>Date:</strong> {doc.date || '-'}</li>
            <li><strong>Amount:</strong> {doc.amount != null ? `$${Number(doc.amount).toFixed(2)}` : '-'}</li>
            <li><strong>Category:</strong> {doc.category || '-'}</li>
            <li><strong>Status:</strong> {doc.status || '-'}</li>
          </ul>
          <Link to={`/documents/${encodeURIComponent(id)}/versions`}>View Version History</Link>
        </div>
      </div>
    </section>
  );
}
