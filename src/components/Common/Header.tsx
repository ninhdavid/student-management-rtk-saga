import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

export function Header() {
    const dispatch = useAppDispatch();
    const handleLogoutClick = () => {
        dispatch(authActions.logout());
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Student Management
                    </Typography>
                    <Button color="inherit" onClick={handleLogoutClick}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
