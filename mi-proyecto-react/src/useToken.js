import { useState } from 'react';
import { decodeToken } from "react-jwt";

export default function useToken() {
  const getToken = () => localStorage.getItem('token');
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  
  const user = token ? decodeToken(token) : null;

  return {
    setToken: saveToken,
    token,
    user,
    removeToken
  };
}