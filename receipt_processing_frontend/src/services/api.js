const DEFAULT_TIMEOUT = 30000;

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns the backend API base URL from env with a default. */
  const url = process.env.REACT_APP_API_BASE_URL || '';
  return url.replace(/\/+$/, '');
}

async function withTimeout(promise, ms = DEFAULT_TIMEOUT) {
  let timeoutId;
  const timeout = new Promise((_, rej) => {
    timeoutId = setTimeout(() => rej(new Error('Request timed out')), ms);
  });
  const res = await Promise.race([promise, timeout]);
  clearTimeout(timeoutId);
  return res;
}

async function request(path, options = {}) {
  const base = getApiBaseUrl();
  const url = `${base}${path}`;
  try {
    const res = await withTimeout(fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
      },
    }));
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    if (!res.ok) {
      const errBody = isJson ? await res.json().catch(() => ({})) : await res.text().catch(() => '');
      const message = (errBody && errBody.message) || `HTTP ${res.status}`;
      const err = new Error(message);
      err.status = res.status;
      err.body = errBody;
      throw err;
    }
    return isJson ? res.json() : res.text();
  } catch (e) {
    // Network or other error
    if (!e.status) {
      e.message = `Network error: ${e.message}`;
    }
    throw e;
  }
}

// PUBLIC_INTERFACE
export const Api = {
  /** Upload a document (file + optional metadata). */
  uploadDocument: async (file, metadata = {}) => {
    const form = new FormData();
    form.append('file', file);
    Object.entries(metadata).forEach(([k, v]) => {
      if (v !== undefined && v !== null) form.append(k, v);
    });
    return request('/documents/upload', {
      method: 'POST',
      body: form,
    });
  },

  /** List documents with pagination and optional filters. */
  listDocuments: async ({ page = 1, pageSize = 10, vendor, minAmount, maxAmount, startDate, endDate } = {}) => {
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('pageSize', pageSize);
    if (vendor) params.set('vendor', vendor);
    if (minAmount != null) params.set('min_amount', minAmount);
    if (maxAmount != null) params.set('max_amount', maxAmount);
    if (startDate) params.set('start_date', startDate);
    if (endDate) params.set('end_date', endDate);
    return request(`/documents?${params.toString()}`);
  },

  /** Get a single document details and extracted fields. */
  getDocument: async (id) => request(`/documents/${encodeURIComponent(id)}`),

  /** Get file content URL for preview (assuming backend serves raw). */
  getDocumentFileUrl: (id) => `${getApiBaseUrl()}/documents/${encodeURIComponent(id)}/file`,

  /** Search documents (by vendor, amount, date). */
  searchDocuments: async ({ vendor, amount, date } = {}) => {
    const params = new URLSearchParams();
    if (vendor) params.set('vendor', vendor);
    if (amount) params.set('amount', amount);
    if (date) params.set('date', date);
    return request(`/search?${params.toString()}`);
  },

  /** Get versions history of a document. */
  getVersions: async (id) => request(`/documents/${encodeURIComponent(id)}/versions`),

  /** Admin overview for system and workers. */
  getAdminOverview: async () => request('/admin/overview'),

  /** Admin jobs with statuses. */
  getAdminJobs: async () => request('/admin/jobs'),
};
