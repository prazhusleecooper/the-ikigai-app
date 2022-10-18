import React, { useState } from 'react';

import '../Stylesheets/Components/MultiValueInput.scss';

const MultiValueInput = ({ value, removeFunction, updateFunction }) => {

    // ? STATE
    const [edit, setEdit] = useState(false);
    const [inputValue, setInputValue] = useState(value); 

    const renderField = () => {

        const onSubmit = (event) => {

            event.preventDefault();

            updateFunction(value, inputValue);

            setEdit(() => !edit);

        }

        if(edit) {

            return(
                <form onSubmit={onSubmit}>
                    <input 
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onFocus={(event) => event.target.select()}
                    />
                </form>
            )

        } else {

            return(
                <span>{ inputValue || value }</span>
            );

        }

    };

    return(

        <div
            className='multi-value-input-pill'
            key={ value }
            onDoubleClick={() => setEdit(!edit)}
        >
            {
                renderField()
            }

            <button
                className='close-btn'
                onClick={() => removeFunction(value)}
            >
                ✖
            </button>
        </div>

    )

};

export default MultiValueInput;