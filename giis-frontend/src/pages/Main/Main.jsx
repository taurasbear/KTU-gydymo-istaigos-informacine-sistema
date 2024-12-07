import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';

const Main = () => {

    const navigate = useNavigate();

    const { data, isPending, error } = useFetch("/api/users");

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleMessages = () => {
        navigate('/messages');
    }

    const handleBookAppointment = () => {
        navigate('/bookappointment');
    }

    const handleAppointments = () => {
        navigate('/appointments');
    }

    const handleRegisterDoctor = () => {
        navigate('/registerdoctor');
    }

    const handleRegisterDoctorTimetable = () => {
        navigate('/registerdoctortimetable');
    }

    return (
        <div>
            <h1>Main</h1>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
            <Button onClick={handleMessages}>Messages</Button>
            <Button onClick={handleBookAppointment}>Book Appointment</Button>
            <Button onClick={handleAppointments}>Appointments</Button>
            <Button onClick={handleRegisterDoctor}>Register Doctor</Button>
            <Button onClick={handleRegisterDoctorTimetable}>Register Doctor Timetable</Button>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {data?.map((item) => (
                <div key={item.id}>
                    <h2>{item.el_pastas}</h2>
                </div>
            ))}
        </div>
    );
}

export default Main;