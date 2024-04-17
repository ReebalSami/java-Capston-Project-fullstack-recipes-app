import {User} from "../types/User.ts";
import "./EditProfile.css";
import FormComponent from "../components/formComponent/FormComponent.tsx";

type EditProfileProps={
    fetchUser: ()=>void;
    user: User;
}
export default function EditProfile(props: Readonly<EditProfileProps>){
    return(
        <div className={"pages"}>
            <div className={"editProfile"}>
                <p className={"editProfile_text"}>Edit your profile here</p>
                <FormComponent fetchUser={props.fetchUser} user={props.user} path={"/profile/:id"} formTarget={"edit"}/>
            </div>
        </div>
    )
}