import React from 'react'
//alert component from bootstrap slightly modified
export default function Alert(props) {
    return (
        <div>
            <div className={`alert alert-${props.alert.color}`} role="alert">
                {props.alert.msg}
            </div>
        </div>
    )
}
