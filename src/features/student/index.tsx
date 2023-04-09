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
    useEffect(() => {
        dispatch(cityActions.fetchCityList());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/add" element={<AddEditPage />} />
            <Route path="/:studentId" element={<AddEditPage />} />
        </Routes>
    );
}
{
    /* <Route path="admin/students" element={<ListPage />} />
                <Route path="admin/students/add" element={<AddEditPage />} />
                <Route path="admin/students/:studentId" element={<AddEditPage />} /> */
}
