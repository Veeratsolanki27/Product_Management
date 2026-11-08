const API_BASE = 'http://localhost:8080/api';

export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  }
  return {};
};

// Authentication Services
export const login = async (username, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Invalid username or password');
  }
  const data = await res.json();
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const register = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Registration failed');
  }
  return res.json();
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

// Product Services
export const getProducts = async () => {
  const res = await fetch(`${API_BASE}/products`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
};

export const addProduct = async (product) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return true;
};

// Customer Services
export const getCustomers = async () => {
  const res = await fetch(`${API_BASE}/customers`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error('Failed to load customers');
  return res.json();
};

// Order Services
export const getOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`, {
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error('Failed to load orders');
  return res.json();
};

