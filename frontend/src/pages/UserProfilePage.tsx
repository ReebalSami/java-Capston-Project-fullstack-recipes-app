import {User} from "../types/User.ts";
import {useNavigate, useParams} from "react-router-dom";
import {SyntheticEvent, useEffect, useState} from "react";
import {ExpandMore} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {AppBar, Collapse, Tabs} from "@mui/material";
import "./UserProfilePage.css";


type UserProfilePageProps ={
    user: User;
}

export default function UserProfilePage(props: Readonly <UserProfilePageProps>){
    const navigate = useNavigate();
    const {tabName} =useParams();
    const [value, setValue] = useState<string>(tabName ?? "recipes");
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (tabName) setValue(tabName);
    }, [tabName]);

    const handleChange = (_event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate("/profile/"+newValue);
    };

    return (
        <div>
            <div className={"profileHeader"}>
                <div className={"profilePicInfo"}>
                    <img className={"profilePicture"} alt={"my_picture"} src={props.user.imagePath}/>
                    <div className={"profileText"}>
                        <p className={"profileName"}>{props.user.username}</p>
                        <ExpandMore onClick={handleExpandClick}>
                            show more details
                        </ExpandMore>
                    </div>
                </div>
                <div className={"profileButtons"}>
                    <IconButton onClick={() => navigate("/editProfile")}><ManageAccountsIcon/></IconButton>
                </div>
            </div>
            <Collapse className={"profileDetails"} in={expanded}>
                <p>{props.user.firstName}</p>
                <p>{props.user.lastName}</p>
            </Collapse>
            <div className={"selectListBar"}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="action tabs example"
                    >
                    </Tabs>
                </AppBar>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>

    )
}