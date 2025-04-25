import { ApiFetch } from "./fetch"




export const FacilityListApi = {
    async fetchFacilitiesList(page) {
        
    // console.log("fetching facility list...");

    const res = await ApiFetch.get(`/api/facility/${page}`)
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
    // console.log(res);

    // console.log("facility list response fetched:", res);
    // console.log("facility list data fetched:", res.data);
    // console.log("facility list data list fetched:", res.data.data.list);

    if (!(res.status >= 200 && res.status < 300))
      throw new Error(
        "There was an error fetching the facility's details, try again."
      );
    return res.data.data;
  },
};