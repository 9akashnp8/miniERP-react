import { getCookie } from "./utils"
import api from "./axios";

export async function getEmployees() {
    const data = [];
    try {
        const accessToken = getCookie("access");
        const response = await api.get("http://localhost:8000/api/employee/", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        
        data.push(...response.data.results)
    } catch(error) {
        // console.log(error)
    }
    return data
}