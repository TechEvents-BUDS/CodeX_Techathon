import { isDevelopment } from "@/constants";
import axios, { AxiosRequestConfig } from "axios";

export const endPoints = {
  CHAT_URL: process.env.NEXT_PUBLIC_CHAT_BOT_API_ENDPOINT as string,
};

// setup base thing
const axiosInter = axios.create({
  responseType: "json",
  headers: { "Content-Type": "application/json" },
});

// type handling
interface IResponse<T> {
  data: T;
  success: boolean;
  error: string;
}

// caller function
async function caller<T>(
  type: "post" | "get" | "put" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
): Promise<IResponse<T>> {
  let response;

  try {
    if (type === "get" || type === "delete") {
      response = await axiosInter[type](url, config);
    } else {
      response = await axiosInter[type](url, data, config);
    }

    response = {
      data: response.data,
      success: true,
      error: "",
    };
  } catch (err: any) {
    response = {
      data: null,
      success: false,
      error: err?.response?.data?.error?.message || err?.message || "Something went wrong",
    };
  }

  // These are logs for DevTools
  if (isDevelopment) {
    console.log("\n\n");
    console.log("Api Call --> ", `[${type?.toUpperCase()}]`, url);
    if (data) {
      console.log("\tdata ->", data);
    }
    if (config) {
      console.log("\tconfig ->", config);
    }
    console.log("Response ->", response);
  }

  return response as IResponse<T>;
}

const api = {
  async post<T>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return caller<T>("post", url, data, config);
  },

  async get<T>(url: string, config?: AxiosRequestConfig<any>) {
    return caller<T>("get", url, undefined, config);
  },

  async delete<T>(url: string, config?: AxiosRequestConfig<any>) {
    return caller<T>("delete", url, undefined, config);
  },

  async put<T>(url: string, data: any, config?: AxiosRequestConfig<any>) {
    return caller<T>("put", url, data, config);
  },
};

export default api;

export function getAuthHeader(jwt: any) {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
}
