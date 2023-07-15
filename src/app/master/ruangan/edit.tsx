import { getRoom, updateRoom } from "./services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "@/components/ui/Card";
import { useNavigate, useParams } from "react-router-dom";
import Form from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import PhotoUploader from "@/components/ui/PhotoUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { AlertError, AlertSuccess } from "@/components/ui/Alert";

type Room = {
  id: any;
  nama: string;
  deskripsi: string;
  foto: any;
  status: string;
};

export default function Edit() {
  const params = useParams();
  const {
    status,
    error,
    data: room,
  } = useQuery({
    queryKey: ["room"],
    queryFn: () => getRoom(params.id),
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const setInitialValue = () => {
    setValue("nama", room?.nama);
    setValue("deskripsi", room?.deskripsi);
    setValue("id", room?.id);
  };

  useEffect(() => {
    setInitialValue();
  });

  const handlePhotoUpload = (base64Data) => {
    setValue("foto", base64Data);
  };

  const { mutate, isLoading } = useMutation(updateRoom, {
    onSuccess: (data) => {
      queryClient.setQueriesData(["room"], data);
      AlertSuccess("Data berhasil disimpan");
      navigate("/master/ruangan");
      console.log("success");
    },
    onError: (error) => {
      console.log(error);
      AlertError("Data gagal disimpan");
      navigate("/master/ruangan");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    console.log(error);
    return <div>Error: error while load data</div>;
  }

  const onSubmit = async (data: any) => {
    try {
      await mutate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-3/5">
        <Card title={"Edit Ruangan"}>
          <Form>
            <div className="mb-4">
              <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                id="nama"
                type="hidden"
                {...register("id")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
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
              <label htmlFor="deskripsi" className="block text-gray-700 text-sm font-bold mb-2">
                Deskripsi
              </label>
              <textarea
                id="deskripsi"
                {...register("deskripsi", { required: "Deskripsi is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Enter your message"
              ></textarea>
              {errors.deskripsi && <p className="error-message">{errors.deskripsi.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="foto" className="block text-gray-700 text-sm font-bold mb-2">
                Foto
              </label>
              <PhotoUploader photo={room.foto} onPhotoUpload={handlePhotoUpload} />
            </div>
            <div className="text-end">
              <button className="rounded-md py-2 px-3 text-white text-sm btn-secondary mr-2" onClick={() => navigate("/master/ruangan")}>
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
