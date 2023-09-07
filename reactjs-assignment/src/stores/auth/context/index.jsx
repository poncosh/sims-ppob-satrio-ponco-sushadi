import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useApi, useApiPrivate } from "../../../composables/useApi";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    user: null,
    balance: null,
  });

  const full_name = useMemo(() => {
    return `${authState.user?.first_name} ${authState.user?.last_name}`;
  }, [authState.user]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("SIMS_PPOB_TOKEN");
      try {
        if (token) {
          const { data: user } = await useApiPrivate().get("/profile");
          const { data: balance } = await useApiPrivate().get("/balance");

          setAuthState({
            token: token,
            authenticated: true,
            user: user.data,
            balance: balance.data?.balance,
          });
        }
      } catch (error) {
        await Toast.fire({
          icon: "info",
          title: "Please login again",
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
      const { data: balance } = await useApiPrivate().get("/balance");

      setAuthState({
        token: data.data?.token,
        authenticated: true,
        user: user.data,
        balance: balance.data?.balance,
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

  const updateProfile = async (dataUser) => {
    try {
      const { email, first_name, last_name } = dataUser;

      const { data } = await useApiPrivate().put("/profile/update", {
        email,
        first_name,
        last_name,
      });

      setAuthState({
        ...authState,
        user: data.data,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const topUpBalance = async (amount) => {
    try {
      const { data } = await useApiPrivate().post("/topup", {
        top_up_amount: amount,
      });

      setAuthState({
        ...authState,
        balance: data.data?.balance,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const transactionService = async (serviceCode) => {
    try {
      const { data } = await useApiPrivate().post("/transaction", {
        service_code: serviceCode,
      });

      const { data: balance } = await useApiPrivate().get("/balance");

      setAuthState({
        ...authState,
        balance: balance.data?.balance,
      });

      return data;
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const value = {
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    onUpdateProfile: updateProfile,
    onTopUp: topUpBalance,
    onTransaction: transactionService,
    fullName: full_name,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
