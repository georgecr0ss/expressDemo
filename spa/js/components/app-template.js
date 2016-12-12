import React from 'react'

export default (props) => {
        return(
            <div className="container">
                <h1>Template Component</h1>
                {props.children}
            </div>
        )
}
