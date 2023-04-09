import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import AddEditPage from 'features/student/pages/AddEditPage';
import ListPage from 'features/student/pages/ListPage';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/*"
                    element={<PrivateRoute path="/admin/*" element={<AdminLayout />} />}
                />
                <Route element={<NotFound />} />
                {/* <Route path="admin/students" element={<ListPage />} />
                <Route path="admin/students/add" element={<AddEditPage />} />
                <Route path="admin/students/:studentId" element={<AddEditPage />} /> */}
            </Routes>
        </div>
    );
}

export default App;
