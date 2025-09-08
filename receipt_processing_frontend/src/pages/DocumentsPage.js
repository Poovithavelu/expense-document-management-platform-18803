import React, { useEffect, useState } from 'react';
import { Api } from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';
import { Pagination } from '../components/Pagination';
import { EmptyState } from '../components/EmptyState';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function DocumentsPage() {
  /** List of documents with basic extracted fields and pagination. */
  const [docs, setDocs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = async () => {
    setErr(null);
    try {
      setLoading(true);
      const data = await Api.listDocuments({ page, pageSize });
      setDocs(data.items || data.documents || []);
      setTotal(data.total || 0);
    } catch (e) {
      setErr(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading) return <Loader label="Loading documents..." />;
  if (err) return <ErrorState error={err} onRetry={load} />;
  if (!docs.length) return <EmptyState title="No documents found" description="Upload your first receipt or invoice to get started." />;

  return (
    <section>
      <h2>Documents</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Vendor</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Versions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={d.id}>
                <td><Link to={`/documents/${encodeURIComponent(d.id)}`}>{d.id}</Link></td>
                <td>{d.vendor || '-'}</td>
                <td>{d.date || '-'}</td>
                <td>{d.amount != null ? `$${Number(d.amount).toFixed(2)}` : '-'}</td>
                <td>{d.status || 'processed'}</td>
                <td><Link to={`/documents/${encodeURIComponent(d.id)}/versions`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
    </section>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid var(--border-color)',
};
