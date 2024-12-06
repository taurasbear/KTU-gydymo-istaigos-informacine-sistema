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
    const occupations = ['Cardiologist', 'Dermatologist', 'Neurologist'];

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
            <Box display="flex" flexDirection="column" alignItems="center" p={2}>
                <Button
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: '200px' }}
                    onClick={handleMain}
                >
                    Main Menu
                </Button>
                <Typography variant="h6">Book an Appointment</Typography>
                <DatePicker
                    label="Select Date"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} margin="normal" />}
                />
                <TimePicker
                    label="Select Time"
                    value={selectedTime}
                    onChange={(newValue) => setSelectedTime(newValue)}
                    renderInput={(params) => <TextField {...params} margin="normal" />}
                />
                <FormControl margin="normal" sx={{ width: '200px' }}>
                    <InputLabel id="appointment-length-label">Appointment Length</InputLabel>
                    <Select
                        labelId="appointment-length-label"
                        value={appointmentLength}
                        onChange={(e) => setAppointmentLength(e.target.value)}
                    >
                        <MenuItem value={15}>15 minutes</MenuItem>
                        <MenuItem value={30}>30 minutes</MenuItem>
                        <MenuItem value={45}>45 minutes</MenuItem>
                        <MenuItem value={60}>1 hour</MenuItem>
                    </Select>
                </FormControl>
                <FormControl margin="normal" sx={{ width: '200px' }}>
                    <InputLabel id="doctor-label">Select Doctor</InputLabel>
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
                <FormControl margin="normal" sx={{ width: '200px' }}>
                    <InputLabel id="occupation-label">Select Occupation</InputLabel>
                    <Select
                        labelId="occupation-label"
                        value={selectedOccupation}
                        onChange={(e) => setSelectedOccupation(e.target.value)}
                    >
                        {occupations.map((occupation) => (
                            <MenuItem key={occupation} value={occupation}>{occupation}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '16px' }}>
                    Book Appointment
                </Button>
            </Box>
        </LocalizationProvider>
    );
};

export default BookAppointment;