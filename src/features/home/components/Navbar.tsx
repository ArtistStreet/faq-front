import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
     const navigate = useNavigate();
     const { user, isAuthenticated, logout } = useAuth();
     console.log("Navbar render, user:", user, "isAuthenticated:", isAuthenticated);
     const handleLogout = () => {
          logout();
          navigate("/login");
     };

     return (
          <nav style={{ display: "flex", gap: 20 }}>
               {/* <Link to="/">Home</Link> */}

               {isAuthenticated ? (
                    <>
                         <span>Xin chào, {user?.name}</span>
                         <Link to="/profile">Profile</Link>
                         <Link to="/shop/create">Tạo shop</Link>
                         <button onClick={handleLogout}>Đăng xuất</button>
                    </>
               ) : (
                    <>
                         <Link to="/login">Login</Link>
                         <Link to="/register">Register</Link>
                    </>
               )}
          </nav>
     );
}
