const API_URL = process.env.REACT_APP_API_URL || 'http://localhost'

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  };
const headersWithContentType = { "Content-Type": "application/json" };

export const registerUser = (email, password) => {
  return fetch(`${API_URL}/api/users/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};