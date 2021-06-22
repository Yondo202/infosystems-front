import React from 'react'
import styled from "styled-components"
import { IoCheckmarkCircleOutline } from "react-icons/io5"


export const LoadingFull = () => {
    return (
        <LoadingStyle2>
            <div>
                <img src="/img/giff2.gif" alt="gif" />
            </div>
        </LoadingStyle2>
    )
}

const LoadingStyle2 = styled.div`
    position:fixed;
    z-index:1000;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    background-color:rgba(255,255,255,0.6);
    display:flex;
    align-items:center;
    justify-content:center;
    img{
        margin-top:-200px;
        width:120px;
        height:auto;
    }
`

export const Alert = ({alert}) => {
    return (
        <AlertStyle style={alert.cond
        ?{right:`0%`, borderBottom:`2px solid ${alert.color}`}
        :{right:`-100%`}}
        className="Alert">
            <IoCheckmarkCircleOutline color={alert.color} />
            <div className="text">{alert.text}</div>
        </AlertStyle>
    )
}


const AlertStyle = styled.div`
    transition:all 0.8s ease;
    position:fixed;
    top:100px;
    right:0%;
    background-color:#fff;
    box-shadow:1px 1px 20px -8px;
    display:flex;
    align-items:center;
    gap:16px;
    padding:16px 18px;
    width:280px;
    border-radius:4px;
    border-bottom:2px solid ${props=>props.theme.mainColor2};
    svg{
        font-size:22px;
    }
    .text{
        font-size:16px;
    }
`


export const Loading = () => {
    return (
        <LoadingStyle>
            <img src="/giff2.gif" />    
        </LoadingStyle>
    )
}

 export const LoadingStyle = styled.div`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background-color:rgba(255,255,255, 0.5);
    display:flex;
    align-items:center;
    justify-content:center;
    img{
        margin-top:-3rem;
        transform:scale(0.8);
    }
`