import { ApiFetch } from "./fetch"

export const DonationApi = {
    async createBloodDonationSchedule(body) {
        const res = await ApiFetch.post(`/api/donation/schedule`, body)
        .then((response)=> response.data)
        .catch((error)=> { throw error.response.data })

        return res
    },

    fetchDonorSchedules: async (page = 1, status=undefined) => {
        const response = await ApiFetch.get(`/api/donation/schedule/donor?page=${page}&status=${status}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })
        return response.data;
    },

    fetchFacilitySchedules: async (page = 1, status=undefined) => {
        const response = await ApiFetch.get(`/api/donation/schedule/facility?page=${page}&status=${status}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })

        return response.data;
    },

    approveSchedule: async (scheduleId) => {
        const response = await ApiFetch.post(`/api/donation/schedule/${scheduleId}/approve`)
        .then((response)=> response)
        .catch((error)=> {throw error.response.data})
        return response.data;
    },

    declineSchedule: async (scheduleId) => {
        const response = await ApiFetch.post(`/api/donation/schedule/${scheduleId}/decline`)
        .then((response)=> response)
        .catch((error)=> {throw error.response.data})
        return response.data;
    }
}