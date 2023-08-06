import React from 'react';

// eslint-disable-next-line react/prop-types
const Input = ({type, className, name, id, required, placeholder}) => {
    return (
        <input
            className={`input w-full focus:ring focus:outline-none focus:ring-yellow-400 ${className}`}
            type={type}
            name={name}
            id={id}
            required={required}
            placeholder={placeholder}
        />
    );
};

export default Input;