import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    root: {
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
    },
}));

export interface WidgetProps {
    title: string;
    children: any;
}

export default function Widget({ title, children }: WidgetProps) {
    const { classes } = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant="button">{title}</Typography>

            <Box mt={2}>{children}</Box>
        </Paper>
    );
}
