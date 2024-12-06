import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, List, ListItem, ListItemText, Divider, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Messages = () => {
    const navigate = useNavigate();
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [people, setPeople] = useState(['Alice', 'Bob', 'Charlie']);
    const [newPerson, setNewPerson] = useState('');

    const handleMain = () => {
        navigate('/');
    };

    const handlePersonSelect = (person) => {
        setSelectedPerson(person);
        // Fetch messages for the selected person
        setMessages([
            { text: 'Hello!', sender: 'me' },
            { text: 'Hi there!', sender: person }
        ]);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, sender: 'me' }]);
            setNewMessage('');
        }
    };

    // const handleAddPerson = () => {
    //     if (newPerson.trim()) {
    //         setPeople([...people, newPerson]);
    //         setNewPerson('');
    //     }
    // };

    return (
        <Box display="flex" height="100vh">
            <Box width="25%" bgcolor="grey.200" p={2}>
                <Button variant="contained" color="secondary" onClick={handleMain} style={{ marginBottom: '16px' }}>
                    Back to Main Menu
                </Button>
                <Typography variant="h6">People</Typography>
                <List>
                    {people.map((person) => (
                        <ListItem button key={person} onClick={() => handlePersonSelect(person)}>
                            <ListItemText primary={person} />
                        </ListItem>
                    ))}
                </List>
                {/* <Box display="flex" alignItems="center" mt={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        value={newPerson}
                        onChange={(e) => setNewPerson(e.target.value)}
                        placeholder="New person"
                    />
                    <IconButton color="primary" onClick={handleAddPerson}>
                        <AddIcon />
                    </IconButton>
                </Box> */}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width="75%" p={2}>
                {selectedPerson ? (
                    <>
                        <Typography variant="h5">{selectedPerson}</Typography>
                        <Box height="70vh" overflow="auto" border={1} borderColor="grey.300" p={2} mb={2}>
                            {messages.map((message, index) => (
                                <Typography key={index} align={message.sender === 'me' ? 'right' : 'left'}>
                                    {message.text}
                                </Typography>
                            ))}
                        </Box>
                        <Box display="flex">
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                            />
                            <Button variant="contained" color="primary" onClick={handleSendMessage}>
                                Send
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="h6">Select a person to start messaging</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Messages;