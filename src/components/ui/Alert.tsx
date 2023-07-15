import Swal from "sweetalert2";

export function AlertSuccess(message: string) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
}

export function AlertError(message: string) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
}

export function AlertWarning(message: string) {
  Swal.fire({
    icon: "warning",
    title: "Warning",
    text: message,
  });
}

export function AlertConfirm(message: string) {
  return Swal.fire({
    icon: "warning",
    title: "Warning",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
}
