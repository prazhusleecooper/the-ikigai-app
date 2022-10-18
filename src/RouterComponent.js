import React from 'react';
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
	Route,
	Router,
	createRoutesFromElements,
    // Route,
  } from "react-router-dom";


// ? ONBOARDING PAGES
import Register from './Pages/Onboarding/Register';
import Login from './Pages/Onboarding/Login';

// ? VALUES PAGES/FORMS
import Introduction from './Pages/Values/Introduction';
import WhatYouLove from './Pages/Values/WhatYouLove';
import WhatTheWorldNeeds from './Pages/Values/WhatTheWorldNeeds';
import WhatYouCanBePaidFor from './Pages/Values/WhatYouCanBePaidFor';
import WhatYouAreGoodAt from './Pages/Values/WhatYouAreGoodAt';
import Dashboard from './Pages/Dashboard/Dashboard';
import Feed from './Pages/Dashboard/Feed';
import UserIkigai from './Pages/Dashboard/UserIkigai';


const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: '/introduction',
		element: <Introduction />,
	},
	{
		path: '/what-you-love',
		element: <WhatYouLove />,
	},
	{
		path: '/what-the-world-needs',
		element: <WhatTheWorldNeeds />,
	},
	{
		path: '/what-you-can-be-paid-for',
		element: <WhatYouCanBePaidFor />,
	},
	{
		path: '/what-you-are-good-at',
		element: <WhatYouAreGoodAt />,
	},
	{
		path: '/dashboard',
		element: <Dashboard />,
	},
	{
		path: '/feed',
		element: <Feed />,
	},
	{
		path: '/user-ikigai',
		element: <UserIkigai />,
	},
]);



const RouterComponent = () => {

	return(
		<RouterProvider router={router} />
	)

};

export default RouterComponent;