import axios from "axios"

import { getCookie } from "./utils"

export async function getEmployees() {
    const data = [];
    try {
        const accessToken = getCookie("access");
        const response = await axios.get("http://localhost:8000/api/employee/", {
            headers: {
                Authorization: `Token ${accessToken}`
            }
        })
        
        data.push(...response.data.results)
    } catch(error) {
        console.log(error)
    }
    return data
}