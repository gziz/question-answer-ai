import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL


export default axios.create({
    baseURL,
});
