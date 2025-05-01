import { ApiFetch } from "./fetch"
import { useProfileContext } from "../shared/context/user-profile-context";




// const user= useProfileContext()
export const FacilityDetailsApi = {
 
    async fetchFacilityDetails(id) {
                //   console.log("fetching facility details...");

        const res = await ApiFetch.get(`/api/facility/${id}`)
        .then((response)=> response)
        .catch((error)=> { throw error })
        // console.log(res)
        
                //   console.log("facility details fetched:", res);

        if(!(res.status >= 200 && res.status<300)) throw new Error("There was an error fetching the facility's details, try again.");
        return res.data
    }
}