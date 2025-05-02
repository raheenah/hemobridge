import { ApiFetch } from "./fetch"

export const FacilityApi = {
  async register(formData) {
    // console.log("formData", formData)
    const res = await ApiFetch.post(`/api/facility`, formData)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });

    if (res.status !== 201)
      throw new Error("There was an error creating new donor, try again.");
    return res.data;
  },

  async updateInventory(facilityId, inventoryId, formData) {
    // console.log("formData", formData)
    const res = await ApiFetch.put(
      `/api/facility/${facilityId}/inventory/${inventoryId}`,
      formData
    )
      .then((response) => response)
      .catch((error) => {
        throw error;
      });

    if (res.status !== 201)
      throw new Error("There was an error creating new donor, try again.");
    return res.data;
  },

  async fetch(page) {
    const res = await ApiFetch.get(`/api/facility/${page}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });

    return res.data;
  },

  async fetchBloodInventory(facilityId) {
    const res = await ApiFetch.get(`/api/facility/${facilityId}/inventory`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });

    return res.data;
  },

  async fetchStaffProfile(userId) {
    const res = await ApiFetch.get(`/api/facility/staff/${userId}`)
      .then((response) => {
        response.data;
        // console.log("staff profile", response.data)
      })
      .catch((error) => {
        throw error;
      });

    return res.data;
  },
};