import axios from "axios";

console.log(process.env.BASEURL)
const baseURL = process.env.BASEURL

export default axios.create({
    baseURL,
});
