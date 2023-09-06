import { createContext, useContext, useEffect, useState } from "react";
import { useApi, useApiPrivate } from "../../../composables/useApi";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    (() => {
      const token = localStorage.getItem("SIMS_PPOB_TOKEN");

      if (token) {
        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    })();
  }, []);

  const register = async (dataUser) => {
    try {
      const { email, first_name, last_name, password } = dataUser;

      const { data } = await useApi().post("/registration", {
        email,
        first_name,
        last_name,
        password,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const login = async (dataUser) => {
    try {
      const { email, password } = dataUser;

      const { data } = await useApi().post("/login", {
        email,
        password,
      });

      localStorage.setItem("SIMS_PPOB_TOKEN", data.data.token);

      const { data: user } = await useApiPrivate().get("/profile");

      setAuthState({
        token: data.data?.token,
        authenticated: true,
        user: user.data,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("SIMS_PPOB_TOKEN");

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
