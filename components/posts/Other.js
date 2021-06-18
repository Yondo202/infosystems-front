import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components';
import { BsClockHistory } from "react-icons/bs"
import { ImFire } from "react-icons/im"
import { MdAccessTime } from "react-icons/md"
import { HiOutlineDuplicate } from "react-icons/hi"
import minimize from '../miscs/minimize';
import axios from "axios"
import Link from "next/link"

const Other = ({news}) => {
    const [ Active, setActive ] = useState(`1`);
    const [ otherData, setOtherData ] = useState([]);
    const [ Gif, setGif ] = useState(true);
    useEffect(()=>{
        FetchData();
    },[]);

    const FetchData = async (el) =>{
        setGif(true);
        if(el){ setActive(el); }
        await axios.get(`${process.env.serverUrl}/posts?_limit=6&_sort=published_at:DESC&_start=0`).then(res=>{
           setOtherData(res.data);
           setGif(false);
       })
    }

    const FetchData2 = async (el) =>{
        setGif(true);
        setActive(el);
        await axios.get(`${process.env.serverUrl}/posts?_limit=6&_sort=count:DESC&_start=0`).then(res=>{
           setOtherData(res.data);
           setGif(false);
       })
    }

    return (
        <Container>
            <div className="Content">
                <div className="Header">
                    <div onClick={()=>FetchData(`1`)} className={`head ${Active===`1`&&`Active`}`}><BsClockHistory /></div>
                    <div onClick={()=>FetchData2(`2`)} className={`head ${Active===`2`&&`Active`}`}><ImFire /></div>
                </div>

                <div className="ItemParent">
                    {!Gif?otherData.map((el,ind)=>{
                        return(
                            <div key={ind}>
                                <Link href={process.env.frontUrl+process.env.postUrl+el.slug}>
                                    <a  className={`content ${el.id===news?`ActiveCont`:``}`}>
                                        <div className="img" > 
                                            <img src={minimize(el.image, 'small')} />
                                        </div>
                                        <div className="textParent">
                                            <div className="big">
                                                    {el?.title}
                                            </div>
                                            <div className="sm">
                                                <div className="date"><MdAccessTime />{el.published_at.slice(0,10)}</div>
                                                <div className="cat"><HiOutlineDuplicate /> {el.catigory}</div>
                                            </div>
                                            
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                    }):<div className="Giff"><img src="/giff2.gif" /></div>}
                </div>
            </div>
        </Container>
    )
}

export default Other

const animate = keyframes`
    0%{ opacity:0 }
    100%{ opacity:1 }
` 

const Container = styled.div`
    height: 100%;
    position: relative;
    .Content{
        top: 80px;
        position: sticky;
        animation: ${animate} 0.4s ease;
        .ItemParent{
            .Giff{
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 50px;
                img{
                    width: 40%;
                }
            }
            .content{
              text-decoration:none;
              border-bottom:1px solid rgba(0,0,0,0.1);
              border-bottom-style: dashed;
              cursor: pointer;
              display: flex;
              padding: 10px 0px;
              &:hover{
                  .img{
                    img{
                        opacity: 0.7;
                    }
                  }
                  .textParent{
                      .big{
                          color: #666666;
                      }
                  }
               }
                .img{
                    width: 36%;
                    backface-visibility: hidden;
                    background: rgb(0, 0, 0);
                    line-height: 0;
                    margin-right: 15px;
                    overflow: hidden;
                    float: left;
                    position: relative;
                    img{
                        transition: all 0.3s ease 0s;
                        max-width: 100%;
                        object-fit: cover;
                        min-width: 100%;
                        height: 82px;
                        backface-visibility: hidden;
                    }
                    
                }
                .textParent{
                    width: 64%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .big{
                        font-size: 13px;
                        color: black;
                        font-weight:400;
                        margin-bottom: 6px;
                    }
                    .sm{
                        /* margin-bottom: 10px; */
                        color: #666666;
                        font-size: 11.5px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 10px;
                        svg{
                            margin-top: -2px;
                            color: black;
                            font-size: 14px;
                        }
                    }
                    .date{
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                }
            }
            .ActiveCont{
                display: none;
            }
        }
        .Header{
            display: flex;
            gap: 5px;
            justify-content: space-between;
            margin-bottom: 12px;
            border-bottom: 2px solid ${props=>props.theme.mainColor2};
            .head{
                &:first-child{
                    /* border-right: 1px solid rgba(0,0,0,0.4); */
                }
                width: 50%;
                text-align: center;
                background-color: #ffffff;
                padding: 8px 0px;
                cursor: pointer;
                svg{
                    color: #454d62;
                    font-size: 16px;
                }
                &:hover{
                    svg{
                        color: #222222;
                    }
                }
            }
            .Active{
                background-color: #454d62;
                svg{
                    color: #ffffff;
                }
                &:hover{
                    svg{
                        color: rgba(255,255,255,.7);
                    }
                }
            }
        }   
    }
`
