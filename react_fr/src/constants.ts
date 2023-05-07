import { useNavigate } from "react-router-dom";

export const  BACKEND_API_URL = "http://localhost:8000/api";




export let authorization = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MzQ5NDc5OCwiZXhwIjoxNjgzNTgxMTk4fQ.Qtfg7d_cJXWDuhjNhMBTS3WFeap5OBdWU7wQIqrERs4ePKOzyLI8CDD1dr1nl7TxTLCkmtNt5eZDpCnkfmobXA";
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


export const logOut = () =>{
	const navigate = useNavigate();
    userRole = "ROLE_ANONYMOUS";
    alert("signed out");
    navigate("/");
}