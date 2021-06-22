import React, { useState } from 'react'
import styled from 'styled-components';
import { FaFilter } from "react-icons/fa"
import { BiSearchAlt } from "react-icons/bi"
import { IoMdArrowDropright } from "react-icons/io"


const MainFeedback = ({ data }) => {
    const [ targetProduct, setTargetProduct ] = useState({});
    const TargetHandle = (el) =>{
        setTargetProduct(el)
    }

    return (
        <Container>
            <div className="Header">
                <div className="container-xxl Parent">
                   <div className="FirstParent">
                       <div className="filter">
                            <FaFilter />
                            <span>Шүүлтүүр</span>
                       </div>
                        {targetProduct?.title?<div className="TargetFilter">{targetProduct?.title}</div>:null}
                   </div>

                   <div className="searchPar">
                        <input className="myInp" placeholder="Хайх..." />
                        <BiSearchAlt />
                   </div>

                </div>
            </div>
            <div className="container-xxl">
                <div className="MainContent">
                    <div className="leftMenu">
                        <div className="Title">Бүх бүтээгдэхүүн</div>
                        {data.map((el,ind)=>{
                            return(
                                <div key={ind} onClick={()=>TargetHandle(el)} className={`Contents ${targetProduct.id===el.id?`Active`:``}`}>
                                    <div className="svg"><IoMdArrowDropright /></div>
                                    <div className="text">{el.title}</div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="CommentSector">
                        Home
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default MainFeedback

const Container = styled.div`
    padding-top: 76.28px;
    margin-bottom: 12em;
    font-family:${props=>props.theme.fontFamily2};
    .MainContent{
        display:flex;
        justify-content:space-between;
        .leftMenu{
            box-shadow:1px 1px 30px -20px;
            font-size:14px;
            background-color:#fff;
            color:#333;
            width:25%;
            border:1px solid rgba(0,0,0,.2);
            padding:30px 20px;
            padding-top:10px;
            .Title{
                font-size:16px;
                font-weight:600;
                color:#7B7B7B;
                border-bottom:1px solid rgba(0,0,0,0.2);
                padding-bottom:20px;
                margin-bottom:15px;
            }
            .Contents{
                transition:all 0.3s ease;
                cursor:pointer;
                margin-top:22px;
                margin-bottom:22px;
                display:flex;
                align-items:center;
                color:rgba(${props=>props.theme.textColor},0.8);
                .text{
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    width:100%;
                }
                &:hover{
                    color:rgba(${props=>props.theme.textColor},1);
                }
                .svg{
                    width:30px;
                    height:30px;
                    svg{
                        margin-bottom:-6px;
                        color:rgba(${props=>props.theme.textColor},0.9);
                        font-size:22px;
                        margin-right:3px;
                    }
                }
            }
            .Active{
                transition:all 0.3s ease;
                border-radius:3px;
                // background-color:rgba(20,110,190,1);
                background-color:${props=>props.theme.mainColor2};
                color:white;
                font-weight:600;
                &:hover{
                    color:#fff;
                }
                .svg{
                    svg{
                        color:#fff;
                    }
                }
            }
        }
        .CommentSector{
            width:68%;
        }
    }
    .Header{
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 25%);
        height: 50px;
        color:#969696;
        display:flex;
        align-items:center;
        font-size:13px;
        margin-bottom:30px;
        .Parent{
            display:flex;
            justify-content:space-between;
            align-items:center;
            .searchPar{
                position:relative;
                width:25%;
                color:#7B7B7B;;
                &:hover{
                    svg{
                        color:#21659f;
                    }
                }
                .myInp{
                    transition:all 0.3s ease;
                    background-color:white;
                    width:100%;
                    border:1px solid rgba(0,0,0,.4);
                    padding:6px 20px;
                    padding-right:40px;
                    border-radius:50px;
                    &:hover{
                        border:1px solid rgba(33, 101, 159, 0.4);
                    }
                    &:focus{
                        border:1px solid #21659f;
                        outline-width: 0;
                    }
                }
                svg{
                    transition:all 0.3s ease;
                    position:absolute;
                    font-size:20px;
                    top:20%;
                    right:10px;
                }
            }
            .FirstParent{
                display:flex;
                align-items:center;
                gap:40px;
                .filter{
                    cursor:pointer;
                    display:flex;
                    align-items:center;
                    gap:8px;
                    font-size:15px;
                    svg{
                        font-size:18px;
                    }
                }
                .TargetFilter{
                    color:rgba(${props=>props.theme.textColor},0.9);
                    border:1px solid rgba(0,0,0,0.2);
                    padding:4px 20px;
                    border-radius:50px;
                }
            }
        }
    }
`

