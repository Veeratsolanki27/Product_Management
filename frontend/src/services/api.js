// Automatically use VITE_API_URL if configured in deployment, else default to localhost:8080
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const authHeader = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    }
  } catch (e) {
    console.error('Error parsing stored user token:', e);
  }
  return {};
};

// Authentication Services
export const login = async (username, password) => {
  let res;
  try {
    res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.trim(), password }),
    });
  } catch (networkErr) {
    throw new Error(`Cannot connect to backend server at ${API_BASE}. Please ensure the server is active.`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Invalid username or password');
  }

  localStorage.setItem('user', JSON.stringify(data));
  return data;
};

export const register = async (userData) => {
  let res;
  try {
    res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  } catch (networkErr) {
    throw new Error(`Cannot connect to backend server at ${API_BASE}. Please ensure the server is active.`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Registration failed');
  }
  return data;
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
  if (res.status === 401) {
    logout();
    window.location.reload();
    throw new Error('Session expired');
  }
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
  if (res.status === 401) {
    logout();
    window.location.reload();
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Failed to load customers');
  return res.json();
};

export const addCustomer = async (customer) => {
  const res = await fetch(`${API_BASE}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error('Failed to add customer');
  return res.json();
};

export const deleteCustomer = async (id) => {
  const res = await fetch(`${API_BASE}/customers/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error('Failed to delete customer');
  return true;
};

// Order Services
export const getOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`, {
    headers: { ...authHeader() },
  });
  if (res.status === 401) {
    logout();
    window.location.reload();
    throw new Error('Session expired');
  }
  if (!res.ok) throw new Error('Failed to load orders');
  return res.json();
};

export const addOrder = async (order) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
};

export const deleteOrder = async (id) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() },
  });
  if (!res.ok) throw new Error('Failed to delete order');
  return true;
};
