export const AxiosErrorMessage = {
  unauthorized: "Request failed with status code 401" as string,
  internalServerError: "Request failed with status code 500" as string,
} as const;

export const CustomErrorMessage = {
  sessionExpired: "Session expired" as string,
} as const;
