import { createLecturer } from "./services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import Form from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import PhotoUploader from "@/components/ui/PhotoUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { AlertError, AlertSuccess } from "@/components/ui/Alert";

type Lecturer = {
  id: any;
  username: string;
  nama: string;
  email: string;
  no_identitas: string;
  no_hp: any;
  foto?: string;
  password: string;
};

export default function Create() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    setValue("id", null);
    setValue("password", null);
  };

  useEffect(() => {
    setInitialValue();
  });

  const handlePhotoUpload = (base64Data) => {
    setValue("foto", base64Data);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createLecturer,
    onSuccess: (data) => {
      queryClient.setQueriesData(["lectures", data.id], data);
      AlertSuccess("Data berhasil disimpan");
      navigate("/master/dosen");
    },
    onError: (error) => {
      AlertError("Data gagal disimpan");
      console.log(error);
      navigate("/master/dosen");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    try {
      await mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-3/5">
        <Card title={"Create Dosen"}>
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
                NIP
              </label>
              <input
                id="no_identitas"
                type="number"
                {...register("no_identitas", { required: "NIP is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your NIP"
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
            <div className="mb-4">
              <label htmlFor="foto" className="block text-gray-700 text-sm font-bold mb-2">
                Foto
              </label>
              <PhotoUploader onPhotoUpload={handlePhotoUpload} />
            </div>
            <div className="text-end">
              <button className="rounded-md py-2 px-3 text-white text-sm btn-secondary mr-2" onClick={() => navigate("/master/dosen")}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </button>
              <button type="submit" className="rounded-md py-2 px-3 text-white text-sm btn-success" onClick={handleSubmit(onSubmit)}>
                <FontAwesomeIcon icon={faFloppyDisk} /> Submit
              </button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
