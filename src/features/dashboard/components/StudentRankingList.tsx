import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Student } from 'models';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
    table: {},
});

export interface StudentRankingListProps {
    studentList: Student[];
}

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
    const { classes } = useStyles();
    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="right">Mark</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {studentList.map((student, idx) => (
                        <TableRow key={student.id}>
                            <TableCell align="center">{idx + 1}</TableCell>
                            <TableCell align="left">{student.name}</TableCell>
                            <TableCell align="right">{student.mark}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
