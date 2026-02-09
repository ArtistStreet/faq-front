import { REGISTER } from "@/services/UserService";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
     const navigate = useNavigate();
     const [form, setForm] = useState({
          email: "",
          password: "",
          name: "",
     });

     const [register, { loading, error }] = useMutation(REGISTER);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setForm({ ...form, [e.target.name]: e.target.value });
     }

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          await register({ variables: { input: form } });
          navigate('/login'); // Redirect to login after successful registration
     }

     return (
          <div className="max-w-md mx-auto mt-20">
               <h1 className="text-2xl font-bold mb-6">Register</h1>

               <form onSubmit={handleSubmit} className="space-y-4 d-flex flex-column">
                    <input
                         name="name"
                         placeholder="Name"
                         onChange={handleChange}
                         className="w-full border p-2"
                    />

                    <input
                         name="email"
                         type="email"
                         placeholder="Email"
                         onChange={handleChange}
                         className="w-full border p-2"
                    />

                    <input
                         name="password"
                         type="password"
                         placeholder="Password"
                         onChange={handleChange}
                         className="w-full border p-2"
                    />

                    {error && <p className="text-red-500">{error.message}</p>}

                    <button
                         type="submit"
                         disabled={loading}
                         className="w-full bg-black text-white p-2"
                    >
                         {loading ? "Loading..." : "Register"}
                    </button>
               </form>
          </div>
     );
}