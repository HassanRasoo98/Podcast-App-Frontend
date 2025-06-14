export const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
  
    return fetch(url, {
      ...options,
      headers,
    });
  };