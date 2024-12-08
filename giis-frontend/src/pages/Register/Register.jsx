import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { postData } from '../../util/apiCalls';

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    };

    const handleSubmit = async (values) => {
        try {
            const response = await postData('/api/register', values);
            console.log(response);
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Registracija
                </Typography>
                <Formik
                    initialValues={{
                        username: '',
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, touched, errors }) => (
                        <Form>
                            <Field
                                as={TextField}
                                required
                                fullWidth
                                id="username"
                                label="Prisijungimo vardas"
                                name="username"
                                autoComplete="username"
                                margin="normal"
                                helperText={touched.username && errors.username ? errors.username : ''}
                                error={touched.username && Boolean(errors.username)}
                            />
                            <Field
                                as={TextField}
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Vardas"
                                margin="normal"
                                helperText={touched.firstName && errors.firstName ? errors.firstName : ''}
                                error={touched.firstName && Boolean(errors.firstName)}
                            />
                            <Field
                                as={TextField}
                                required
                                fullWidth
                                id="lastName"
                                label="Pavardė"
                                name="lastName"
                                autoComplete="family-name"
                                margin="normal"
                                helperText={touched.lastName && errors.lastName ? errors.lastName : ''}
                                error={touched.lastName && Boolean(errors.lastName)}
                            />
                            <Field
                                as={TextField}
                                required
                                fullWidth
                                id="email"
                                label="El. paštas"
                                name="email"
                                autoComplete="email"
                                margin="normal"
                                helperText={touched.email && errors.email ? errors.email : ''}
                                error={touched.email && Boolean(errors.email)}
                            />
                            <Field
                                as={TextField}
                                required
                                fullWidth
                                name="password"
                                label="Slaptažodis"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                margin="normal"
                                helperText={touched.password && errors.password ? errors.password : ''}
                                error={touched.password && Boolean(errors.password)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isSubmitting}
                            >
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleMain}
                >
                    Pagrindinis puslapis
                </Button>
            </Box>
        </Container>
    );
};

export default Register;