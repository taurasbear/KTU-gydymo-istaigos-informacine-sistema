import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    };

    const handleSubmit = (values) => {
        // Handle form submission logic here
        console.log(values);
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
                    Register
                </Typography>
                <Formik
                    initialValues={{
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
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                margin="normal"
                                helperText={touched.firstName && errors.firstName ? errors.firstName : ''}
                                error={touched.firstName && Boolean(errors.firstName)}
                            />
                            <Field
                                as={TextField}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
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
                                label="Email Address"
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
                                label="Password"
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
                    Main Menu
                </Button>
            </Box>
        </Container>
    );
};

export default Register;