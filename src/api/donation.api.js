import { ApiFetch } from "./fetch"

export const DonationApi = {
  async createBloodDonationSchedule(body) {
    const res = await ApiFetch.post(`/api/donation/schedule`, body)
      .then((response) => response.data)
      .catch((error) => {

        throw error.response.data;
      });

    return res;
  },

    fetchSchedules: async ({page = 1, status=undefined, creator=false}) => {
        const response = await ApiFetch.get(`/api/donation/schedule?page=${page}&status=${status}&creator=${creator}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })
        return response.data;
    },

    fetchDonorSchedules: async (page = 1, status=undefined, creator=false) => {
        const response = await ApiFetch.get(`/api/donation/schedule/donor?page=${page}&status=${status}&creator=${creator}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })
        return response.data;
    },

    fetchFacilitySchedules: async (page = 1, status=undefined, creator=false) => {
        const response = await ApiFetch.get(`/api/donation/schedule/facility?page=${page}&status=${status}&creator=${creator}`)
        .then((response)=> response.data)
        .catch((error)=> { throw error })

    return response.data;
  },

  approveSchedule: async (scheduleId) => {
    const response = await ApiFetch.post(
      `/api/donation/schedule/${scheduleId}/approve`
    )
      .then((response) => response)
      .catch((error) => {
        throw error.response.data;
      });
    return response.data;
  },

  declineSchedule: async (scheduleId) => {
    const response = await ApiFetch.post(
      `/api/donation/schedule/${scheduleId}/decline`
    )
      .then((response) => response)
      .catch((error) => {
        throw error.response.data;
      });
    return response.data;
  },

  completeSchedule: async (scheduleId) => {
    const response = await ApiFetch.post(
      `/api/donation/schedule/${scheduleId}/complete`
    )
      .then((response) => response)
      .catch((error) => {
        throw error.response.data;
      });
    return response.data;
  },

  cancelSchedule: async (scheduleId) => {
    const response = await ApiFetch.post(
      `/api/donation/schedule/${scheduleId}/cancel`
    )
      .then((response) => response)
      .catch((error) => {
        throw error.response.data;
      });
    return response.data;
  },

  // a donor method
  acceptSchedule: async (scheduleId, body) => {
    const response = await ApiFetch.patch(
      `/api/donation/schedule/${scheduleId}/assign`,
      body
    )
      .then((response) => response)
      .catch((error) => {
        throw error.response.data;
      });
    return response.data;
  },
};