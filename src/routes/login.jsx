import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

export default function Login() {
    const navigate = useNavigate();
    const [ login ] = useLoginMutation();
    const dispatch = useDispatch();
    
    async function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
    
        try {
            const userData = await login({ username, password}).unwrap()
            dispatch(setCredentials({ ...userData }))
            navigate('/')
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