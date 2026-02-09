import { useAuth } from "@/contexts/AuthContext";
import { LOGIN } from "@/services/UserService";
import User, { LoginData } from "@/types/User";
import { useMutation } from '@apollo/client/react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
     const navigate = useNavigate();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const { login: authLogin } = useAuth();
     const [login, { loading, error }] = useMutation<LoginData>(LOGIN);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          try {
               const res = await login({ variables: { input: { email, password } } });

               const { accessToken, user } = res.data?.login || {};
               if (!accessToken || !user) {
                    throw new Error("Invalid login response");
               }
               localStorage.setItem('token', accessToken);
               authLogin(user, accessToken);
               navigate('/'); // Redirect to home or dashboard
          } catch (err) {
               console.error('Login failed:', err);
          }
     };

     return (
          <div className="max-w-md mx-auto mt-20">
               <h1 className="text-2xl font-bold mb-6">Login</h1>

               <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                         type="email"
                         placeholder="Email"
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                         className="w-full border p-2"
                    />

                    <input
                         type="password"
                         placeholder="Password"
                         value={password}
                         onChange={e => setPassword(e.target.value)}
                         className="w-full border p-2"
                    />

                    {error && <p className="text-red-500">{error.message}</p>}

                    <button
                         type="submit"
                         disabled={loading}
                         className="w-full bg-black text-white p-2"
                    >
                         {loading ? "Loading..." : "Login"}
                    </button>
               </form>
          </div>
     );
}