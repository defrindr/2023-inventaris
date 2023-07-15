import axios from "axios";
import { environment } from "../../../environments/environments";
export interface Booking {
  id: number
  ruangan_id: string
  tgl_mulai: string
  tgl_selesai: string
  description: string
  status_pinjaman: string
  status_pengembalian: string
  photo: any
  created_at: string
  updated_at: string
  ruangan: Ruangan
}

export interface Ruangan {
  id: number
  nama: string
  deskripsi: string
  status: string
  foto: string
  created_at: string
  updated_at: string
  flag: number
}

const reqInstance = () => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
};


export function getRoomTransactions() {
  return reqInstance().get<{ data: Booking[] }>(environment.apiURL + "/transaction/ruangan").then((response) => {
    return response.data.data;
  });
}

export function getRoomTransactionHistories() {
  return reqInstance().get<{ data: Booking[] }>(environment.apiURL + "/transaction/ruangan/history").then((response) => {
    return response.data.data;
  });
}

export function getRoomTransaction(id: any) {
  return reqInstance().get<{ data: Booking }>(environment.apiURL + "/transaction/ruangan/" + id).then((response) => {
    return response.data.data;
  });
}

export function createRoomTransaction(data: any) {
  return reqInstance().post<{ data: Booking }>(environment.apiURL + "/transaction/ruangan", data).then((response) => {
    return response.data.data;
  });
}

export function updateRoomTransaction(updatedData: any) {
  return reqInstance().put(environment.apiURL + "/transaction/ruangan/" + updatedData.id, updatedData).then((response) => {
    return response.data.data;
  }); // Replace '/api/data' with your actual API endpoint
}

export function deleteRoomTransaction(id: any) {
  return reqInstance().delete(environment.apiURL + "/transaction/ruangan/" + id).then((response) => {
    return response.data.data;
  });
}

export function changeStatusRoomTransaction(id: any, status: any) {
  return reqInstance().post(environment.apiURL + "/transaction/ruangan/change/" + id + "/to/" + status).then((response) => {
    return response.data.data;
  });
}
