import Axios from "axios";
import { toast } from "react-toastify";
const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLdlpRVmxIdkJTNW4wNDR0V3RLQmsyR2Zac0NjdFE4U3cyRGxETC1OUDJvIn0.eyJleHAiOjE3MDk1NzU3NjMsImlhdCI6MTcwOTU1NDE2MywianRpIjoiMzIwYzRhZTQtZTdkNy00OGY2LWI4NWEtZTQ3MjM4Y2EyM2NjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9FdmdlbnlFY29tbWVyY2UiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTViMzhkOTktZDEyYi00ZDdhLWFiZGUtYTIyZWFlM2ZkZDQxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiRXZnZW55Q2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjQxNTkyZDU5LTUxYzQtNDRlMS1iNTI3LTVjZjdlNGY5YWI2MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIlNlbGxlciIsImRlZmF1bHQtcm9sZXMtZXZnZW55ZWNvbW1lcmNlIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgU3RvcmVJRCBwcm9maWxlIHNlY3JldCBjdXN0b21fc2NvcGUgZW1haWwiLCJzaWQiOiI0MTU5MmQ1OS01MWM0LTQ0ZTEtYjUyNy01Y2Y3ZTRmOWFiNjEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoibnBrLm5hcm9sYStzZWxsZXJAZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIiwiZW1haWwiOiJucGsubmFyb2xhK3NlbGxlckBnbWFpbC5jb20ifQ.CMP6bslnVf9jfx-L3R2Tspk2CyXTU830PCho9Oz5B1OJjjhLaokEyBu-OWusNBe9mPBzalSX_g-tJbNHDBVQquWcxwiWHrnQOfl02OBseFBh4zclNh6OGkn9ZCcM8XHgmdBEk-N30KlcPAR0t7ab2DSyR8HBMjUpoY7igboB2MyvzxuZx938FZRfHrS-DRMBsMRlEBvoxCjbXDsszOG7LXwzbhZnxCe2TPxXJWY9BWe1tVjDsGNxxTO2VChecsFG2Wfsi5mj8pwjYDUWsL64_v6GVQqoCLxGRA9hQ6FVV4OUdHFTYDUq9AiL7ShHjDkT50FE1o7CO7UnSfRfKpK4EA';

const axios = Axios.create({baseURL: import.meta.env.VITE_API_BASE_URL});

axios.interceptors.request.use(
  async function (config) {    
    // const accessToken = localStorage.getItem('accessToken');
    
    if(!!accessToken){
      config.headers.Authorization =  `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response time
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
    let networkErrorMessage = '';
    
    switch (error?.response?.status) {
        case 401:
            networkErrorMessage = "Unauthorized !"
            break;

        case 500:
            networkErrorMessage = "Something went wrong !"
            break;
    
        default:
            networkErrorMessage = "Something went wrong !"
            break;
    }
    toast.error(networkErrorMessage);
    return Promise.reject(error);
  }
);

export default axios;
