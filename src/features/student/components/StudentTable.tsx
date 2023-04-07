import React, { useState } from 'react';
import { City, Student } from 'models';
import { makeStyles } from 'tss-react/mui';
import {
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableBody,
    Box,
    Table,
    TableCell,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';
import { capitalizeString, getMarkColor } from 'utils/common';

const useStyles = makeStyles()((theme) => ({
    table: {},
    edit: {
        marginRight: theme.spacing(1),
    },
}));

export interface StudentTableProps {
    studentList: Student[];
    cityMap: {
        [key: string]: City;
    };
    onEdit?: (student: Student) => void;
    onRemove?: (student: Student) => void;
}

export default function StudentTable({
    studentList,
    cityMap,
    onEdit,
    onRemove,
}: StudentTableProps) {
    const { classes } = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>();
    const handleClose = () => {
        setOpen(false);
    };

    const handleRemoveClick = (student: Student) => {
        setSelectedStudent(student);
        setOpen(true);
    };

    const handleRemoveConfirm = (student: Student) => {
        onRemove?.(student);
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {studentList.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell width={310}>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{capitalizeString(student.gender)}</TableCell>
                                <TableCell>
                                    <Box color={getMarkColor(student.mark)} fontWeight="bold">
                                        {student.mark}
                                    </Box>
                                </TableCell>
                                <TableCell>{cityMap[student.city]?.name}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        className={classes.edit}
                                        color="primary"
                                        onClick={() => onEdit?.(student)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => handleRemoveClick(student)}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Remove dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to remove student named "{selectedStudent?.name}". <br />
                        This action can&apos;t be undo.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit" variant="outlined">
                        Cancel
                    </Button>

                    <Button
                        onClick={() => handleRemoveConfirm(selectedStudent as Student)}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
