import Swal, { SweetAlertResult } from "sweetalert2";

export const normalFail = async (title?: string, text?: string): Promise<SweetAlertResult<any>> => {
  return Swal.fire({ icon: "error", title, text, showCancelButton: false, confirmButtonText: "confirm", heightAuto: false });
};

export const normalSuccess = async (title?: string, text?: string): Promise<SweetAlertResult<any>> => {
  return Swal.fire({ icon: "success", title, text, showCancelButton: false, confirmButtonText: "confirm" });
};
