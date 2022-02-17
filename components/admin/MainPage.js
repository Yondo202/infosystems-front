import React, { useState } from 'react'
import styled from 'styled-components'
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import { AiOutlineComment } from "react-icons/ai"
import { FiUserCheck } from "react-icons/fi"
import DateFormat from "@/miscs/LanguageDate"
import DateFormat2 from "@/miscs/FormatDate"

const MainPage = ({data, users}) => {
    
    return (
        <Container>

            <div className="Parent"> 
               <div className="title">Хэрэглэгчид</div>
               <div className="AllQuestion">
                    <div className="Allhead">
                        <span> <IoCheckmarkCircleOutline /> Нийт {users?.length} хэрэглэгч</span>
                        <div></div>
                    </div>
                    {users?.map((el,ind)=>{
                        return(
                            <div key={ind} className="items">
                                <div className="SVG">
                                    <FiUserCheck />
                                </div>
                                <div className="TextPar">
                                        <div className="titles">
                                            <span>{el?.username}</span>
                                            <div />
                                            <div className="date">Бүртгүүлсэн өдөр: ( {DateFormat2(el?.created_at, true)} )</div>
                                        </div>
                                    
                                    <div className="sm">
                                        {el?.email}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
           </div>


           <div className="Parent"> 
               <div className="title">Сэтгэгдэлүүд</div>
               <div className="AllQuestion">
                    <div className="Allhead">
                        <span> <IoCheckmarkCircleOutline /> Нийт {data?.length} сэтгэгдэл</span>
                        <div></div>
                    </div>
                    {data?.map((el,ind)=>{
                        return(
                            <div key={ind} className="items">
                                <div className="SVG">
                                    <AiOutlineComment />
                                </div>
                                <div className="TextPar">
                                        <div className="titles">
                                            <span>{el?.name}</span>
                                            <div className="date">{DateFormat(el?.created_at)} -  өмнө</div>
                                        </div>
                                    
                                    <div className="sm">
                                        {el?.description}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
           </div>


           

        </Container>
    )
}

export default MainPage

const Container = styled.div`
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    .Parent{
        height: 34.5em;
        overflow-y: scroll;
        ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }
        width: 48.5%;
        background-color: #ffffff;
        border-radius: 8px;
        padding:12px 15px;
        box-shadow:0px 0px 27px -20px;
        .AllQuestion{
        border-radius: 6px;
        border: 1px solid rgba(0,0,0,0.2);
        .Allhead{
                color: ${props=>props.theme.mainColor3};
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 14px;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                background-color: ${props=>props.theme.mainColor4};
                span{
                    color: #24292e;
                    ${props=>props.theme.BoldFont}
                    svg{
                        margin-right: 8px;
                        font-size: 18px;
                    }
                }
            }
            .items{
                padding: 15px 14px;
                display: flex;
                gap: 15px;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                &:hover{
                    background-color: #f6f8fa;
                }
                .SVG{
                    svg{
                        color: ${props=>props.theme.mainColor2};
                        font-size: 20px;
                    }
                }
                .TextPar{
                    width: 90%;
                    .titles{
                        width: 100%;
                        ${props=>props.theme.BoldFont}
                        text-decoration: none;
                        font-size: 16px;
                        color: #24292e;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .date{
                            font-weight: 400;
                            margin-top: 6px;
                            font-size: 12.5px;
                            color: #586069;
                        }
                        &:hover{
                            color: ${props=>props.theme.mainColor2};
                        }
                    }
                    .sm{
                        ${props=>props.theme.BoldFont}
                        margin-top: 6px;
                        font-size: 13.5px;
                        color: #586069;
                    }
                }
            
            }
        }
        .title{
            font-size: 20px;
            ${props=>props.theme.BoldFont}
            margin-bottom: 15px;
        }
    }
`
