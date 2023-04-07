import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/Common';
import { Dashboard } from 'features/dashboard';
import { StudentFeature } from 'features/student';
import { Route, Routes } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

export interface AdminLayoutProps {}
const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: `'header header' 'sidebar main'`,

        minHeight: '100vh',
    },
    header: {
        gridArea: 'header',
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    main: {
        gridArea: 'main',
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2, 3),
    },
}));

export function AdminLayout() {
    const { classes } = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header />
            </Box>
            <Box className={classes.sidebar}>
                <Sidebar />
            </Box>
            <Box className={classes.main}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students/*" element={<StudentFeature />} />
                </Routes>
            </Box>
        </Box>
    );
}
