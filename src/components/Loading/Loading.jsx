import React from "react";
import styled from './Loading.module.css'
const Loading = () => {
    return <div className={styled['loading-parent']}>
        <div className={styled["loader"]}></div>
        <p className={styled["message"]}>LOADING</p>
    </div>
}

export default Loading