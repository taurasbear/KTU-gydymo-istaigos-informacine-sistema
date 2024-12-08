import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import { hasPermission } from '../../util/hasPermission';
import AuthContext from '../../context/AuthContext';
import Typography from '@mui/material/Typography';

const Main = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const isAuthenticated = user && !user.message;
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
    console.log('user', user);
    return (
        <div>
            <Typography component="h1" variant="h5">Pagrindinis puslapis</Typography>
            <Button onClick={handleLogin}>Prisijungti</Button>
            <Button onClick={handleRegister}>Registruotis</Button>
            {isAuthenticated && <Button onClick={handleMessages}>Žinutės</Button>}
            {isAuthenticated && <Button onClick={handleBookAppointment}>Užsirašyti pas gydytoją</Button>}
            {isAuthenticated && <Button onClick={handleAppointments}>Rezervacijos</Button>}
            {user?.naudotojo_tipas === "ADMINISTRATORIUS" && <Button onClick={handleRegisterDoctor}>Registruoti gydytoją</Button>}
            {user?.naudotojo_tipas === "ADMINISTRATORIUS" && <Button onClick={handleRegisterDoctorTimetable}>Registruoti gydytojų tvarkaraštį</Button>}
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