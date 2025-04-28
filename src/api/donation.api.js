import { ApiFetch } from "./fetch"

export const DonationApi = {
    async createBloodDonationSchedule(body) {
        const res = await ApiFetch.post(`/api/donation/schedule`, body)
        .then((response)=> response.data)
        .catch((error)=> { throw error })

        return res.data
    }
}