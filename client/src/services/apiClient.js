const normalizeBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL) || 'http://localhost:5000';

const buildUrl = (path) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') ?? '';
  let payload = null;

  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else {
    payload = await response.text();
  }

  if (!response.ok) {
    const message = payload?.error?.message || payload?.message || response.statusText;
    const error = new Error(message);
    error.status = response.status;
    error.details = payload?.error?.details;
    throw error;
  }

  return payload?.data ?? payload;
};

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const getUserPayload = (user) => {
  if (!user) return undefined;
  return {
    id: user.id,
    email: user.primaryEmailAddress?.emailAddress ?? null,
    fullName: user.fullName ?? null,
    imageUrl: user.imageUrl ?? null,
  };
};

export const getRequest = async (path, params) => {
  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  const response = await fetch(buildUrl(`${path}${query}`), {
    credentials: 'include',
  });
  return parseResponse(response);
};

export const postRequest = async (path, body, options = {}) => {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return parseResponse(response);
};

export const postFormData = async (path, formData) => {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return parseResponse(response);
};

export const api = {
  generateArticle: (payload) => postRequest('/api/articles/generate', payload),
  generateBlogTitles: (payload) => postRequest('/api/blog/generate', payload),
  generateImages: (payload) => postRequest('/api/images/generate', payload),
  removeBackground: (formData) => postFormData('/api/images/remove-background', formData),
  removeObject: (formData) => postFormData('/api/images/remove-object', formData),
  reviewResume: (formData) => postFormData('/api/resume/review', formData),
  getDashboardSummary: (params) => getRequest('/api/dashboard/summary', params),
  getCommunityCreations: (params) => getRequest('/api/community/creations', params),
};

export default api;

