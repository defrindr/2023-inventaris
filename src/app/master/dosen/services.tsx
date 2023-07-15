import { environment } from "@/environments/environments";
import axios from "axios";

export interface Lectures {
  id: any;
  username: string;
  nama: string;
  email: string;
  no_identitas: string;
  no_hp: any;
  foto?: string;
}

export function getLectures() {
  return axios.get<{ data: Lectures[] }>(environment.apiURL + "/master/dosen").then((response) => {
    return response.data.data;
  });
}

export function getLecturer(id: any) {
  return axios.get<{ data: Lectures }>(environment.apiURL + "/master/dosen/" + id).then((response) => {
    return response.data.data;
  });
}

export function createLecturer(data: any) {
  return axios.post<{ data: Lectures }>(environment.apiURL + "/master/dosen", data).then((response) => {
    return response.data.data;
  });
}

export function updateLecturer(updatedData: any) {
  return axios.put(environment.apiURL + "/master/dosen/" + updatedData.id, updatedData).then((response) => {
    return response.data.data;
  }); // Replace '/api/data' with your actual API endpoint
}

export function deleteLecturer(id: any) {
  return axios.delete(environment.apiURL + "/master/dosen/" + id).then((response) => {
    return response.data.data;
  });
}
