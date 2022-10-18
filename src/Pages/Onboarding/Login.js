import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';


import '../../Stylesheets/Pages/Onboarding/Register.scss';

const loginUserSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
            invalid_type_error: "Please enter a Valid Email",
        })
        .email('Please Enter valid Email Address'),
    password: z
        .string({
            required_error: "Password is required",
            invalid_type_error: "Password enter a Valid Email",
        })
        .min(6, 'Password must contain more that 6 characters'),
});


const Login = () => {

    // ? STATE
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    // ? Method to submit login form
    const handleSubmit = async (event) => {

        event.preventDefault();

        setErrorMessage('');

        const input = {
            email,
            password
        };
        console.log({input})

        const inputValidation = loginUserSchema.safeParse(input)

        console.log({
            inputValidation
        })

        if(inputValidation?.success === false) {

            setErrorMessage(inputValidation?.error.errors[0]?.message)
        
        } else if(inputValidation?.success === true) {

            const response = await axios.post(
                'http://localhost:5000/api/login',
                input,
            );

            if(response?.data?.status === true) {

                localStorage.setItem(
                    'token',
                    response?.data?.response?.token
                );

                toast.success('Login successful!');

                navigate('/dashboard');


            } else {

                toast.error(response?.data?.message);

                setErrorMessage('Please check your credentials');

            }

        }

    };
    // * End of handleSubmit();

    return(
        <div className='registerWrapper'>
            
            <div className='quoteSection'>
                <p>
                    <span className='registerKeyword'>Login</span>
                    <br />
                    to find your <span className='purposeKeyword'>Purpose</span>
                </p>
            </div>

            <div className='registerFormSection'>

                <div className='registerFormContainer'>
                    <p className='titleText'>Login</p>

                    <form 
                        className='registerForm'
                        onSubmit={handleSubmit}    
                    >

                        <div className='inputSection'>
                            <label>
                                Email
                            </label>

                            <input 
                                type='email'
                                value={ email }
                                onChange={ (event) => setEmail(event.target.value) }
                                required
                            />
                        </div>

                        <div className='inputSection'>
                            <label>
                                Password
                            </label>

                            <input 
                                type='password'
                                value={ password }
                                onChange={ (event) => setPassword(event.target.value) }
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className='registerSubmitBtn'
                        >
                            SUBMIT
                        </button>

                    </form>

                    <div className='error-section'>
                        <span>
                            {
                                errorMessage ?
                                '* ' + errorMessage
                                :
                                ''
                            }
                        </span>
                    </div>

                    <span className='promptSection'>
                        Don't have an account? {' '}
                        <Link
                            to="/register"
                            style={{
                                color: '#9B239B',
                                fontWeight: 500
                            }}
                        >
                            Register
                        </Link>
                    </span>

                </div>

            </div>

        </div>
    )

};

export default Login;