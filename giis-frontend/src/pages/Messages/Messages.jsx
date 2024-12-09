import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, List, ListItem, ListItemText, Divider, Box, Typography } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import AuthContext from '../../context/AuthContext';
import { postData, fetchData } from '../../util/apiCalls';

const Messages = () => {
    const navigate = useNavigate();
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const { user } = useContext(AuthContext);

    const { data: patients, isPending, error } = useFetch(`/api/naudotojas/gydytojas/${user.id}`);

    console.log('patients', patients);
    const handleMain = () => {
        navigate('/');
    };

    const handlePersonSelect = async (person) => {
        setSelectedPerson(person);
        try {
            await fetchData(`/api/zinute?userId=${person.id}&gydytojasId=${user.id}`, setMessages);
            console.log('messages', messages);
        }
        catch (error) {
            console.error('Error fetching messages:', error);
        }

    };

    const handleSendMessage = async () => {
        try {
            const messages = await postData('/api/zinute', {
                turinys: newMessage,
                naudotojas_id: selectedPerson.id,
                gydytojas_id: user.id
            });
            setMessages(messages);
            setNewMessage('');
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Box display="flex" height="100vh">
            <Box width="25%" bgcolor="grey.200" p={2}>
                <Button variant="contained" color="secondary" onClick={handleMain} style={{ marginBottom: '16px' }}>
                    Pagrindinis puslapis
                </Button>
                <Typography variant="h6">Pacientai</Typography>
                <List>
                    {patients?.map((pat) => (
                        <ListItem button key={pat.id} onClick={() => handlePersonSelect(pat)}>
                            <ListItemText primary={`${pat.vardas} ${pat.pavarde}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width="75%" p={2}>
                {selectedPerson ? (
                    <>
                        <Typography variant="h5">{`${selectedPerson.vardas} ${selectedPerson.pavarde}`}</Typography>
                        <Box height="70vh" overflow="auto" border={1} borderColor="grey.300" p={2} mb={2}>
                            {messages?.map((message) => (
                                <Typography key={message.id} align='right'>
                                    {message.turinys}
                                </Typography>
                            ))}
                        </Box>
                        <Box display="flex">
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Įveskite žinutę"
                            />
                            <Button variant="contained" color="primary" onClick={handleSendMessage}>
                                Siųsti
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="h6">Pasirinkite pacientą</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Messages;