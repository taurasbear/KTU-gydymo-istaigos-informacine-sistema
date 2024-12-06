import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const RegisterDoctorTimetable = () => {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    }

    const [doctor, setDoctor] = useState('');
    const [date, setDate] = useState('');
    const [timeRange, setTimeRange] = useState('');

    const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];
    const dates = ['2023-10-01', '2023-10-02', '2023-10-03'];
    const timeRanges = ['09:00-11:00', '11:00-13:00', '13:00-15:00'];

    const handleSubmit = () => {
        // Handle form submission
        console.log({ doctor, date, timeRange });
    }

    return (
        <div>
            <h1>Register Doctor Timetable</h1>
            <FormControl fullWidth margin="normal">
                <InputLabel id="doctor-label">Select Doctor</InputLabel>
                <Select
                    labelId="doctor-label"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                >
                    {doctors.map((doc) => (
                        <MenuItem key={doc} value={doc}>{doc}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="date-label">Select Date</InputLabel>
                <Select
                    labelId="date-label"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                >
                    {dates.map((d) => (
                        <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="time-range-label">Select Time Range</InputLabel>
                <Select
                    labelId="time-range-label"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                >
                    {timeRanges.map((tr) => (
                        <MenuItem key={tr} value={tr}>{tr}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
            <Button onClick={handleMain} variant="outlined" color="secondary">Main Menu</Button>
        </div>
    );
}

export default RegisterDoctorTimetable;