import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {

  const getValidUser = () => {
    const storedUser = localStorage.getItem("userInfo");

    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    if (!parsedUser?.token) return null;

    try {
      const decoded = jwtDecode(parsedUser.token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("userInfo");
        return null;
      }

      return parsedUser;
    } catch (err) {
      localStorage.removeItem("userInfo");
      console.log(err);
      return null;
    }
  };

  const [user, setUser] = useState(getValidUser);

  const login = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}