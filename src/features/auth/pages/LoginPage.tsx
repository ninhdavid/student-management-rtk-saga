import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { makeStyles } from 'tss-react/mui';
import { authActions } from '../authSlice';
import { Outlet, Navigate } from 'react-router-dom';

export interface LoginPageProps {}

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    box: {
        padding: theme.spacing(3),
    },
}));

export default function LoginPage(props: LoginPageProps) {
    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const isLogging = useAppSelector((state) => state.auth.logging);

    const handleLoginClick = () => {
        dispatch(
            authActions.login({
                username: '',
                password: '',
            })
        );
    };
    const access_token = Boolean(localStorage.getItem('access_token'));
    if (access_token) {
        return <Navigate to="/admin " />;
    } else if (!access_token) {
        <Navigate to="/login" replace />;
    }
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>
                <Box mt={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLoginClick}
                    >
                        {isLogging && <CircularProgress size={20} color="secondary" />}{' '}
                        <span>FAKE LOGIN</span>
                    </Button>
                </Box>
            </Paper>
            <Outlet />
        </div>
    );
}
