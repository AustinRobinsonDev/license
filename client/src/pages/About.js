import React from 'react'
import {withRouter} from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h1>About this app</h1>
            <p className='my-1'>This is a license managment system that uses jwt authorization.</p>
            <p className='bg-dark p'> <strong>Version</strong>1.0.0</p>
        </div>
    )
}

export default withRouter(About)