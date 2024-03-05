import Axios from "axios";
import { toast } from "react-toastify";
const accessToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLdlpRVmxIdkJTNW4wNDR0V3RLQmsyR2Zac0NjdFE4U3cyRGxETC1OUDJvIn0.eyJleHAiOjE3MDk2MTkzMjcsImlhdCI6MTcwOTYxNTcyNywianRpIjoiNzM3MGUyY2ItYjkwMS00NWZjLTk0YTctMWFkNjk4NDNkOWI3IiwiaXNzIjoiaHR0cHM6Ly90ZXN0LWF1dGguZm9ydGhlcGVvcGxlLmxpZmUvcmVhbG1zL0V2Z2VueUVjb21tZXJjZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhNWIzOGQ5OS1kMTJiLTRkN2EtYWJkZS1hMjJlYWUzZmRkNDEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJFdmdlbnlDbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiOTFlNzA3NGUtMTVjNC00NzliLThiZjMtNmI3NzFjYTg3MDkxIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiU2VsbGVyIiwiZGVmYXVsdC1yb2xlcy1ldmdlbnllY29tbWVyY2UiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIG1ldGFkYXRhIGVtYWlsIiwic2lkIjoiOTFlNzA3NGUtMTVjNC00NzliLThiZjMtNmI3NzFjYTg3MDkxIiwibWV0YWRhdGEiOnsic3RvcmVJZCI6IjBmM2U0M2NlLTBhMWItNGExNS1hODVkLWFhZDZiNWZjNzgwZiJ9LCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoibnBrLm5hcm9sYStzZWxsZXJAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIiwiZW1haWwiOiJucGsubmFyb2xhK3NlbGxlckBnbWFpbC5jb20ifQ.IoN4s4EqAY0jyPSJJF03BGgpSvh663B0qPLDpk5dMbEP34JbYz-mq7Pm287NrTgVgLMjPByI7BrmbtvLrqzgNRh8MWYDpfgiB0pxNr4i4NLBCGSKB-kgr6V_NfO6PDg0pGMMFKRhIdN9SEGKfowXwfblrNsRzGXLPZWS0GohDSfFZHRy-KeQEL_PNROoCS6S2Yoh_Dix6cSSQNs_IkIPxIuTCvkE8pGRjBOSOO-n8YD4MuVWAGrT_9qUFWDjylpF7Voo_4PQ5QDRTHBcc9m7TJ1nCLPNgWt-l7B0EYBam4EVETB4lg76SWKES1gRyua5RG1DMdsuzEb3PxyUYG_QBA";

const axios = Axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL});

axios.interceptors.request.use(
  async function (config) {
    // const accessToken = localStorage.getItem('accessToken');
    // if (!!accessToken) {
    //   config.headers["Authorization"] = `Bearer ${accessToken}`;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("error interceptor ===>", error);
    let networkErrorMessage = "";

    switch (error?.response?.status) {
      case 401:
        networkErrorMessage = "Unauthorized !";
        break;

      case 500:
        networkErrorMessage = "Something went wrong !";
        break;

      default:
        networkErrorMessage = "Something went wrong !";
        break;
    }
    toast.error(networkErrorMessage);
    return Promise.reject(error);
  }
);

export default axios;
