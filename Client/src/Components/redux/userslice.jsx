import { createSlice } from "@reduxjs/toolkit";

// Retrieve user data from localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || {
  id: "",
  username: "",
  name: "",
  email: "",
  role: "",
  token:"",
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: storedUser,
  reducers: {
    createUser: (state, action) => {
      const newUser = {
        ...state,
        id: action.payload.id || action.payload._id || "", // Support both 'id' and '_id'
        username: action.payload.username || "",
        name: action.payload.name || "",
        email: action.payload.email || "",
        role: action.payload.role || "",
        token :action.payload.token,
        isAuthenticated: true, // User is now logged in
      };

      // Persist user data in localStorage
      localStorage.setItem("user", JSON.stringify(newUser)); 
      return newUser;
    },
    updateUser: (state, action) => {
      const updatedUser = {
        ...state,
        ...action.payload, // Update only provided fields
      };

      // Update the stored user data in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser)); 
      return updatedUser;
    },
    logoutUser: () => {
      // Clear user data from localStorage and return the initial state
      localStorage.removeItem("user"); 
      return {
        id: "",
        username: "",
        name: "",
        email: "",
        role: "",
        token : "",
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    },
  },
});

export const 
{ createUser, updateUser, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
