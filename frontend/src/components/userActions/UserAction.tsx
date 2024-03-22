import {Link} from "react-router-dom";

export default function UserAction() {
    return (
        <div className="user-actions">
            <Link to={"/login"}>Login</Link>
            <Link to={"/signup"}>Signup</Link>
        </div>
    );
}
