export const fetchUserProfile = async () => {
  try {
    const response = await fetch(
      "https://hemobridge-project.onrender.com/profile",
      {
        method: "GET",
        credentials: "include", // 🔥 includes the cookie in the request
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return data.data; // user profile
    } else {
      throw new Error(data.message || "Failed to fetch profile");
    }
  } catch (error) {
    console.error("Fetch profile error:", error);
    return null;
  }
};
