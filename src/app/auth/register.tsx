import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "@/components/ui/Form";
import axios from "axios";
import { AlertSuccess } from "@/components/ui/Alert";

const RegisterForm = () => {
  type Student = {
    username: string;
    nama: string;
    email: string;
    no_identitas: string;
    no_hp: any;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const setInitialValue = () => {
    setValue("username", null);
    setValue("nama", null);
    setValue("email", null);
    setValue("no_identitas", null);
    setValue("no_hp", null);
    setValue("password", null);
  };

  useEffect(() => {
    setInitialValue();
  });

  const onSubmit = async (data: any, event: any) => {
    axios.post("http://localhost:8000/api/master/mahasiswa", data).then((res) => {
      AlertSuccess("Berhasil melakukan registrasi");
      navigate("/login");
    });
  };

  const navigate = useNavigate();

  const handleRegister = (e: any) => {
    e.preventDefault();
    // Perform registration logic here
  };

  return (
    <div className=" bg-gray-100">
      <div className="my-4 flex items-center justify-center ">
        <div className="bg-white w-[600px] rounded shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <Form>
            <div className="mb-4">
              <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input id="id" type="hidden" {...register("id")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your name" />
              <input
                id="nama"
                type="text"
                {...register("nama", { required: "Nama is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />

              {errors.nama && <p className="error-message">{errors.nama.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="no_identitas" className="block text-gray-700 text-sm font-bold mb-2">
                NRP
              </label>
              <input
                id="no_identitas"
                type="number"
                {...register("no_identitas", { required: "NRP is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your NRP"
              />

              {errors.no_identitas && <p className="error-message">{errors.no_identitas.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="no_hp" className="block text-gray-700 text-sm font-bold mb-2">
                No. HP
              </label>
              <input
                id="no_hp"
                type="text"
                {...register("no_hp", { required: "No. HP is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your Phone Number"
              />

              {errors.no_hp && <p className="error-message">{errors.no_hp.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                {...register("username", { required: "Username is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
              />

              {errors.username && <p className="error-message">{errors.username.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit(onSubmit)}>
                Register
              </button>
              <button className="text-blue-500 hover:text-blue-700 font-bold" onClick={() => navigate("/login")}>
                Sign In
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
