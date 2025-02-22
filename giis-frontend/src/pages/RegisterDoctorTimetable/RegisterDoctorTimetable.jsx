import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MenuItem, Select, FormControl, InputLabel, Box, Typography} from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import { postData } from '../../util/apiCalls';
import dayjs from 'dayjs';

const RegisterDoctorTimetable = () => {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    }

    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [dates, setDates] = useState([]);


    const { data: doctors, loading: doctorsLoading, error: doctorsError } = useFetch('/api/gydytojas');

    const handleSubmit = async () => {
        try {
            const response = await postData(`/api/gydytojodarbolaikas?gydytojasId=${selectedDoctor.id}&darboLaikasId=${selectedDate.id}`);
            setSelectedDate('');
            setSelectedDoctor('');
        }
        catch (error) {
            console.error('Error registering doctor timetable:', error);
        }
    }

    const onDoctorChange = async (e) => {
        setSelectedDoctor(e.target.value);
        try {
            const response = await postData(`/api/darbolaikas/${e.target.value.id}`);
            setDates(response);
            console.log('dates', response);
        } catch (error) {
            console.error('Error fetching dates:', error);
        }
    }

    return (
        <Box
            sx={{
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 600,
            }}
        >
            <Typography variant="h6">Gydytojų tvarkaraščio registracija</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="doctor-label">Pasirinkite gydytoją</InputLabel>
                <Select
                    labelId="doctor-label"
                    value={selectedDoctor}
                    onChange={(e) => onDoctorChange(e)}

                >
                    {doctors?.map((doc) => (
                        <MenuItem key={doc.id} value={doc}>{doc.specialybe} {doc.naudotojas.vardas} {doc.naudotojas.pavarde}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" disabled={!selectedDoctor}>
                <InputLabel id="date-label">Pasirinkite darbo laiką</InputLabel>
                <Select
                    labelId="date-label"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    {dates?.map((d) => (
                        <MenuItem key={d.id} value={d}>{dayjs(d.data).format('YYYY-MM-DD')} {dayjs(d.nuo_kada).format('HH:mm')}-{dayjs(d.iki_kada).format('HH:mm')}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} variant="contained" color="primary">Sukurti</Button>
            <Button onClick={handleMain} variant="outlined" color="secondary">Pagrindinis puslapis</Button>
        </Box>
    );
}

export default RegisterDoctorTimetable;