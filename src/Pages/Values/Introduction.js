import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../Stylesheets/Pages/Values/Introduction.scss';
import Auth from '../../Utils/Auth';


const Introduction = () => {

    const navigate = useNavigate();

    // ? Method to handle proceed
    const handleProceed = () => {

        navigate('/what-you-love');

    };
    // * End of handleProceed();

    useEffect(() => {

        Auth();

    }, []);


    return(
        <div className='introduction-wrapper'>
            <span className='title-text'>
                IKIGAI
            </span>

            <p className='intro-text'>
                You will be presented with a set of forms. 
                <br />
                Fill them to {' '}
                <span className='purpose-text'>
                     discover your purpose.
                </span>
            </p>

            <button
                onClick={ handleProceed }
                className='proceed-btn'
            >
                Proceed →
            </button>
        </div>
    )

};

export default Introduction;