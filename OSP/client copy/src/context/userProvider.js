import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [baseURL, setBaseURL] = useState('http://localhost:8080');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
    // if (!userInfo) navigate('/');
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        baseURL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useContextState = () => {
  return useContext(UserContext);
};

export default UserProvider;
