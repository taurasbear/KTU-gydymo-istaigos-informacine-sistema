import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const RegisterDoctor = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [occupation, setOccupation] = useState('');

    const dummyUsers = [
        { id: 1, email: 'john.doe@example.com' },
        { id: 2, email: 'jane.smith@example.com' },
        { id: 3, email: 'alice.jones@example.com' },
    ];

    const handleMain = () => {
        navigate('/');
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleOccupationChange = (event) => {
        setOccupation(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedUser && occupation) {
            console.log({ user: selectedUser, occupation });
        } else {
            console.log('Please select a user and enter an occupation.');
        }
    };

    const filteredUsers = dummyUsers.filter(user => user.email.includes(search));

    return (
        <div>
            <Typography variant="h3">Register Doctor</Typography>
            <TextField
                label="Search by Email"
                value={search}
                onChange={handleSearchChange}
                style={{ maxWidth: '400px' }}
                margin="normal"
            />
            <List>
                {filteredUsers.map(user => (
                    <ListItem button key={user.id} onClick={() => handleUserSelect(user)}>
                        <ListItemText primary={user.email} />
                    </ListItem>
                ))}
            </List>
            {selectedUser && (
                <div>
                    <Typography variant="h6">Selected User: {selectedUser.email}</Typography>
                    <TextField
                        label="Occupation"
                        value={occupation}
                        onChange={handleOccupationChange}
                        style={{ maxWidth: '400px' }}
                        margin="normal"
                    />
                </div>
            )}
            <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
            <Button onClick={handleMain} variant="contained" color="secondary">Main Menu</Button>
        </div>
    );
};

export default RegisterDoctor;