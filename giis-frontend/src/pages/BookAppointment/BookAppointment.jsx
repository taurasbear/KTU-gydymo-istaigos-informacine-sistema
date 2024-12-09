import React, { useState, useContext } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/lt';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { fetchDataWithPayload, postData } from '../../util/apiCalls';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { resolveTimeFormat } from '@mui/x-date-pickers/internals/utils/time-utils';
import AuthContext from '../../context/AuthContext';


const validationSchema = yup.object({
    doctor: yup.string().required('Pasirinkite gydytoją'),
    date: yup.date().required('Pasirinkite datą'),
    time: yup.number().required('Pasirinkite laiką'),
    appointmentLength: yup.number().required('Pasirinkite vizito trukmę').nullable(),
});

const BookAppointment = () => {

    const navigate = useNavigate();

    const [startHours, setStartHours] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const { data: doctors, isPending, error } = useFetch('/api/gydytojas');
    const { user } = useContext(AuthContext);
    const handleSubmit = async (values, { resetForm }) => {
        const date = values.date.toDate();
        const time = values.time;

        const nuoKada = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time
        );

        nuoKada.setHours(nuoKada.getHours() + 2);
        console.log('nuoKada', nuoKada)
        try {
            await postData('/api/rezervacija', {
                nuo_kada: nuoKada,
                iki_kada: new Date(nuoKada).setMinutes(nuoKada.getMinutes() + values.appointmentLength),
                gydytojo_darbo_laikas_id: values.doctor,
                naudotojas_id: user.id,
            });
            resetForm()
        }
        catch (error) {
            console.error('Error booking appointment:', error);
        }

    };

    const handleMain = () => {
        navigate('/');
    }

    const handleDateChange = async (value) => {
        const date = value.toDate();
        const nuoKada = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
        );
        console.log('Nuo kada:', nuoKada);
        console.log('Selected Doctor:', selectedDoctor);
        try {
            await fetchDataWithPayload(`/api/gydytojodarbolaikas/${selectedDoctor}`, {
                date: nuoKada.toISOString(),
            }, setStartHours);
            console.log('Start hours:', startHours);
        } catch (error) {
            console.error('Error fetching start hours:', error);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="lt">
            <Box
                sx={{
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: 300,
                }}
            >
                <Typography variant="h6">Rezervacija pas gydytoją</Typography>
                <Formik
                    initialValues={{
                        doctor: '',
                        date: null,
                        time: null,
                        appointmentLength: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values, touched, errors }) => (
                        <Form>
                            <FormControl margin="normal" sx={{ width: '200px' }}>
                                <InputLabel id="doctor-label">Pasirinkite gydytoją</InputLabel>
                                <Field
                                    as={Select}
                                    labelId="doctor-label"
                                    name="doctor"
                                    value={selectedDoctor}
                                    onChange={(e) => {
                                        setFieldValue('doctor', e.target.value);
                                        setSelectedDoctor(e.target.value);
                                    }}
                                >
                                    {doctors?.map((doc) => (
                                        <MenuItem key={doc.id} value={doc.id}>{doc.specialybe} {doc.naudotojas.vardas} {doc.naudotojas.pavarde}</MenuItem>
                                    ))}
                                </Field>
                                <ErrorMessage name="doctor" component="div" style={{ color: 'red' }} />
                            </FormControl>
                            <DatePicker
                                label="Pasirinkite datą"
                                value={values.date}
                                onChange={(newValue) => {
                                    setFieldValue('date', newValue);
                                    handleDateChange(newValue);
                                }}
                                disabled={!values.doctor}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin="normal"
                                        helperText={touched.date && errors.date ? errors.date : ''}
                                        error={touched.date && Boolean(errors.date)}
                                    />
                                )}
                            />
                            <FormControl fullWidth margin="normal" disabled={!values.date}>
                                <InputLabel id="date-label">Pasirinkite vizito pradžios laiką</InputLabel>
                                <Select
                                    labelId="date-label"
                                    value={values.time || ''}
                                    onChange={(e) => {
                                        setFieldValue('time', e.target.value)
                                    }}
                                >
                                    {Array.isArray(startHours) && startHours?.map((sh) => {
                                        const formattedTime = new Date().setHours(sh, 0, 0, 0);
                                        return (
                                            <MenuItem key={sh} value={sh}>
                                                {new Date(formattedTime).toLocaleTimeString('lt-LT', { hour: '2-digit', minute: '2-digit' })}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <ErrorMessage name="time" component="div" style={{ color: 'red' }} />
                            </FormControl>
                            <FormControl margin="normal" sx={{ width: '200px' }}>
                                <InputLabel id="appointment-length-label">Vizito trukmė</InputLabel>
                                <Field
                                    as={Select}
                                    labelId="appointment-length-label"
                                    name="appointmentLength"
                                    value={values.appointmentLength}
                                    onChange={(e) => {
                                        setFieldValue('appointmentLength', e.target.value);
                                    }}
                                >
                                    <MenuItem value={15}>15 min</MenuItem>
                                    <MenuItem value={30}>30 min</MenuItem>
                                    <MenuItem value={45}>45 min</MenuItem>
                                    <MenuItem value={60}>1 h</MenuItem>
                                </Field>
                                <ErrorMessage name="appointmentLength" component="div" style={{ color: 'red' }} />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Rezervuoti
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Button onClick={handleMain} variant="outlined" color="primary">Pagrindinis puslapis</Button>
            </Box>
        </LocalizationProvider>
    );
};

export default BookAppointment;