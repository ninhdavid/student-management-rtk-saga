import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useMatches } from 'react-router-dom';
import ListPage from './pages/ListPage';
import { cityActions } from 'features/city/citySlice';
import AddEditPage from './pages/AddEditPage';

export interface StudentFeatureProps {}

export function StudentFeature(props: StudentFeatureProps) {
    const match = useLocation();
    const dispatch = useDispatch();
    console.log(match);

    useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [dispatch]);

    return (
        <Routes>
            <Route path={`${match}`} element={<ListPage />} />
            <Route path={`${match}/add`} element={<AddEditPage />} />
            <Route path={`${match}/:studentId`} element={<AddEditPage />} />
        </Routes>
    );
}
