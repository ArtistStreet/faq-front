import FaqList from "@/features/faq/pages/FaqList";
import GroupList from "@/features/group/pages/GroupList";
import CategoryList from "@/features/category/pages/CategoryList";
import RoleList from "@/features/role/pages/RoleList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Home from "@/features/home/pages/Home";

export default function RouterView() {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/groups" element={<GroupList />} />
                    <Route path="/groups/*" element={<GroupList />} />
                    {/* <Route path="/roles" element={<RoleList />} /> */}
                    <Route path="/faqs" element={<FaqList />} />
                    <Route path="/category" element={<CategoryList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
               </Routes>
          </BrowserRouter>
     )
}