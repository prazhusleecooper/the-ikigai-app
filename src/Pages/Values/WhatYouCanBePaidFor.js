import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

import MultiValueInput from '../../Components/MultiValueInput';

import '../../Stylesheets/Pages/Values/ValueForm.scss';
import Auth from '../../Utils/Auth';

const WhatYouCanBePaidFor = () => {

    const [values, setValues] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [proceedError, setProceedError] = useState('');

    const navigate = useNavigate();

    // ? RENDERING METHODS
    
    // ? Method to render the entered values
    const renderEnteredValues = () => {

        const renderInputBlocks = () => {

            return values.map((value) => {

                return(
                    <MultiValueInput
                        value={ value }
                        removeFunction={ removeItem }
                        updateFunction={ updateItem }
                        key={value}
                    />
                )
    
            });

        };
        

        return(
            <div className='value-blocks-section'>

                {
                    renderInputBlocks()
                }

            </div>
        )

    };
    // * End of renderEnteredValues();

    // * END OF RENDERING METHODS


    // ? Method to handle the value form submit
    const handleValueFormSubmit = (event) => {

        event.preventDefault();

        if(!values.includes(inputValue)) {

            let updateArray = values;

            updateArray.push(inputValue);

            setValues(updateArray);
            
            setInputValue('');
            
            setProceedError('');

        } else {

            setInputValue('');

        }

    };
    // * End of handleValueFormSubmit();

    // ? NON-RENDERING METHODS

    // ? Method to update the edited value
    const updateItem = (value, updateValue) => {

        let arr = values;

        let index = arr.indexOf(value);

        arr[index] = updateValue;

        setValues(() => arr);

        console.log({
            values,
        });

    };
    // * End of updateItem();

    // ? Method to remove an item from the entered values
    const removeItem = (value) => {
        
        const updateArray = values.filter(item => item !== value);

        setValues(() => updateArray);
        
    };
    // * End of removeItem();
    // ? Method to handle proceed to next page
    const handleProceed = async () => {

        setProceedError('');

        if(values.length === 0) {

            setProceedError('* Please enter atlease one value to proceed!');

        } else {

            const token = localStorage.getItem('token');

            if(!token) {

                navigate('/login');

                toast.warn('Login Expired. Please login again to proceed!');

                return;
            }

            const input = {
                type: 'WhatYouCanBePaidFor',
                values: values,
                token,
            };

            const response = await axios.patch(
                'http://localhost:5000/api/singleValues',
                input,
            );

            if(response?.data?.status === true) {


                navigate('/what-you-are-good-at');


            } else {

                toast.error(response?.data?.message);

            }

        }

    };
    // * End of handleProceed();

    // * END OF NON-RENDERING METHODS
    
    useEffect(() => {

        Auth();

    }, []);

    return(
        <div className='value-form-wrapper'>
            <div className='title-text'>
                What you can be Paid for
            </div>

            <p className='prompt-text'>
                Write all the stuff or skills that you think you can be paid for
                <br />
                (Press 'Enter' after trying the value/stuff that you love)
            </p>

            <form
                className='value-form'
                onSubmit={ handleValueFormSubmit }
            >
                <input
                    className='value-form-input' 
                    value={ inputValue }
                    onChange={ (event) => setInputValue(event.target.value) }
                />

                <button
                    className='value-form-submit-btn'
                    type='submit'
                >
                    Add +
                </button>
            </form>
            
            {
                renderEnteredValues()
            }
            
            <button
                className='proceed-btn'
                onClick={ handleProceed }
            >
                Proceed →
            </button>

            <div className='proceed-error-section'>
                <span className='proceed-error-text'>
                    { proceedError }
                </span>
            </div>

        </div>
    )

};

export default WhatYouCanBePaidFor;