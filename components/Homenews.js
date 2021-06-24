import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from "next/link"
import styled, { keyframes } from 'styled-components';
import Minimize from "components/miscs/minimize"
import { BiCalendar } from "react-icons/bi"
import { RiArrowDownSLine } from "react-icons/ri"

const Homenews = ({ data }) => {
    const [ Result, setResult ] = useState([]);
    const [ LimitCount, setLimitCount ] = useState(6);

    useEffect(()=>{
        if(data.title){
            FetchData();
        }
    },[LimitCount]);

    const FetchData  = async () =>{
        const Data = await axios.get(process.env.serverUrl+`/posts?_limit=${LimitCount}&_sort=published_at:DESC&_start=0`);
        setResult(Data?.data);
    }
    
    return (
        <Container>
            <div className="container-xxl">
                <div className="Title">
                    <h2>{data?.title}</h2>
                </div>
                <div className="row">
                    {Result.map((el,ind)=>{
                        return(
                            <div key={ind} className="col-md-4 col-12">
                                <Link href={process.env.frontUrl+process.env.postUrl+el.slug}>
                                    <a>
                                        <div className="Content" >
                                            <div className="image" style={{backgroundImage:`url(${Minimize(el.image)})`}}></div>
                                            <div className="textParent">
                                                <div className="smSector">
                                                    <div className="category">{el.catigory}</div>
                                                    <div className="date"><BiCalendar /><span>{el.published_at.slice(0,10)}</span></div>
                                                </div>
                                                <div className="bigSector">{el.title}</div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                {LimitCount<7&&<div className="More">
                    <div onClick={()=>setLimitCount(prev=>prev+6)} className="text"><span>Цааш үзэх</span> <RiArrowDownSLine /></div>
                </div>}
            </div>
        </Container>
    )
}

export default Homenews


const animate = keyframes`
    0%{ opacity:0; transform:translateY(20px); }
    100%{ opacity:1; transform:translateY(0px); }
`

const Container = styled.div`
    margin-bottom: 12em;
    .More{
        display: flex;
        align-items: center;
        justify-content: center;
        .text{
            border-radius: 3px;
            color: rgba(0,0,0,0.8);
            transition: all 0.3s ease;
            box-shadow:1px 1px 8px -6px;
            background-color: #fff;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 50px;
            border:1px solid rgba(0,0,0,0.1);
            svg{
                font-size: 18px;
                margin-left: 8px;
            }
            &:hover{
                box-shadow:1px 1px 11px -6px;
                padding: 5px 52px;
            }
        }
    }
    .Title{
        padding-bottom:20px;
        text-align:start;
        h2{
            font-weight:300;
        }
    }
    .Content{
        animation: ${animate} 1s ease;
        margin-bottom: 30px;
        cursor: pointer;
        height: 18em;
        position: relative;
        overflow: hidden;
        &:hover{
            .image{
                transform: scale(1.1);
            }
            .textParent{
                background-image: linear-gradient(rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.9) 100%);
            }
        }
        .image{
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            transition: all 0.3s ease;
            background-size: cover;
            /* background-size: 100%; */
            background-repeat: no-repeat;
            background-position:center;
        }
        .textParent{
            transition: all 0.3s ease;
            width: 100%;
            z-index: 1;
            display: block;
            left: 0px;
            bottom: 0px;
            position: absolute;
            z-index: 2;
            color: #fff;
            background-image: linear-gradient(rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.9) 100%);
            padding: 25px 25px;
            .smSector{
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 18px;
                margin-bottom: 10px;
                font-size: 11px;
                letter-spacing: 1px;
                .category{
                    color: rgba(255,255,255,.95);
                    padding: 3px 10px;
                    background-color: ${props=>props.theme.mainColor2};
                    border-radius: 3px;
                }
                .date{
                    display: flex;
                    align-items: center;
                    
                    svg{
                        font-size: 18px;
                        color: ${props=>props.theme.mainColor2};
                        margin-right: 8px;
                    }
                }
            }
            .bigSector{
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 20px;
            }
        }
        /* &:hover{
            background-size: contain;
        } */
    }
`
