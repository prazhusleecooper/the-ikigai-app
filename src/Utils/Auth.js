import React, { useState } from 'react';

import { toast } from 'react-toastify';

const Auth = () => {

    const token = localStorage.getItem('token');

    if(!token) {

        window.location.href = '/login'

        toast.warn('Login Expired. Please login again to proceed!');

    }

    return;

};

export default Auth;