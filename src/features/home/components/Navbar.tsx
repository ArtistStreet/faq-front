import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@apollo/client/react";
import { PROFILE } from "@/services/UserService";
import User, { MeResponse } from "@/types/User";

export default function Navbar() {
     const navigate = useNavigate();
     const { isAuthenticated, logout } = useAuth();
     const { data } = useQuery<MeResponse>(PROFILE);
     // console.log("user data: ", data);
     const handleLogout = () => {
          logout();
          navigate("/login");
     };

     return (
          <nav style={{ display: "flex", gap: 20 }}>
               {/* <Link to="/">Home</Link> */}

               {isAuthenticated ? (
                    <>
                         <span>Xin chào, {data?.me.name}</span>
                         <Link to="/profile">Profile</Link>
                         {data?.me.shop ? <Link to="/shop">Shop {data?.me.shop.name}</Link>
                              : <Link to="/shop/create">Tạo shop</Link>
                         }
                         <button onClick={handleLogout}>Đăng xuất</button>
                    </>
               ) : (
                    <>
                         <Link to="/login">Login</Link>
                         <Link to="/register">Register</Link>
                    </>
               )
               }
          </nav >
     );
}
