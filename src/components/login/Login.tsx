import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {navigate} from "@reach/router";
import { Navigate } from 'react-router-dom';
import {useAppSelector} from "../../redux/redux-store";

 const Login = () => {
     const isAuth = useAppSelector(state=>state.auth.isAuth )
     const dispatch = useDispatch()
     const formik = useFormik({
         initialValues: {
             email: '',
             password: '',
             rememberMe: false,
         },
         onSubmit: values => {
            dispatch(login(values))
             formik.resetForm()
         },
         validate: (values) => {
             const errors: FormikErrorType = {};
             if (!values.email) {
                 errors.email = 'Required';
             } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                 errors.email = 'Invalid email address';
             }
             if (!values.password) {
                 errors.password = 'Required';
             } else if (values.password.length < 4) {
                 errors.password = 'Password mast be more than 2 characters'
             }
             return errors;
         },
     })
     if (isAuth) {
         return <Navigate to={'/'}/>
     }
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color: 'red', borderColor: 'red' }}>{formik.errors.email}</div>
                        ) : null}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                        ) : null}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox/>}
                                          {...formik.getFieldProps('rememberMe')}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>

        </Grid>
    </Grid>
}
export default Login

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
