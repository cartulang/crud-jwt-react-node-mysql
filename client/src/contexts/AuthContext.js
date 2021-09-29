import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const baseUrl = "http://localhost:3001";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/user/is-auth`,
        {},
        { withCredentials: true }
      );
      console.log(response);
      if (response.status !== 200) {
        setUser("");
        setIsAuth(false);
        return;
      }
      setUser(response.data[0]);
      setIsAuth(true);
      return response;
    } catch (error) {
      setUser("");
      setIsAuth(false);
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${baseUrl}/user/logout`, { withCredentials: true });
      setUser("");
      setIsAuth(false);
    } catch (error) {
      console.log(error);
      setUser("");
      setIsAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const values = {
    checkAuth,
    setUser,
    setIsAuth,
    logout,
    isAuth,
    user,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
