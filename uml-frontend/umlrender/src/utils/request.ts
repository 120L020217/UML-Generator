import axios from "axios";
const request = axios.create({
    timeout: 5000,
    validateStatus: status => status < 500,
});

export default request;