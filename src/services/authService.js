import apiClient from './apiClient';
import { API_CONFIG } from '../config/apiConfig';

const SIGNUP_PATH = '/users/signup';
const LOGIN_PATH = '/users/login';

// const signup = async ({ name, email, password }) => {
//   const url = `${API_CONFIG.BACKEND.BASE_URL}${SIGNUP_PATH}`;

//   const res = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: new URLSearchParams({
//       name: name,
//       email: email,
//       password: password,
//     }),
//   });

//   if (!res.ok) {
//     throw new Error(`Signup failed: ${res.status}`);
//   }else{
//     console.log("----------------------- Signup Successfull -----------------");
//   }

//   const data = await res.json();
//   return data;
// };

const signup = async ({ fullname, email, password }) => {
  const url = `${API_CONFIG.BACKEND.BASE_URL}${SIGNUP_PATH}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullname,
      email,
      password,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Signup failed: ${res.status} ${errorText}`);
  }else{
    console.log("----------------------- Signup Successfull -----------------");
  }

  return await res.json();
};


const login = async ({ email, password }) => {
  const url = `${API_CONFIG.BACKEND.BASE_URL}${LOGIN_PATH}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: email,   // OAuth2PasswordRequestForm uses "username"
      password: password,
    }),
  });

  if (!res.ok) {
    throw new Error('Invalid email or password');
  }

  return await res.json();
};


const logout = () => {
  apiClient.clearToken();
  try {
    localStorage.removeItem('coastAllyUser');
  } catch (e) {}
};

export default {
  signup,
  login,
  logout,
};
