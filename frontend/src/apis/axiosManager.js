import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL
console.log(baseURL)
export default axios.create({
    baseURL,
});
