import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import {
    dashboardActions,
    selectDashboardLoading,
    selectDashboardStatistics,
    selectHighestStudentList,
    selectLowestStudentList,
    selectRankingByCityList,
} from './dashboardSlice';
import { makeStyles } from 'tss-react/mui';
import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import StatisticItem from './components/StatisticItem';
import WomanIcon from '@mui/icons-material/Woman';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';

export interface DashboardProps {}

const useStyles = makeStyles()((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));

export function Dashboard(props: DashboardProps) {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectDashboardStatistics);
    const highestStudentList = useAppSelector(selectHighestStudentList);
    const lowestStudentList = useAppSelector(selectLowestStudentList);
    const rankingByCityList = useAppSelector(selectRankingByCityList);

    const { classes } = useStyles();

    React.useEffect(() => {
        dispatch(dashboardActions.fetchData());
    }, [dispatch]);
    return (
        <Box className={classes.root}>
            {/* Loading */}
            {loading && <LinearProgress className={classes.loading} />}

            {/* Statistic Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<PeopleAltIcon fontSize="large" color="primary" />}
                        label="male"
                        value={statistics.maleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<WomanIcon fontSize="large" color="primary" />}
                        label="female"
                        value={statistics.femaleCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<AlignVerticalBottomIcon fontSize="large" color="primary" />}
                        label="mark >= 8"
                        value={statistics.highMarkCount}
                    />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <StatisticItem
                        icon={<AlignVerticalTopIcon fontSize="large" color="primary" />}
                        label="mark <= 5"
                        value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>

            {/* All students rankings */}
            <Box mt={5}>
                <Typography variant="h4">All Students</Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with highest mark">
                                <StudentRankingList studentList={highestStudentList} />
                            </Widget>
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <Widget title="Student with lowest mark">
                                <StudentRankingList studentList={lowestStudentList} />
                            </Widget>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* Rankings by city */}
            <Box mt={5}>
                <Typography variant="h4">Rankings by city</Typography>

                <Box mt={2}>
                    <Grid container spacing={3}>
                        {rankingByCityList.map((ranking) => (
                            <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                                <Widget title={ranking.cityName}>
                                    <StudentRankingList studentList={ranking.rankingList} />
                                </Widget>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
