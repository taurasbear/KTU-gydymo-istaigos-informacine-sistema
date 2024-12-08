import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';

const RegisterDoctorTimetable = () => {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    }

    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeRange, setSelectedTimeRange] = useState('');

    const { data: doctors, loading: doctorsLoading, error: doctorsError } = useFetch('/api/doctors');
    // disabled until doctor selected
    //const { data: dates, loading: datesLoading, error: datesError } = useFetch('/api/dates');
    // disabled until date selected
    //const { data: timeRanges, loading: timeRangesLoading, error: timeRangesError } = useFetch('/api/timeRanges');

    // const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];
    const dates = ['2023-10-01', '2023-10-02', '2023-10-03'];
    const timeRanges = ['09:00-11:00', '11:00-13:00', '13:00-15:00'];

    const handleSubmit = () => {
        // Handle form submission
        console.log({ doctor: selectedDoctor, date: selectedDate, timeRange: selectedTimeRange });
    }

    // useEffect(() => {
    //     // Fetch data
    // }, []);

    return (
        <div>
            <h1>Register Doctor Timetable</h1>
            <FormControl fullWidth margin="normal">
                <InputLabel id="doctor-label">Select Doctor</InputLabel>
                <Select
                    labelId="doctor-label"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}

                >
                    {doctors.map((doc) => (
                        <MenuItem key={doc} value={doc}>{doc}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" disabled={!selectedDoctor}>
                <InputLabel id="date-label">Select Date</InputLabel>
                <Select
                    labelId="date-label"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    {dates.map((d) => (
                        <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" disabled={!selectedDate}>
                <InputLabel id="time-range-label">Select Time Range</InputLabel>
                <Select
                    labelId="time-range-label"
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
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