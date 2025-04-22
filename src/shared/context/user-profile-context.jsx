import { createContext, useContext } from "react";


export const ProfileContext = createContext(undefined);

// export function ProfileProvider({ children }) {
//     const [user, setUser] = useState();

//     return (
//         <ProfileContext.Provider value={{ user, setUser }}>
//             { children }
//         </ProfileContext.Provider>
//     )
// }

export const useProfileContext = ()=> useContext(ProfileContext)