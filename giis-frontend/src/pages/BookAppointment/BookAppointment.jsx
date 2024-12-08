import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/lt';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [appointmentLength, setAppointmentLength] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedOccupation, setSelectedOccupation] = useState('');

    const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];

    const handleSubmit = () => {
        // Process the booking with selectedDate, selectedTime, and appointmentLength
        console.log('Booking Date:', selectedDate);
        console.log('Booking Time:', selectedTime);
        console.log('Appointment Length:', appointmentLength);
        console.log('Selected Doctor:', selectedDoctor);
        console.log('Selected Occupation:', selectedOccupation);
    };

    const handleMain = () => {
        navigate('/');
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="lt">
            <Box
                sx={{
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 300,
                }}
            >
                <Typography variant="h6">Rezervacija pas gydytoją</Typography>
                <FormControl margin="normal" sx={{ width: '200px' }}>
                    <InputLabel id="doctor-label">Pasirinkite gydytoją</InputLabel>
                    <Select
                        labelId="doctor-label"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        {doctors.map((doctor) => (
                            <MenuItem key={doctor} value={doctor}>{doctor}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DatePicker
                    label="Pasirinkite datą"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} margin="normal" />}
                />
                <TimePicker
                    label="Pasirinkite vizito pradžios laiką"
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                    renderInput={(params) => <TextField {...params} margin="normal" />}
                />
                <FormControl margin="normal" sx={{ width: '200px' }}>
                    <InputLabel id="appointment-length-label">Vizito trukmė</InputLabel>
                    <Select
                        labelId="appointment-length-label"
                        value={appointmentLength}
                        onChange={(e) => setAppointmentLength(e.target.value)}
                    >
                        <MenuItem value={15}>15 min</MenuItem>
                        <MenuItem value={30}>30 min</MenuItem>
                        <MenuItem value={45}>45 min</MenuItem>
                        <MenuItem value={60}>1 h</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
                    Sukurti rezervaciją
                </Button>

                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '200px' }}
                    onClick={handleMain}
                >
                    Pagrindinis puslapis
                </Button>
            </Box>
        </LocalizationProvider>
    );
};

export default BookAppointment;