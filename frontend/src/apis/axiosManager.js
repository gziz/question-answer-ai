import axios from "axios";

//const baseURL = process.env.REACT_APP_BASEURL

const baseURL = 'http://127.0.0.1:8000';
export default axios.create({
    baseURL,
});
