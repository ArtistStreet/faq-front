import { SHOP_CREATE } from "@/services/ShopServices";
import { ShopCreate } from "@/types/Shop";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateShop() {
     const navigate = useNavigate();
     const [name, setName] = useState('');
     const [desc, setDesc] = useState('');
     const [address, setAddress] = useState('');
     const [createShop, { loading, error }] = useMutation<ShopCreate>(SHOP_CREATE);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          try {
               const res = await createShop({
                    variables: { input: { name, desc, address } }
               });

               const shop = res.data?.createShop;

               if (shop) {
                    navigate('/shop');
               }
          } catch (err) { }
     }

     return (
          <div className="max-w-md mx-auto mt-10">
               <h2 className="text-xl font-bold mb-4">Create Shop</h2>

               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                         type="text"
                         placeholder="Shop name"
                         value={name}
                         onChange={(e) => setName(e.target.value)}
                         className="border p-2"
                         required
                    />

                    <input
                         type="text"
                         placeholder="Description"
                         value={desc}
                         onChange={(e) => setDesc(e.target.value)}
                         className="border p-2"
                    />

                    <input
                         type="text"
                         placeholder="Address"
                         value={address}
                         onChange={(e) => setAddress(e.target.value)}
                         className="border p-2"
                         required
                    />

                    <button
                         type="submit"
                         className="bg-black text-white p-2"
                         disabled={loading}
                    >
                         {loading ? "Creating..." : "Create Shop"}
                    </button>

                    {error && (
                         <p className="text-red-500">Error: {error.message}</p>
                    )}
               </form>
          </div>
     )
}