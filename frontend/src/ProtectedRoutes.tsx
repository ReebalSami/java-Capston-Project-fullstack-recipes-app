import {Navigate, Outlet} from "react-router-dom";
import {User} from "./types/User.ts";

type ProtectedRoutesProps = {
    user: User | undefined | null
}

export default function ProtectedRoutes(props: Readonly<ProtectedRoutesProps>) {
    if(props.user === undefined) {
        return <div>Loading...</div>
    }

    return props.user ? <Outlet /> : <Navigate to={"/"}/>
}