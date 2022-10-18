import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Auth from '../../Utils/Auth';

import '../../Stylesheets/Pages/Values/Feed.scss';
import Logout from '../../Utils/Logout';


const Feed = () => {

    // ? STATE
    const [userData, setUserData] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    

    const navigate = useNavigate();

    // ? Method to render the Feed
    const renderFeed = () => {

        const handleView = (user) => {

            const token = localStorage.getItem('token');

            if(!token) {

                navigate('/login');

                toast.warn('Login Expired. Please login again to proceed!');

                return;
            }

            navigate(
                '/user-ikigai',
                {
                    state: user 
                }
            );

            return;

        };


        if(userData?.length === 0) {

            return(
                <div>
                    <span>
                        Loading...
                    </span>
                </div>
            );

        } else {

            return userData.map((user) => {

                if(userEmail !== user.email) {

                    return(
                        <div className='feed-card'>
                            <span>
                                { user?.name }
                            </span>
                            
                            <button onClick={() => handleView(user)}>
                                View
                            </button>
                        </div>
                    )

                }

            })

        }

    };
    // * End of renderFeed();

    // ? Method to fetch all the user's data
    const fetchAllUserData = async () => {

        const token = localStorage.getItem('token');

        if(!token) {

            navigate('/login');

            toast.warn('Login Expired. Please login again to proceed!');

            return;
        }

        const response = await axios.get(
            `http://localhost:5000/api/getAllUsers?token=${token}`,
        );

        console.log({
            response
        })

        if(response?.data?.status === true && response?.data?.data) {

            setUserEmail(() => response?.data?.userEmail);

            setUserData(() => response?.data?.data);

        } else {

            toast.warn('Error loading data. Please try again later')

        }


    };
    // * End of fetchAllUserData();

    useEffect(() => {

        fetchAllUserData();

    }, []);

    return(
        <div className='dashboard-wrapper'>
            <div className='dashboard-header'>
                <span>
                    Here is where you can checkout other people's IKIGAI
                </span>

                <div className='buttons-section'>
                    <button onClick={() => navigate('/dashboard')}>
                        Your IKIGAI
                    </button>

                    <button onClick={() => Logout()}>
                        Logout
                    </button>
                </div>
            </div>

            <div className='feed-list-section'>
                {
                    renderFeed()
                }
            </div>
        </div>
    )

};

export default Feed;