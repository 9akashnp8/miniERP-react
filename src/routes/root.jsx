import { Outlet, Link } from "react-router-dom"

export default function Root() {

    return (
        <>
            <Link to={'/'}>Home</Link>
            <Link to={'employee'}>Employee</Link>
            <Link to={'login'}>Login</Link>
            <Outlet />
        </>
    )
}
