import axios from "axios";

const baseURL = "http://20.210.235.55"

export default axios.create({
    baseURL,
});
