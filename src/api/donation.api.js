import { ApiFetch } from "./fetch"

export const DonationApi = {
    async createBloodDonationSchedule(body) {
        const res = await ApiFetch.post(`/api/donation/schedule`, body)
        .then((response)=> response.data)
        .catch((error)=> { throw error })

        return res.data
    },

    fetchDonorSchedules: async (page = 1) => {
        const response = await ApiFetch.get(`/api/donation/schedule/donor?page=${page}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })
        return response.data;
    },

    fetchFacilitySchedules: async (page = 1) => {
        const response = await ApiFetch.get(`/api/donation/schedule/facility?page=${page}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })

        return response.data;
    },

    acceptSchedule: async (scheduleId) => {
        const response = await ApiFetch.post(`/api/donation/schedule/${scheduleId}/accept`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })
        return response.data;
    },

    declineSchedule: async (scheduleId) => {
        const response = await ApiFetch.post(`/api/donation/schedule/${scheduleId}/decline`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })
        return response.data;
    }
}