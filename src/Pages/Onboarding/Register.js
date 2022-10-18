import { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import '../../Stylesheets/Pages/Onboarding/Register.scss';

const registerUserSchema = z.object({
    name: z
        .string({
            required_error: "Name is required",
        }),
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

const Register = () => {

    
    // ? STATE
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');
    

    const navigate = useNavigate();
    

    // ? Method to submit registration form
    const handleSubmit = async (event) => {

        event.preventDefault();

        const input = {
            name,
            email,
            password
        };
        console.log({input})

        const inputValidation = registerUserSchema.safeParse(input)

        console.log({
            inputValidation
        })

        if(inputValidation?.success === false) {

            setErrorMessage(inputValidation?.error.errors[0]?.message)
        
        } else if(inputValidation?.success === true) {

            const response = await axios.post(
                'http://localhost:5000/api/register',
                input,
            );

            if(response?.data?.status === true) {

                localStorage.setItem(
                    'token',
                    response?.data?.response?.token
                );

                toast.success('Registration successful!');

                navigate('/introduction');


            } else {

                toast.error(response?.data?.message);

            }

        }

    };
    // * End of handleSubmit();

    return(
        <div className='registerWrapper'>
            
            <div className='quoteSection'>
                <p>
                    <span className='registerKeyword'>Register</span>
                    <br />
                    to discover your <span className='purposeKeyword'>Purpose</span>
                </p>
            </div>

            <div className='registerFormSection'>

                <div className='registerFormContainer'>
                    <p className='titleText'>Register</p>

                    <form
                        className='registerForm'
                        onSubmit={handleSubmit}
                    >

                        <div className='inputSection'>
                            <label>
                                Name
                            </label>

                            <input 
                                type='text'
                                value={ name }
                                onChange={ (event) => setName(event.target.value) }
                                required
                            />
                        </div>

                        <div className='inputSection'>
                            <label>
                                Email
                            </label>

                            <input 
                                type='text'
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
                        Already have an account? {' '}
                        <Link
                            to="/login"
                            style={{
                                color: '#9B239B',
                                fontWeight: 500
                            }}
                        >
                            Login
                        </Link>
                    </span>

                </div>

            </div>

        </div>
    )

};

export default Register;