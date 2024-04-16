import {Alert, Avatar, Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../../types/User.ts";
import {useNavigate} from "react-router-dom";
import "./FormComponent.css";

type FormComponentProps = {
    user: User;
    path: string;
    formTarget: string;
    fetchUser: (actionToCall? : () => void)=>void;
}
export default function FormComponent(props: Readonly<FormComponentProps>) {
    const [allUsers, setAllUsers]=useState<User[]>([]);
    const [alert, setAlert] = useState<boolean | null>(null);
    const [formData, setFormData] = useState<User>(props.user ? {username: props.user.username, firstName: props.user.firstName, lastName:props.user.lastName} : {username: ''});
    const navigate = useNavigate();


    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(alert) {
            axios.post("/api/user/" + props.formTarget, formData)
                .then(() => {
                    props.fetchUser(() => {navigate(props.path)});
                });
        }
    }

    useEffect(getAllUsers, []);
    function getAllUsers(){
        axios.get("/api/user/all")
            .then(response => setAllUsers(response.data))
    }

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (allUsers.filter(user => user.username === value).length !== 0){
            setAlert(false);
        } else {
            setAlert(true);
        }
        setFormData((prevData) => ({
            ...prevData,
            username: value,
        }));
    }

    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            firstName: value,
        }));
    }
    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            lastName: value,
        }));
    }

    return (
        <div >
            <Avatar className={"formPicture"} alt="profile_picture" src={props.user.imagePath}/>
            <form className={"form"} onSubmit={handleOnSubmit}>
                <TextField title={"TEST"} sx={{m: 1, width: 300}}
                           id={"username"} label={"Username"} variant={"outlined"} value={formData.username}
                           onChange={handleChangeUsername} size={"small"} required/>
                {alert === false &&  <Alert severity="error">Username already exists.</Alert>}
                {alert === true &&  <Alert severity="success">Username is available.</Alert>}

                <br/>
                <TextField sx={{m: 1, width: 300}}
                           id={"firstName"} label={"First Name"} variant={"outlined"} value={formData.firstName}
                           onChange={handleChangeFirstName} size={"small"}/>
                <br/>
                <TextField sx={{m: 1, width: 300}}
                           id={"lastName"} label={"Last Name"} variant={"outlined"} value={formData.lastName}
                           onChange={handleChangeLastName} size={"small"}/>
                <Button className={"saveButton"} type={"submit"} variant={"contained"} size={"small"}>
                    Save
                </Button>
            </form>
        </div>
    )
}