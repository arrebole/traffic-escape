
import axios, { AxiosPromise } from "axios";



function save(str: string): AxiosPromise {
    return axios.post("/api/save", { "content": str }, {
        "headers": {
            "Content-Type": "application/json"
        }
    });
}

function take(hash: string): AxiosPromise {
    return axios.get("/api/take", {
        params: {
            hash
        }
    });
}
export default { save, take }