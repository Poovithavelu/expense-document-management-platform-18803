import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Api } from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';

// PUBLIC_INTERFACE
export default function VersionsPage() {
  /** Version history page for a document. */
  const { id } = useParams();
  const [versions, setVersions] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr(null);
    try {
      setLoading(true);
      const data = await Api.getVersions(id);
      setVersions(data.items || data.versions || []);
    } catch (e) {
      setErr(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  if (loading) return <Loader label="Loading version history..." />;
  if (err) return <ErrorState error={err} onRetry={load} />;

  return (
    <section>
      <h2>Version History for {id}</h2>
      {!versions.length ? (
        <p>No versions available.</p>
      ) : (
        <ul>
          {versions.map((v) => (
            <li key={v.version_id || v.id}>
              <strong>Version:</strong> {v.version || v.version_id || '-'} | <strong>Date:</strong> {v.date || v.created_at || '-'} | <strong>Status:</strong> {v.status || '-'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
