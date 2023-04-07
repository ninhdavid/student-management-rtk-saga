import { Box, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import studentApi from 'api/student';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
    const history = useNavigate();
    const { studentId } = useParams<{ studentId: string }>();
    const isEdit = Boolean(studentId);
    const [student, setStudent] = useState<Student>();

    useEffect(() => {
        if (!studentId) return;

        // IFFE
        (async () => {
            try {
                const data: Student = await studentApi.getById(studentId);
                setStudent(data);
            } catch (error) {
                console.log('Failed to fetch student details', error);
            }
        })();
    }, [studentId]);

    const handleStudentFormSubmit = async (formValues: Student) => {
        // TODO: Handle submit here, call API  to add/update student
        if (isEdit) {
            await studentApi.update(formValues);
        } else {
            await studentApi.add(formValues);
        }

        // Toast success
        toast.success('Save student successfully!');

        // Redirect back to student list
        history('/admin/students');
    };

    const initialValues: Student = {
        name: '',
        age: '',
        mark: '',
        gender: 'male',
        city: '',
        ...student,
    } as Student;

    return (
        <Box>
            <Link to="/admin/students">
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                    <ChevronLeftIcon /> Back to student list
                </Typography>
            </Link>

            <Typography variant="h4">
                {isEdit ? 'Update student info' : 'Add new student'}
            </Typography>

            {(!isEdit || Boolean(student)) && (
                <Box mt={3}>
                    <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
                </Box>
            )}
        </Box>
    );
}
