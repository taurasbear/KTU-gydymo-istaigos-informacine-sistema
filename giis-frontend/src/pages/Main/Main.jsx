import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import AuthContext from '../../context/AuthContext';
import Typography from '@mui/material/Typography';

const Main = () => {

    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    const isAuthenticated = user && !user.message;
    const { data, isPending, error } = useFetch("/api/users");
    const { logout } = useContext(AuthContext);

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const handleMessages = () => {
        navigate('/messages');
    }

    const handleReadMessages = () => {
        navigate('/readmessages');
    }

    const handleBookAppointment = () => {
        navigate('/bookappointment');
    }

    const handleBookSelfReservation = () => {
        navigate('/bookselfreservation');
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


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Typography component="h1" variant="h5">Pagrindinis puslapis</Typography>
            {!isAuthenticated && <Button onClick={handleLogin}>Prisijungti</Button>}
            {!isAuthenticated && <Button onClick={handleRegister}>Registruotis</Button>}
            {isAuthenticated && <Button onClick={handleLogout}>Atsijungti</Button>}
            {user?.naudotojo_tipas === "GYDYTOJAS" && <Button onClick={handleMessages}>Žinutės</Button>}
            {user?.naudotojo_tipas === "PACIENTAS" && <Button onClick={handleReadMessages}>Žinutės</Button>}
            {user?.naudotojo_tipas === "PACIENTAS" && <Button onClick={handleBookAppointment}>Užsirašyti pas gydytoją</Button>}
            {user?.naudotojo_tipas === "GYDYTOJAS" && <Button onClick={handleBookSelfReservation}>Užsirašyti pas save</Button>}
            {user?.naudotojo_tipas === "GYDYTOJAS" && <Button onClick={handleAppointments}>Rezervacijos</Button>}
            {user?.naudotojo_tipas === "ADMINISTRATORIUS" && <Button onClick={handleRegisterDoctor}>Registruoti gydytoją</Button>}
            {user?.naudotojo_tipas === "ADMINISTRATORIUS" && <Button onClick={handleRegisterDoctorTimetable}>Registruoti gydytojų tvarkaraštį</Button>}
        </div>
    );
}

export default Main;