import * as React from "react";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import "./UserAction.css";
import {User} from "../../types/User.ts";
import {useNavigate} from "react-router-dom";

type UserActionProps = {
    user: User | undefined | null
}

const LoggedOutSettings = ['Login', 'Sign Up'];
const LoggedInSettings = ['Profile', 'Logout'];

export default function UserAction(props: Readonly<UserActionProps>) {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const navigate = useNavigate();


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function Login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/oauth2/authorization/github', '_self');
    }

    function Logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }



    const handleMenuItemClick = (action: string) => {
        handleCloseUserMenu();
        if (action === 'Login' || action === 'Sign Up') {
            Login();
        } else if (action === 'Profile') {
            navigate('/profile/' + props.user?.id);
        }
        else if (action === 'Logout') {
            Logout();
        }
    };

    return (
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ flexGrow: 0 }}>
                        {props.user === null &&
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="profile_picture" > RS</Avatar>
                                </IconButton>
                            </Tooltip>}
                        {props.user &&
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="profile_picture" src={props.user.imagePath} />
                                </IconButton>
                            </Tooltip>}
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {props.user === null && LoggedOutSettings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            {props.user !== null && LoggedInSettings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {props.user !== null &&
                        <div className={"greeting"}>
                            <p className={"loginName"}>Hallo {props.user?.firstName}</p>
                        </div>
                    }
                </Box>
            </Container>
    );
}
