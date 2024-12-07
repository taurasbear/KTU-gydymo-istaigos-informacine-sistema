import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemText, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import { postData } from '../../util/apiCalls';

const RegisterDoctor = () => {
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState(null);
    const [occupation, setOccupation] = useState('');
    const [open, setOpen] = useState(false);
    const { data, isPending, error } = useFetch("/api/naudotojas/PACIENTAS");

    const handleMain = () => {
        navigate('/');
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleOccupationChange = (event) => {
        setOccupation(event.target.value);
    };

    const handleSubmit = async () => {
        if (selectedUser && occupation) {
            const data = await postData(`/api/gydytojas/${selectedUser.id}`, { occupation })
            console.log(`Added Gydytojas: ${JSON.stringify(data)}`);
        } else {
            console.log('Please select a user and enter an occupation.');
        }
        setOpen(false);
        setOccupation('');
    };

    const handleClose = () => {
        setOpen(false);
        setOccupation('');
    };

    return (
        <div>
            <Typography variant="h3">Registruoti gydytoją</Typography>
            <List>
                {error && <div>{error}</div>}
                {isPending && <div>Krauna...</div>}
                {data?.map(user => (
                    <ListItem button key={user.id} onClick={() => handleUserSelect(user)}>
                        <ListItemText primary={user.el_pastas} />
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Pasirinktas naudotojas: {selectedUser?.email}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Prašau įveskite gydytojo specializaciją.
                    </DialogContentText>
                    <TextField
                        label="Occupation"
                        value={occupation}
                        onChange={handleOccupationChange}
                        style={{ maxWidth: '400px' }}
                        margin="normal"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Atšaukti</Button>
                    <Button onClick={handleSubmit} color="primary">Išsaugoti</Button>
                </DialogActions>
            </Dialog>
            <Button onClick={handleMain} variant="contained" color="secondary">Pagrindinis meniu</Button>
        </div>
    );
};

export default RegisterDoctor;