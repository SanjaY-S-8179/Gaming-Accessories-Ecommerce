"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/signup/", formData);
      alert("Signup successful! Please login.");
      router.push("/auth/login");
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
        </form>
        <p className="text-center mt-4">Already have an account? <a href="/auth/login" className="text-blue-600">Login</a></p>
      </div>
    </div>
  );
}
