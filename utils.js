export const getLocalToken = () => localStorage.getItem("token")

export const saveLocalToken = (token) => localStorage.setItem("token" , token);

export const removeLocatToken = () => localStorage.removeItem("token") ;