import React from 'react'

export default function CustomInput(props) {
    return (
        <input {...props} onChange={props.onChange} />
    )
}