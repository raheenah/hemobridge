import { ApiFetch } from "./fetch";

export const ProfileApi = {
    async fetchMyProfile() {
        console.log("Fetching profile data...")
        const data = await ApiFetch.get(`/api/profile`)
        .then((response)=> response.data.data)
        .catch((error)=> { throw error })
    

            console.log("Profile fetched:", data);

        return data
    }
}