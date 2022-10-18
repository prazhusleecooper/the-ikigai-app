import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

import MultiValueInput from '../../Components/MultiValueInput';

import Auth from '../../Utils/Auth';
import Logout from '../../Utils/Logout';

import '../../Stylesheets/Pages/Values/Dashboard.scss';

const Dashboard = () => {

    // ? STATE
    const [whatYouLove, setWhatYouLove] = useState([]);
    const [whatYouLoveInput, setWhatYouLoveInput] = useState('');

    const [whatTheWorldNeeds, setWhatTheWorldNeeds] = useState([]);
    const [whatTheWorldNeedsInput, setWhatTheWorldNeedsInput] = useState('');

    const [whatYouCanBePaidFor, setWhatYouCanBePaidFor] = useState([]);
    const [whatYouCanBePaidForInput, setWhatYouCanBePaidForInput] = useState('');

    const [whatYouAreGoodAt, setWhatYouAreGoodAt] = useState([]);
    const [whatYouAreGoodAtInput, setWhatYouAreGoodAtInput] = useState('');

    const [dummyState, setDummyState] = useState('');


    const navigate = useNavigate();


    const valuesObject = {
        "1": whatYouLove,
        "2": whatTheWorldNeeds,
        "3": whatYouCanBePaidFor,
        "4": whatYouAreGoodAt,
    };

    const setValuesObject = {
        "1": setWhatYouLove,
        "2": setWhatTheWorldNeeds,
        "3": setWhatYouCanBePaidFor,
        "4": setWhatYouAreGoodAt,
    };

    const setValuesDispatcher = (index, updateValue) => {

        switch(index) {

            case '1' || 1: 

                setWhatYouLove(updateValue)
                return;

            case '2' || 2: 

                setWhatTheWorldNeeds(updateValue)
                return;

            case '3' || 3: 

                setWhatYouCanBePaidFor(updateValue)
                return;

            case '4' || 4: 

                setWhatYouAreGoodAt(updateValue)
                return;

        }

    }


    // ? WHAT YOU LOVE

    // ? Method to render the entered values
    const renderWhatYouLoveValues = () => {

        const updateWhatYouLove = (value, updateValue) => {

            let arr = whatYouLove;

            let index = arr.indexOf(value);

            arr[index] = updateValue;

            setWhatYouLove(() => arr);
            
            setDummyState('')

        }

        const renderInputBlocks = () => {

            return whatYouLove?.map((value, index) => {

                return(
                    <Draggable
                        key={index.toString()}
                        draggableId={index.toString() + value}
                        index={index}
                    >
                        
                        {
                            (provided, snapshot) => (

                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                    }}
                                >
                                    <MultiValueInput
                                        value={ value }
                                        removeFunction={ removeWhatYouLoveItem }
                                        updateFunction={ updateWhatYouLove }
                                        key={value}
                                    />
                                </div>

                            )
                        }
                    </Draggable>
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

    // ? Remove What you love item
    const removeWhatYouLoveItem = (value) => {
        
        let updateArray = whatYouLove.filter((item) => item !== value);

        setWhatYouLove(() => updateArray);

    };

    // ? Method to submit WHAT_YOU_LOVE_VALUES
    const submitWhatYouLove = (event) => {

        event.preventDefault();

        if(whatYouLoveInput === '') {

            return;

        }

        if(!whatYouLove.includes(whatYouLoveInput)) {

            let updateArray = whatYouLove;

            updateArray.push(whatYouLoveInput);

            setWhatYouLove(updateArray);
            
            setWhatYouLoveInput('');

        } else {

            setWhatYouLoveInput('');

        }
    };
    // * End of submitWhatYouLove();

    // * End of WHAT YOU LOVE


    // ? WHAT THE WORLD NEEDS

    // ? Method to render the entered values
    const renderWhatTheWorldNeedsValues = () => {

        const updateWhatTheWorldNeeds = (value, updateValue) => {

            let arr = whatTheWorldNeeds;

            let index = arr.indexOf(value);

            arr[index] = updateValue;

            setWhatTheWorldNeeds(() => arr);
            
            setDummyState('')

        }

        const renderInputBlocks = () => {

            return whatTheWorldNeeds?.map((value, index) => {

                return(
                    <Draggable
                        key={index.toString()}
                        draggableId={index.toString() + value}
                        index={index}
                    >
                        
                        {
                            (provided, snapshot) => (

                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                    }}
                                >
                                    <MultiValueInput
                                        value={ value }
                                        removeFunction={ removeWhatTheWorldNeedsItem }
                                        updateFunction={ updateWhatTheWorldNeeds }
                                        key={value}
                                    />
                                </div>

                            )
                        }
                    </Draggable>
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

    // ? Remove What The World Needs item
    const removeWhatTheWorldNeedsItem = (value) => {

        
        let updateArray = whatTheWorldNeeds.filter((item) => item !== value);

        setWhatTheWorldNeeds(() => updateArray);

    };

    // ? Method to submit WHAT THE WORLD NEEDS
    const submitWhatTheWorldNeeds = (event) => {

        event.preventDefault();

        if(whatTheWorldNeedsInput === '') {

            return;
            
        }

        if(!whatTheWorldNeeds.includes(whatTheWorldNeedsInput)) {

            let updateArray = whatTheWorldNeeds;

            updateArray.push(whatTheWorldNeedsInput);

            setWhatTheWorldNeeds(updateArray);
            
            setWhatTheWorldNeedsInput('');
        
        } else {

            setWhatTheWorldNeedsInput('');

        }
        
    };
    // * End of submitWhatTheWorldNeeds();

    // * End of WHAT THE WORLD NEEDS
    

    // ? WHAT YOU CAN BE PAID FOR

    // ? Method to render the entered values
    const renderWhatYouCanBePaidForValues = () => {

        const updateWhatYouCanBePaidFor = (value, updateValue) => {

            let arr = whatYouCanBePaidFor;

            let index = arr.indexOf(value);

            arr[index] = updateValue;

            setWhatYouCanBePaidFor(() => arr);
            
            setDummyState('')

        }

        const renderInputBlocks = () => {

            return whatYouCanBePaidFor?.map((value, index) => {

                return(

                    <Draggable
                        key={index.toString()}
                        draggableId={index.toString() + value}
                        index={index}
                    >
                        
                        {
                            (provided, snapshot) => (

                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                    }}
                                >
                                    <MultiValueInput
                                        value={ value }
                                        removeFunction={ removeWhatYouCanBePaidForItem }
                                        updateFunction={ updateWhatYouCanBePaidFor }
                                        key={value}
                                    />
                                </div>

                            )
                        }
                    </Draggable>

                );
    
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

    // ? Remove What The World Needs item
    const removeWhatYouCanBePaidForItem = (value) => {

        let updateArray = whatYouCanBePaidFor.filter((item) => item !== value);

        setWhatYouCanBePaidFor(() => updateArray);

    };

    // ? Method to submit WHAT YOU CAN BE PAID FOR
    const submitWhatYouCanBePaidFor = (event) => {

        event.preventDefault();

        if(whatYouCanBePaidForInput === '') {

            return;

        }

        if(!whatYouCanBePaidFor.includes(whatYouCanBePaidForInput)) {

            let updateArray = whatYouCanBePaidFor;

            updateArray.push(whatYouCanBePaidForInput);

            setWhatYouCanBePaidFor(updateArray);
            
            setWhatYouCanBePaidForInput('');
        
        } else {

            setWhatYouCanBePaidForInput('');

        }
    };
    // * End of submitWhatYouCanBePaidFor();

    // * End of WHAT YOU CAN BE PAID FOR


    // ? WHAT YOU ARE GOOD AT

    // ? Method to render the entered values
    const renderWhatYouAreGoodAtValues = () => {

        const updateWhatYouAreGoodAt = (value, updateValue) => {

            let arr = whatYouAreGoodAt;

            let index = arr.indexOf(value);

            arr[index] = updateValue;

            setWhatYouAreGoodAt(() => arr);
            
            setDummyState('')

        }

        const renderInputBlocks = () => {

            return whatYouAreGoodAt?.map((value, index) => {

                return(
                    <Draggable
                        key={index.toString()}
                        draggableId={index.toString() + value}
                        index={index}
                    >
                        
                        {
                            (provided, snapshot) => (

                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                    }}
                                >
                                    <MultiValueInput
                                        value={ value }
                                        removeFunction={ removeWhatYouAreGoodAtItem }
                                        updateFunction={ updateWhatYouAreGoodAt }
                                        key={uuidv4()}
                                    />
                                </div>

                            )
                        }
                    </Draggable>
                    
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

    // ? Remove What The World Needs item
    const removeWhatYouAreGoodAtItem = (value) => {

        let updateArray = whatYouAreGoodAt.filter((item) => item !== value);

        setWhatYouAreGoodAt(() => updateArray);

    };

    // ? Method to submit WHAT YOU CAN BE PAID FOR
    const submitWhatYouAreGoodAt = (event) => {

        event.preventDefault();

        if(whatYouAreGoodAtInput === '') {

            return;

        }

        if(!whatYouAreGoodAt.includes(whatYouAreGoodAtInput)) {

            let updateArray = whatYouAreGoodAt;

            updateArray.push(whatYouAreGoodAtInput);

            setWhatYouAreGoodAt(updateArray);
            
            setWhatYouAreGoodAtInput('');
        
        } else {

            setWhatYouAreGoodAtInput('');

        }

    };
    // * End of submitWhatYouCanBePaidFor();

    // * End of WHAT YOU ARE GOOD AT

    const onDragEnd = (result) => {

        console.log({
            result
        });

        if(!result.destination && !result.source) {

            return;

        }

        if(result.source.droppableId === result.destination.droppableId) {

            // ? IF THE VALUE IS MOVED BETWEEN IN THE SAME BOX

            const fromIndex = result.source.index;

            const toIndex = result.destination.index;

            let arr = valuesObject[result.source.droppableId];

            const element = arr.splice(fromIndex, 1)[0];

            console.log(element);

            arr.splice(toIndex, 0, element);

            console.log(arr);

            setValuesDispatcher(result.source.droppableId, arr);

            return;

        } else if(result.source.droppableId !== result.destination.droppableId)  {

            // ? IF THE VALUE IS MOVED TO DIFFERENT BOX

            const fromIndex = result.source.index;

            const toIndex = result.destination.index;

            let sourceArr = valuesObject[result.source.droppableId];
            
            let destinationArr = valuesObject[result.destination.droppableId];
 
            const element = sourceArr.splice(fromIndex, 1)[0];

            // ? Remove Element from Source Array 
            let updateSourceArr = sourceArr.filter((item) => item !== element);

            // ? Add element to destination

            if(!destinationArr.includes(element)) {

                destinationArr.splice(toIndex, 0, element);

            }

            setValuesDispatcher(result.source.droppableId, updateSourceArr);
            
            setValuesDispatcher(result.destination.droppableId, destinationArr);

            return;

        }

    }


    // ? ANALYSIS
    
    // ? Method to render the analysis sections
    const renderAnalysis = (valuesList) => {

        // const valuesLists = whatYouLove.filter(value => whatYouAreGoodAt.includes(value))

        return valuesList?.map((value) => {

            return(
                <div className='value-pill'>
                    <span>
                        {value}
                    </span>
                </div>
            );

        });
        

    };
    // * End of renderAnalysis();

    // ? Method to fetch the user data for initial data population
    const fetchUserData = async () => {

        const token = localStorage.getItem('token');

        if(!token) {

            navigate('/login');

            toast.warn('Login Expired. Please login again to proceed!');

            return;
        }

        const response = await axios.get(
            `http://localhost:5000/api/getUser?token=${token}`,
        );

        console.log({
            response
        })
        
        if(
            response?.data?.status === true &&
            response?.data?.userData?.result
            ) {
                
                console.log({
                    wahtyouLove: response?.data?.userData?.result.whatYouLove
                });

                setWhatYouLove(response?.data?.userData?.result.whatYouLove);
                setWhatTheWorldNeeds(response?.data?.userData?.result.whatTheWorldNeeds);
                setWhatYouCanBePaidFor(response?.data?.userData?.result.WhatYouCanBePaidFor);
                setWhatYouAreGoodAt(response?.data?.userData?.result.WhatYouAreGoodAt);

        } else if(response?.data?.status === false ) {

            toast.error(response?.data?.message);

        }

    };
    // * End of fetchUserData();

    // ? Method to save all values
    const saveAllValues = async (event) => {

        event.preventDefault();

        setDummyState(false);

        const token = localStorage.getItem('token');

        if(!token) {

            navigate('/login');

            toast.warn('Login Expired. Please login again to proceed!');

            return;
        }

        if(
            whatYouLove.length <= 0 ||
            whatTheWorldNeeds.length <= 0 ||
            whatYouCanBePaidFor.length <= 0 ||
            whatYouAreGoodAt.length <= 0
        ) {

            toast.warn('Please add atleast one of each value to Save');

            return;

        }

        const input = {
            token,
            whatYouLove: whatYouLove,
            whatTheWorldNeeds: whatTheWorldNeeds,
            WhatYouCanBePaidFor: whatYouCanBePaidFor,
            WhatYouAreGoodAt: whatYouAreGoodAt,
        };

        const response = await axios.patch(
            'http://localhost:5000/api/allValues',
            input,
        );

        if(response?.data?.status === true) {


            // navigate('/what-the-world-needs');

            console.log({
                save: response,
            });

            toast.success('Values updated successfully!');


        } else {

            toast.error(response?.data?.message);

        }

    };
    // * End of saveAllValues(); 


    useEffect(() => {

        Auth();

        fetchUserData();

    }, []);


    return(
        <div className='dashboard-wrapper'>
            <div className='dashboard-header'>
                <span>
                    Here is where you can discover your IKIGAI
                </span>

                <div className='buttons-section'>
                    <button onClick={() => navigate('/feed')}>
                        See other's IKIGAI
                    </button>

                    <button onClick={() => Logout()}>
                        Logout
                    </button>
                </div>
                
                <span className='prompt-text'>
                    (Click on save once you are done editing!)
                </span>

            </div>

            <div className='ikigai-section'>
                <DragDropContext
                    onDragEnd={ onDragEnd }
                >
                    <Droppable
                        key={'what-you-love'}
                        droppableId='1'
                    >
                        {
                            (provided) => (
                                <div
                                    className='ikigai-inner-section what-you-love'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <span className='section-heading'>What you Love</span>
                                    <form
                                        className='input-form'
                                        onSubmit={(event) => submitWhatYouLove(event)}
                                    >
                                        <input 
                                            className='value-input'
                                            value={ whatYouLoveInput }
                                            onChange={ (event) => setWhatYouLoveInput(event.target.value) }
                                        />
                                        <button
                                            className='value-form-submit-btn'
                                            type='submit'
                                        >
                                            Add +
                                        </button>
                                    </form>
                                    <div className='values-section'>
                                        {
                                            renderWhatYouLoveValues(provided)
                                        }
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>

                    <Droppable
                        key={'what-the-world-needs'}
                        droppableId='2'
                    >
                        {
                            (provided) => (
                                <div
                                    className='ikigai-inner-section what-the-world-needs'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <span className='section-heading'>What the World Needs</span>
                                    <form
                                        className='input-form'
                                        onSubmit={(event) => submitWhatTheWorldNeeds(event)}
                                    >
                                        <input 
                                            className='value-input'
                                            value={ whatTheWorldNeedsInput }
                                            onChange={ (event) => setWhatTheWorldNeedsInput(event.target.value) }
                                        />
                                        <button
                                            className='value-form-submit-btn'
                                            type='submit'
                                        >
                                            Add +
                                        </button>
                                    </form>
                                    <div className='values-section'>
                                        {
                                            renderWhatTheWorldNeedsValues()
                                        }
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>

                    <Droppable
                        key={'what-you-can-be-paid-for'}
                        droppableId='3'
                    >
                        {
                            (provided) => (
                                <div
                                    className='ikigai-inner-section what-you-can-be-paid-for'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <span className='section-heading'>What you can be Paid for</span>

                                    <form
                                        className='input-form'
                                        onSubmit={(event) => submitWhatYouCanBePaidFor(event)}
                                    >
                                        <input 
                                            className='value-input'
                                            value={ whatYouCanBePaidForInput }
                                            onChange={ (event) => setWhatYouCanBePaidForInput(event.target.value) }
                                        />
                                        <button
                                            className='value-form-submit-btn'
                                            type='submit'
                                        >
                                            Add +
                                        </button>
                                    </form>
                                    <div className='values-section'>
                                        {
                                            renderWhatYouCanBePaidForValues()
                                        }
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                    
                    <Droppable
                        key={'what-you-are-good-at'}
                        droppableId='4'
                    >
                        {
                            (provided) => (
                                <div
                                    className='ikigai-inner-section what-you-are-good-at'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <span className='section-heading'>What you are Good at</span>
                                    <form
                                        className='input-form'
                                        onSubmit={(event) => submitWhatYouAreGoodAt(event)}
                                    >
                                        <input 
                                            className='value-input'
                                            value={ whatYouAreGoodAtInput }
                                            onChange={ (event) => setWhatYouAreGoodAtInput(event.target.value) }
                                        />
                                        <button
                                            className='value-form-submit-btn'
                                            type='submit'
                                        >
                                            Add +
                                        </button>
                                    </form>
                                    <div className='values-section'>
                                        {
                                            renderWhatYouAreGoodAtValues()
                                        }
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </div>

            <div className='dashboard-footer'>
                <button onClick={saveAllValues}>
                    Save
                </button>

                <span className='prompt-text'>
                    (Click on save to update your analysis!)
                </span>

            </div>

            <div className='analysis-section'>
                <span className='header-text'>
                    Your IKIGAI Analysis
                </span>
                
                <div className='passion-section analysis-section'>
                    <span>
                        Your Passion:
                    </span>
                    <br />
                    <div className='values-section'>
                        {
                            renderAnalysis(
                                whatYouLove?.filter(value => whatYouAreGoodAt?.includes(value))
                            )
                        }
                    </div>
                </div>
                
                <div className='mission-section analysis-section'>
                    <span>
                        Your Mission:
                    </span>
                    <br />
                    <div className='values-section'>
                        {
                            renderAnalysis(
                                whatYouLove?.filter(value => whatTheWorldNeeds?.includes(value))
                            )
                        }
                    </div>
                </div>
                
                <div className='vocation-section analysis-section'>
                    <span>
                        Your Vocation:
                    </span>
                    <br />
                    <div className='values-section'>
                        {
                            renderAnalysis(
                                whatTheWorldNeeds?.filter(value => whatYouCanBePaidFor?.includes(value))    
                            )
                        }
                    </div>
                </div>
                
                <div className='profession-section analysis-section'>
                    <span>
                        Your Profession:
                    </span>
                    <br />
                    <div className='values-section'>
                        {
                            renderAnalysis(
                                whatYouCanBePaidFor?.filter(value => whatYouAreGoodAt?.includes(value))
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Dashboard;