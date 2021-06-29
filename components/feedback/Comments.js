import React, { useEffect, useContext, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import UserContext from "@/core/context/Context"
import { FaUserTie } from "react-icons/fa"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import HtmlParser from "@/miscs/CustomParser2"
import DateFormat from '../miscs/FormatDate'
import axios from 'axios'
import { parseCookies } from "nookies"
import {useRouter} from 'next/router'

const Comments = ({ datas, parent }) => {
    const { id, jwt, role } = parseCookies();
    const ctx = useContext(UserContext);
    const router = useRouter();
    const [ showDrop, setShowDrop ] = useState(false);

    
    useEffect(()=>{
        // if(!parent){
        //     FetchUser();
        // }
        window.addEventListener("mousedown", handleScroll, false);
    },[])

    const handleScroll = (e) =>{
        if(e.target.classList.value!=="dropDown"){
            setShowDrop(false)
        }
    }

    // const FetchUser = () =>{
    //     axios.get(`${process.env.serverUrl}/users?id=${datas.id}`,{ headers: {
    //         Authorization: `Bearer ${parseCookies().jwt}`
    //       } } ).then(res=>{
    //           console.log(`res`, res);
    //       })
    // }

    const HandleChange = async () =>{
        await axios.delete(`${process.env.serverUrl}/issue-answers/${datas.id}`,
            {headers:{
                Authorization: `Bearer ${jwt}`
            }}
        ).then(()=>{
            setShowDrop(false);
            router.replace(router.asPath);
            ctx.alertFunc('green', "Устгагдлаа", true);
            
        })
    }


    console.log(`datas.user.idd`, parseInt(datas.user.id))
    console.log(`idd`, parseInt(id))

    return (
        <Container >
            <div className="userProfile">
               <div className="profileImg"><FaUserTie /></div> 
            </div>
            <div className="ContentPar">
                <div className="header">
                    <div className="texts">
                        <div className="name">{datas.user?.username}</div>
                        <div className="date">{DateFormat(datas.created_at)}</div>
                    </div>

                    <div className="addition">
                        {parent&&<div className="Author">
                            Асуултын эзэн
                        </div>}
                        {!parent?role==='infosystem_admin' || parseInt(id)===parseInt(datas.user.id)
                        ?<div className={`menuIcon ${showDrop?`active`:``}`}>
                                <HiOutlineDotsHorizontal onClick={()=>setShowDrop(prev=>!prev)} />
                                {showDrop&&<div onClick={HandleChange} className="dropDown">Устгах</div>}
                            </div>:null:null}
                    </div>
                    
                </div>
                <div className="MainConent">
                    <HtmlParser data={datas.content} />
                </div>
            </div>
        </Container>
    )
}

export default Comments

const animate = keyframes`
    0%{ opacity:0.5; transform:scale(0.5); }
    70%{ opacity:1; transform:scale(1.2); }
    100%{ opacity:1; transform:scale(1); }
`


const Container = styled.div`
    /* min-height: 10em; */
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    &:before{
        content: "";
        position: absolute;
        height: 30px;
        width: 3px;
        bottom: 0;
        left: 15%;
        margin-bottom: -30px;
        background-color: #e1e4e8;
    }
    .ContentPar{
        margin-left: 58px;
        position: relative;
        background-color: #ffffff;
        border:1px solid rgba(0,0,0,.2);
        border-radius: 8px;
        .MainConent{
            width: 100%;
            padding: 15px;
            overflow: visible;
            font-size: 14px;
        }
        .header{
            /* margin-left: -15px; */
            background-color: ${props=>props.theme.mainColor4};
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            color: #586069;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            border-radius: 8px 8px 0px 0px;
            .texts{
                gap: 15px;
                display: flex;
                .name{
                    font-weight: 500;
                    color: #24292e;
                }
            }
            .addition{
                display: flex;
                align-self: center;
                gap: 20px;
                .Author{
                    font-size: 12px;
                    border-radius: 50px;
                    font-weight: 500;
                    padding: 3px 15px;
                    border: 1px solid rgba(0,0,0,0.1);
                }
                .menuIcon{
                    position: relative;
                    svg{
                        cursor: pointer;
                        font-size: 22px;
                        &:hover{
                            color: ${props=>props.theme.mainColor2};
                        }
                    }
                   .dropDown{
                        animation: ${animate} 0.15s ease;
                        cursor: pointer;
                        position: absolute;
                        top: 100%;
                        right: 0;
                        border:1px solid #e1e4e8;
                        padding: 4px 12px; 
                        border-radius: 6px; 
                        background-color: #ffffff;
                        color: #24292e;
                        width: 120px;
                        &:hover{
                            color: #ffffff;
                            background-color: ${props=>props.theme.mainColor2};
                        }
                   }
                }
                .active{
                    svg{
                        color: ${props=>props.theme.mainColor2};
                    }
                }
            }
        }
        &:before{
            content:"";
            position:absolute;
            top: 12px;
            left:-12px;
            background-color: #b3b3b3;
            width: 18px;
            height: 18px;
            clip-path: polygon(68% 0, 1% 50%, 68% 100%);
            z-index: 2;
        }
    }
    .userProfile{
        position: absolute;
        left: 0;
        top: 0;
        .profileImg{
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #d6e2ef;
            svg{
                color: #586069;
                font-size: 22px;
            }   
        }
        
    }
    
        
`