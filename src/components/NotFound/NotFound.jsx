import React from "react";
import styled from './NotFound.module.css'


import { Link } from "react-router-dom";
import Error from '../Error/Error'

const NotFound = () => {
    return <div className={styled['error-container']}>
        <Error message ={"No matching route found"}/>
        <Link className={styled['link']} to="/">Home</Link>
    </div>
}

export default NotFound;