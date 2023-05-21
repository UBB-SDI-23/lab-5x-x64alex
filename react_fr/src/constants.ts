import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//export const  BACKEND_API_URL_CHAT = "https://alexcant.twilightparadox.com";
export const  BACKEND_API_URL_CHAT = "http://localhost:8000";

export const  BACKEND_API_URL = BACKEND_API_URL_CHAT+"/api";





export let authorization = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4NDY3NDYxMiwiZXhwIjoxNjg0NzYxMDEyfQ.rcWBesGZTSIOYrJSEeIR1dW5cOH17gW36dNWNQEgbJuHGD2vhdBdSyDYKMdb0w6mEUpbsjEbXL9i2LalqN2ewQ";
export function updateGlobalVar(newValue: string) {
    authorization = newValue;
}
export let userRole = "ROLE_ANONYMOUS"
export function updateUserRole(newValue: string) {
    userRole = newValue;
}
export function isAdmin() {
    return  userRole === "ROLE_ADMIN";
}

export function isLoggedIn() {
    return  userRole !== "ROLE_ANONYMOUS";
}

export let userName = ""
export const logOut = () => {
    userRole = "ROLE_ANONYMOUS";
    userName = "";
    alert("signed out");
}




export function updateUserName(newValue: string) {
    userName = newValue;
}

export function canAdd() {
    return (userRole === "ROLE_REGULAR") || (userRole === "ROLE_MODERATOR") || (userRole === "ROLE_ADMIN")
}



  export function canEdit(user: String) {
        return (user === userName && userRole === "ROLE_REGULAR") || (userRole === "ROLE_MODERATOR") || (userRole === "ROLE_ADMIN");
  }
