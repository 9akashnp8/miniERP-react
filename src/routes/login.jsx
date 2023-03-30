import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    getFiveMinsFromNow,
    getOneDayFromNow,
} from "../lib/functions";

export default function Login() {
    const navigate = useNavigate();
    
    async function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
    
        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                "username": username,
                "password": password
            })

            const accessToken = response.data.access;
            const refreshToken = response.data.refresh;
            const accessExpiry = getFiveMinsFromNow();
            const refreshExpiry = getOneDayFromNow();

            document.cookie =  `access=${accessToken}; path=/; expires=${accessExpiry.toUTCString()}`;
            document.cookie =  `refresh=${refreshToken}; path=/; expires=${refreshExpiry.toUTCString()}`;

            if (response.status == 200) {
                navigate("/");
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </>
    );
}