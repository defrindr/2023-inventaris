import { environment } from "@/environments/environments";
import axios from "axios";

export interface Students {
  id: any;
  username: string;
  nama: string;
  email: string;
  no_identitas: string;
  no_hp: any;
  foto?: string;
}

export function getStudents() {
  return axios.get<{ data: Students[] }>(environment.apiURL + "/master/mahasiswa").then((response) => {
    return response.data.data;
  });
}

export function getStudent(id: any) {
  return axios.get<{ data: Students }>(environment.apiURL + "/master/mahasiswa/" + id).then((response) => {
    return response.data.data;
  });
}

export function createStudent(data: any) {
  return axios.post<{ data: Students }>(environment.apiURL + "/master/mahasiswa", data).then((response) => {
    return response.data.data;
  });
}

export function updateStudent(updatedData: any) {
  return axios.put(environment.apiURL + "/master/mahasiswa/" + updatedData.id, updatedData).then((response) => {
    return response.data.data;
  }); // Replace '/api/data' with your actual API endpoint
}

export function deleteStudent(id: any) {
  return axios.delete(environment.apiURL + "/master/mahasiswa/" + id).then((response) => {
    return response.data.data;
  });
}
