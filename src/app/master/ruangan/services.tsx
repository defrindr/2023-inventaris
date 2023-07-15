import axios from "axios";
import { environment } from "../../../environments/environments";
export interface Rooms {
  id: number;
  nama: string;
  deskripsi: string;
  foto: string;
  status: string;
}

export function getRooms() {
  return axios.get<{ data: Rooms[] }>(environment.apiURL + "/master/ruangan").then((response) => {
    return response.data.data;
  });
}

export function getAvailableRoom() {
  return axios.get<{ data: Rooms[] }>(environment.apiURL + "/master/ruangan/available").then((response) => {
    return response.data.data;
  });
}

export function getRoom(id: any) {
  return axios.get<{ data: Rooms }>(environment.apiURL + "/master/ruangan/" + id).then((response) => {
    return response.data.data;
  });
}

export function createRoom(data: any) {
  return axios.post<{ data: Rooms }>(environment.apiURL + "/master/ruangan", data).then((response) => {
    return response.data.data;
  });
}

export function updateRoom(updatedData: any) {
  return axios.put(environment.apiURL + "/master/ruangan/" + updatedData.id, updatedData).then((response) => {
    return response.data.data;
  }); // Replace '/api/data' with your actual API endpoint
}

export function deleteRoom(id: any) {
  return axios.delete(environment.apiURL + "/master/ruangan/" + id).then((response) => {
    return response.data.data;
  });
}
