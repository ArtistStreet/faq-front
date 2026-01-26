import FaqList from "@/features/faq/pages/FaqList";
import GroupList from "@/features/group/pages/GroupList";
import CategoryList from "@/features/category/pages/CategoryList";
import RoleList from "@/features/role/pages/RoleList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function RouterView() {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/groups" element={<GroupList />} />
                    <Route path="/groups/*" element={<GroupList />} />
                    {/* <Route path="/roles" element={<RoleList />} /> */}
                    <Route path="/faqs" element={<FaqList />} />
                    <Route path="/category" element={<CategoryList />} />
               </Routes>
          </BrowserRouter>
     )
}