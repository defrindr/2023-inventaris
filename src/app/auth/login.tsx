import { AlertError, AlertSuccess } from "@/components/ui/Alert";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  type Login = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const setInitialValue = () => {
    setValue("email", null);
    setValue("password", null);
  };

  const onSubmit = async (data: any, event: any) => {
    axios.post("http://localhost:8000/api/auth/login", data).then(
      (res) => {
        localStorage.setItem("token", res.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        AlertSuccess("Login berhasil");
        navigate("/dashboard");
      },
      (error) => {
        console.log(error);
        AlertError("Email atau password salah");
      }
    );
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white w-96 rounded shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign In
            </button>
            <button className="text-blue-500 hover:text-blue-700 font-bold" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
