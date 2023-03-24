import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            document.cookie =  `access=${accessToken}; path=/;`;
            document.cookie =  `refresh=${refreshToken}; path=/;`;

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