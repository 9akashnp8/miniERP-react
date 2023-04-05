import api from "./axios";

export async function getLaptops() {
    const data = [];
    try {
        const response = await api.get("laptop/")
        
        data.push(...response.data.results)
    } catch(error) {
        // console.log(error)
    }
    return data
}