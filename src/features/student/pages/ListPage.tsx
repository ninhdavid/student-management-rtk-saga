import { Box, Button, LinearProgress, Typography, Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
    selectStudentLoading,
    selectStudentFilter,
    selectStudentList,
    selectStudentPagination,
    studentActions,
} from '../studentSlice';
import { makeStyles } from 'tss-react/mui';
import { toast } from 'react-toastify';
import studentApi from 'api/student';

const useStyles = makeStyles()((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1),
    },

    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4),
    },

    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%',
    },
}));

export default function ListPage() {
    const { classes } = useStyles();
    const match = useLocation();
    const history = useNavigate();
    const studentList = useAppSelector(selectStudentList);
    const pagination = useAppSelector(selectStudentPagination);
    const filter = useAppSelector(selectStudentFilter);
    const loading = useAppSelector(selectStudentLoading);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter));
    }, [dispatch, filter]);
    const handlePageChange = (e: any, page: number) => {
        dispatch(
            studentActions.setFilter({
                ...filter,
                _page: page,
            })
        );
    };
    const handleSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWithDebounce(newFilter));
    };
    const handleFilterChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    };
    const handleRemoveStudent = async (student: Student) => {
        try {
            await studentApi.remove(student?.id || '');
            toast.success('Remove Student Successfully');

            //trigger to re-fetch list of students
            const newFilter = { ...filter };
            dispatch(studentActions.setFilter(newFilter));
        } catch (err) {
            console.log('failed to fetch student', err);
        }
    };
    const handleEditStudent = async (student: Student) => {
        history(`${match.pathname}/${student.id}`);
    };
    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading} />}

            <Box className={classes.titleContainer}>
                <Typography variant="h4">Students</Typography>

                <Link to={`${match.pathname}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">
                        Add new student
                    </Button>
                </Link>
            </Box>

            <Box mb={3}>
                <StudentFilters
                    filter={filter}
                    cityList={cityList}
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </Box>

            <StudentTable
                studentList={studentList}
                cityMap={cityMap}
                onEdit={handleEditStudent}
                onRemove={handleRemoveStudent}
            />
            <Box my={2} display="flex" justifyContent="center">
                <Pagination
                    color="primary"
                    count={Math.ceil(pagination._totalRows / pagination._limit)}
                    page={pagination?._page}
                    onChange={handlePageChange}
                />
            </Box>
        </Box>
    );
}
