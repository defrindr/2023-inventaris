import { createRoomTransaction } from "./services";
import { Rooms, getAvailableRoom } from "@/app/master/ruangan/services"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import Form from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { AlertError, AlertSuccess } from "@/components/ui/Alert";
import { Select } from "@chakra-ui/react";

export default function Create() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [rooms, setRooms] = useState<Rooms[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const setInitialValue = () => {
        setValue("ruangan_id", null);
        setValue("tgl_mulai", null);
        setValue("tgl_selesai", null);
        setValue("id", null);
    };

    const fetchRoom = async () => {
        let rooms = await getAvailableRoom();
        setRooms(() => rooms);
    }

    useEffect(() => {
        setInitialValue();
        fetchRoom();
    }, []);

    const { mutate, isLoading } = useMutation({
        mutationFn: createRoomTransaction,
        onSuccess: (data) => {
            queryClient.setQueriesData(["booking_room", data.id], data);
            AlertSuccess("Data berhasil disimpan");
            navigate("/peminjaman/ruangan");
        },
        onError: (error) => {
            AlertError("Data gagal disimpan");
            console.log(error);
            navigate("/peminjaman/ruangan");
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (data: any, event: any) => {
        console.log(data)
        event.preventDefault();
        try {
            await mutate(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <Card title={"Booking Ruangan"}>
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="nama" className="block text-gray-700 text-sm font-bold mb-2">
                                Ruangan
                            </label>
                            <input id="id" type="hidden" {...register("id")} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your name" />
                            <Select placeholder='Pilih Ruangan' {...register("ruangan_id")}
                            // onChange={event => {
                            //     let target = event.target;
                            //     console.log(target.options[target.selectedIndex].value)
                            // }}
                            >
                                {
                                    rooms.map(item => (
                                        <option key={item.id} value={item.id}>{item.nama}</option>
                                    ))
                                }
                            </Select>

                            <div className="mb-4">
                                <label htmlFor="tgl_mulai" className="block text-gray-700 text-sm font-bold mb-2">
                                    Tanggal Mulai
                                </label>
                                <input
                                    id="tgl_mulai"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    {...register("tgl_mulai", { required: "Tanggal Mulai is required" })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Enter Tanggal Mulai"
                                />
                                {errors.tgl_mulai && <p className="error-message">{errors.tgl_mulai.message}</p>}
                            </div>


                            <div className="mb-4">
                                <label htmlFor="tgl_selesai" className="block text-gray-700 text-sm font-bold mb-2">
                                    Tanggal Selesai
                                </label>
                                <input
                                    id="tgl_selesai"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    {...register("tgl_selesai", { required: "Tanggal Selesai is required" })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    placeholder="Enter Tanggal Selesai"
                                />
                                {errors.tgl_selesai && <p className="error-message">{errors.tgl_selesai.message}</p>}
                            </div>



                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description", { required: "description is required" })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    rows={4}
                                    placeholder="Enter Description"
                                ></textarea>
                                {errors.description && <p className="error-message">{errors.description.message}</p>}
                            </div>

                            {errors.ruangan_id && <p className="error-message">{errors.ruangan_id.message}</p>}
                        </div>
                        <div className="text-end">
                            <button className="rounded-md py-2 px-3 text-white text-sm btn-secondary mr-2" onClick={() => navigate("/peminjaman/ruangan")}>
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
