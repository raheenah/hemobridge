import { ApiFetch } from "./fetch"

export const FacilityApi = {
    async register(formData) {
        const res = await ApiFetch.post(`/api/facility`, formData)
        .then((response)=> response)
        .catch((error)=> { throw error })
        
        if(res.status !== 201) throw new Error("There was an error creating new donor, try again.");
        return res.data
    },

    async fetch(page) {
        const res = await ApiFetch.get(`/api/facility/${page}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })

        return res.data
    }
}