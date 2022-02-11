import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import db from "../db/db.json";
const mock = new MockAdapter(axios, { delayResponse: 1000 });
const defaultHeader = { headers: { Authorization: "" } };
mock.onGet("/users").reply(200, db);
mock.onPost("/users").reply(200);
mock.onPut("/users").reply(200);
const verifyHeaders = (headers: any) => {
  return headers["Authorization"] === "Bearer johndoe" ? true : false;
};
class httpService {
  post = async (url: string, request: any) => {
    request.headers = { Authorization: "Bearer johndoe" };
    if (verifyHeaders(request.headers)) {
      try {
        const res = await axios.post(url, request.data);
        if (res.status === 200) {
          return res;
        }
        throw new Error(`HTTP error code: ${res.status}`);
      } catch (error) {
        console.log("[error]: ", error);
      }
    }
  };
  put = async (url: string, request: any = defaultHeader) => {
    request.headers = { Authorization: "Bearer johndoe" };
    if (verifyHeaders(request.headers)) {
      try {
        const res = await axios.put(url, request.data);
        if (res.status === 200) {
          return res;
        }
        throw new Error(`HTTP error code: ${res.status}`);
      } catch (error) {
        console.log("[error]: ", error);
      }
    }
  };
  get = async (url: string, request: any = defaultHeader) => {
    request.headers.Authorization = "Bearer johndoe";
    if (verifyHeaders(request.headers))
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          return res;
        }
        throw new Error(`HTTP error code: ${res.status}`);
      } catch (error) {
        console.log("[error]: ", error);
      }
  };
}
export default new httpService();
