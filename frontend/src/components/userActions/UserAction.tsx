type UserActionProps = {
    user: string | undefined | null

}
export default function UserAction(props: Readonly<UserActionProps>) {

    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin

        window.open(host + '/oauth2/authorization/github', '_self')
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin

        window.open(host + '/logout', '_self')
    }

    return (
        <div className={"icon-place login"}>
            <div>
                {props.user === null && <button className={"loginButtons"} onClick={login}>Login</button>}
                {props.user !== null && <button className={"loginButtons"} onClick={logout}>Logout</button>}
            </div>
            <div className={"greeting"}>
                {props.user !== null && <p className={"loginName"}>Hallo {props.user}</p>}
            </div>
        </div>
    );
}
