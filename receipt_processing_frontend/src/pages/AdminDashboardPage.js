import React, { useEffect, useState } from 'react';
import { Api } from '../services/api';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';

// PUBLIC_INTERFACE
export default function AdminDashboardPage() {
  /** Admin dashboard to monitor system stats and jobs. */
  const [overview, setOverview] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = async () => {
    setErr(null);
    try {
      setLoading(true);
      const [ov, jb] = await Promise.all([Api.getAdminOverview(), Api.getAdminJobs()]);
      setOverview(ov);
      setJobs(jb.items || jb.jobs || []);
    } catch (e) {
      setErr(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <Loader label="Loading admin dashboard..." />;
  if (err) return <ErrorState error={err} onRetry={load} />;

  return (
    <section>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
        <StatCard label="Total Documents" value={overview?.total_documents ?? '-'} />
        <StatCard label="Processed Today" value={overview?.processed_today ?? '-'} />
        <StatCard label="Pending Jobs" value={overview?.pending_jobs ?? '-'} />
        <StatCard label="Failed Jobs" value={overview?.failed_jobs ?? '-'} />
      </div>

      <h3 style={{ marginTop: 20 }}>Recent Jobs</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Retries</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id}>
                <td>{j.id}</td>
                <td>{j.type || '-'}</td>
                <td>{j.status || '-'}</td>
                <td>{j.retries != null ? j.retries : '-'}</td>
                <td>{j.updated_at || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 12 }}>
      <div style={{ opacity: 0.8, fontSize: 12 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid var(--border-color)',
};
