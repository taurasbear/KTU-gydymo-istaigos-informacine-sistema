import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Appointments = () => {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    };

    const appointments = [
        { id: 1, date: '2023-10-01', time: '10:00 AM', patient: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, date: '2023-10-02', time: '11:00 AM', patient: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: 3, date: '2023-10-03', time: '12:00 PM', patient: 'Alice Johnson', email: 'alice.johnson@example.com' },
    ];

    return (
        <div>
            <Typography variant="h4" gutterBottom>Appointments</Typography>
            <Button variant="contained" color="primary" onClick={handleMain} style={{ marginBottom: '16px' }}>
                Main Menu
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Patient</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell>{appointment.date}</TableCell>
                                <TableCell>{appointment.time}</TableCell>
                                <TableCell>{appointment.patient}</TableCell>
                                <TableCell>{appointment.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Appointments;