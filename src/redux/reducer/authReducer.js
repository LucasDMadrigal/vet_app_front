import { createReducer } from "@reduxjs/toolkit";
import { login, logout } from "../actions/authActions";

const storedUser = JSON.parse(localStorage.getItem("auth")) || null;

const initialState = storedUser || {
  loggedIn: false,
  token: "",
  expiresIn: "",
  isAdmin: false,
  user: {
    name: "",
    email: "",
  },
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      const newState = {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        },
        token: action.payload.token,
        loggedIn: action.payload.loggedIn,
        expiresIn: action.payload.expiresIn,
        rol: action.payload.rol,
      };
      localStorage.setItem("auth", JSON.stringify(newState));
      return newState;
    })
    .addCase(logout, () => {
      // Eliminar datos de localStorage al cerrar sesión
      localStorage.removeItem("auth");
      console.log("logout");
      return initialState;
      
    });
});
export default authReducer;
