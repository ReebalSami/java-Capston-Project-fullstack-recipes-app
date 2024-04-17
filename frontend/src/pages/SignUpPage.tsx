import {User} from "../types/User.ts";
import "./SignUpPage.css";
import FormComponent from "../components/formComponent/FormComponent.tsx";

type SignUpPageProps={
    user:User;
    fetchUser: (actionToCall? : () => void)=>void;
}

export default function SignUpPage(props: Readonly<SignUpPageProps>){

    return(
        <div className={"pages"}>
            <br/>
            <div className={"signUpPage"}>
                <FormComponent user={props.user} fetchUser={props.fetchUser} path={"/"} formTarget={"create"}/>
            </div>
        </div>
    )
}