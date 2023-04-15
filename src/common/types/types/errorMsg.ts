export const AxiosErrorMessage = {
  unauthorized: "Request failed with status code 401",
  internalServerError: "Request failed with status code 500",
  conflict: "Request failed with status code 409",
} as const;

export const CustomErrorMessage = {
  sessionExpired: "Session expired",
} as const;
