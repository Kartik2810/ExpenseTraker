import React from 'react'

function Spinner() {
    return (
        <div>
            <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
        </div>
    )
}

export default Spinner
