import FaqList from "@/features/faq/pages/Shop";
import GroupList from "@/features/group/pages/GroupList";
import CategoryList from "@/features/category/pages/CategoryList";
import RoleList from "@/features/role/pages/RoleList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import Home from "@/features/home/pages/Home";
import Shop from "@/features/faq/pages/Shop";
import CreateShop from "@/features/faq/pages/CreateShop";
import DetailProduct from "@/features/faq/components/DetailProduct";

export default function RouterView() {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/groups" element={<GroupList />} />
                    <Route path="/faqs" element={<FaqList />} />
                    <Route path="/category" element={<CategoryList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/create" element={<CreateShop />} />
                    <Route path="/shop/product/:id" element={<DetailProduct />} />
               </Routes>
          </BrowserRouter>
     )
}