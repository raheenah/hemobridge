import { ApiFetch } from "./fetch"

export const DonorApi = {
    async register(formData) {
        const res = await ApiFetch.post(`/api/users/register/donor`, formData)
        .then((response)=> response)
        .catch((error)=> { throw error })
        // console.log(res)
        
        if(res.status !== 201) throw new Error("There was an error creating new donor, try again.");
        return res.data
    }
}