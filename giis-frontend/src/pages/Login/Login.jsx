import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { postData } from '../../util/apiCalls';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
});

const Login = () => {

    // const { user } = useContext(AuthContext);
    // console.log('user in protected route:', user);

    const navigate = useNavigate();

    const handleMain = () => {
        navigate('/');
    };

    const handleSubmit = async (values) => {
        try {
            console.log('Login values:', values);
            const response = await postData('/api/login', {
                username: values.username,
                password: values.password,
            });
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
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
                    Login
                </Typography>
                <Formik
                    initialValues={{
                        username: '',
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
                                label="Username"
                                name="username"
                                autoComplete="username"
                                margin="normal"
                                helperText={touched.username && errors.username ? errors.username : ''}
                                error={touched.username && Boolean(errors.username)}
                            />
                            <Field
                                as={TextField}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
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
                                Login
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

export default Login;