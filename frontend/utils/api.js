const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.246:8000/api/v1/users/'

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    console.log(res.json)
    return res.json().then((err) => Promise.reject(err));
  };
const headersWithContentType = { "Content-Type": "application/json" };

export const registerUser = (email, password) => {
  return fetch(`${API_URL}/api/v1/users/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};


export const getUser = () => {
  return fetch(`${API_URL}/api/v1/users/me/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then(checkResponse);
};