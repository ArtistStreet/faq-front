import User from "@/types/User";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
     isAuthenticated: boolean;
     login: (token: string) => void;
     logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
     const [isAuthenticated, setIsAuthenticated] = useState(
          !!localStorage.getItem("accessToken")
     );

     const login = (token: string) => {
          localStorage.setItem("accessToken", token);
          setIsAuthenticated(true);
     };

     const logout = () => {
          localStorage.removeItem("accessToken");
          setIsAuthenticated(false);
     };

     return (
          <AuthContext.Provider
               value={{
                    isAuthenticated,
                    login,
                    logout,
               }}
          >
               {children}
          </AuthContext.Provider>
     );
};


export const useAuth = () => {
     const ctx = useContext(AuthContext);
     if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
     return ctx;
};
