import { ApiFetch } from "./fetch";

export const ProfileApi = {
    async fetchMyProfile() {
      const data = await ApiFetch.get(`/api/profile`)
      .then((response)=> response.data.data)
      .catch((error)=> { throw error })

      return data
    }
}