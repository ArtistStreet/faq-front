import User from "@/types/User";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
     user: User | null;
     isAuthenticated: boolean;
     login: (user: User, token: string) => void;
     logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
     const [user, setUser] = useState<User | null>(null);

     // load lại khi refresh trang
     useEffect(() => {
          const storedUser = localStorage.getItem("user");
          const token = localStorage.getItem("accessToken");

          if (storedUser && token) {
               setUser(JSON.parse(storedUser));
          }
     }, []);

     const login = (user: User, token: string) => {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
     };

     const logout = () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          setUser(null);
     };

     return (
          <AuthContext.Provider
               value={{
                    user,
                    isAuthenticated: !!user,
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
