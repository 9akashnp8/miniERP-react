import api from "./axios";

export async function getEmployees() {
    const data = [];
    try {
        const response = await api.get("employee/")
        
        data.push(...response.data.results)
    } catch(error) {
        // console.log(error)
    }
    return data
}