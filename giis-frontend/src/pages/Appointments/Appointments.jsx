import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import AuthContext from '../../context/AuthContext';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';

const Appointments = () => {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    };

    const { user } = useContext(AuthContext);

    const { data: reservations, isPending, error } = useFetch(`/api/rezervacija/${user.id}`);

    console.log('reservations', reservations);

    const appointments = [
        { id: 1, date: '2023-10-01', time: '10:00 AM', patient: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, date: '2023-10-02', time: '11:00 AM', patient: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: 3, date: '2023-10-03', time: '12:00 PM', patient: 'Alice Johnson', email: 'alice.johnson@example.com' },
    ];

    return (
        <Box
            sx={{
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 1200,
            }}
        >
            <Typography variant="h4" gutterBottom>Pas jus užsirašę pacientai</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Laikas</TableCell>
                            <TableCell>Pacientas</TableCell>
                            <TableCell>Paciento el. paštas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations?.map((res) => (
                            <TableRow key={res.rezervacija.id}>
                                <TableCell>{dayjs(res.rezervacija.nuo_kada).format('YYYY-MM-DD')}</TableCell>
                                <TableCell>{dayjs(res.rezervacija.nuo_kada).format('HH:mm')}</TableCell>
                                <TableCell>{res.pacientas.vardas} {res.pacientas.pavarde}</TableCell>
                                <TableCell>{res.pacientas.el_pastas}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={handleMain} style={{ marginBottom: '16px' }}>
                Pagrindinis langas
            </Button>
        </Box>
    );
};

export default Appointments;