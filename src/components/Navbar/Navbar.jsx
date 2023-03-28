import React from "react";
import styled from './Navbar.module.css'
const Navbar = ({name}) => {
    return <div className={styled['navbar']}>
        <div className={styled['navigation-button']}>=</div>
        <div className={styled['profile-name']}>
            {name}
        </div>
    </div>
}

export default Navbar