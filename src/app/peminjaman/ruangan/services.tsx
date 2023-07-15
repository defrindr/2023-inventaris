import axios from "axios";
import { environment } from "../../../environments/environments";
export interface Rooms {
  id: number;
  nama: string;
  deskripsi: string;
  foto: string;
  status: string;
}

export function getRoomTransactions() {
  return axios.get<{ data: Rooms[] }>(environment.apiURL + "/transaction/ruangan").then((response) => {
    return response.data.data;
  });
}

export function getRoomTransaction(id: any) {
  return axios.get<{ data: Rooms }>(environment.apiURL + "/transaction/ruangan/" + id).then((response) => {
    return response.data.data;
  });
}

export function createRoomTransaction(data: any) {
  return axios.post<{ data: Rooms }>(environment.apiURL + "/transaction/ruangan", data).then((response) => {
    return response.data.data;
  });
}

export function updateRoomTransaction(updatedData: any) {
  return axios.put(environment.apiURL + "/transaction/ruangan/" + updatedData.id, updatedData).then((response) => {
    return response.data.data;
  }); // Replace '/api/data' with your actual API endpoint
}

export function deleteRoomTransaction(id: any) {
  return axios.delete(environment.apiURL + "/transaction/ruangan/" + id).then((response) => {
    return response.data.data;
  });
}
