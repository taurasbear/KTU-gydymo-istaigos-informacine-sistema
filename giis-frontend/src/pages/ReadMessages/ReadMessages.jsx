import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, List, ListItem, ListItemText, Divider, Box, Typography, IconButton } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import AuthContext from '../../context/AuthContext';
import { postData, fetchData } from '../../util/apiCalls';

const ReadMessages = () => {
    const navigate = useNavigate();
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { user } = useContext(AuthContext);

    const { data: doctors, isPending, error } = useFetch(`/api/gydytojas/${user.id}`);

    console.log('doctors', doctors);
    const handleMain = () => {
        navigate('/');
    };

    const handlePersonSelect = async (person) => {
        setSelectedPerson(person);
        try {
            await fetchData(`/api/zinute?userId=${user.id}&gydytojasId=${person.id}`, setMessages);
            console.log('messages', messages);
        }
        catch (error) {
            console.error('Error fetching messages:', error);
        }

    };

    return (
        <Box display="flex" height="100vh">
            <Box width="25%" bgcolor="grey.200" p={2}>
                <Button variant="contained" color="secondary" onClick={handleMain} style={{ marginBottom: '16px' }}>
                    Pagrindinis puslapis
                </Button>
                <Typography variant="h6">Gydytojai</Typography>
                <List>
                    {doctors?.map((doc) => (
                        <ListItem button key={doc.id} onClick={() => handlePersonSelect(doc)}>
                            <ListItemText primary={`${doc.specialybe} ${doc.naudotojas.vardas} ${doc.naudotojas.pavarde}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width="75%" p={2}>
                {selectedPerson ? (
                    <>
                        <Typography variant="h5">{`${selectedPerson.specialybe} ${selectedPerson.naudotojas.vardas} ${selectedPerson.naudotojas.pavarde}`}</Typography>
                        <Box height="70vh" overflow="auto" border={1} borderColor="grey.300" p={2} mb={2}>
                            {messages?.map((message) => (
                                <Typography key={message.id} align='left'>
                                    {message.turinys}
                                </Typography>
                            ))}
                        </Box>
                    </>
                ) : (
                    <Typography variant="h6">Pasirinkite gydytoją</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ReadMessages;