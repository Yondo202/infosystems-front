import React, { useState, useEffect } from 'react';
import { parseCookies } from "nookies";
import styled from 'styled-components';
import { IoHelpCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import Link from "next/link";
import DateFormat from "@/miscs/LanguageDate";
import IssueEditor from "@/components/feedback/IssueEditor";

const QuestionHome = ({data, title, ids, productId, search}) => {
    const { role } = parseCookies();
    const [ Menu, setMenu ] = useState([]);
    const [ sort, setSort ] = useState(`DESC`);
    const [ showEditor, setShowEditor ] = useState(false);

    useEffect(()=>{
        if(ids){
            setMenu(data);
        }
        if(role==="infosystem_admin"){
            setMenu(data);
        }
        setShowEditor(false);
    },[sort, data])

    return (
        <Container>
            <div className="TopHead">
                {ids&&<button onClick={()=>setShowEditor(true)} className="myBtn">Нэмэх</button>}
            </div>
            {search&&<div className="SearchTitle"><h3>Үр дүн</h3></div>}
            {ids&&showEditor&&<IssueEditor setShowEditor={setShowEditor} productId={productId} height={true} />}

            <div className="AllQuestion">
                <div className="Allhead">
                    <span> <IoCheckmarkCircleOutline /> Нийт {Menu.length} асуулт</span>
                    <div></div>
                </div>
                {Menu.map((el,ind)=>{
                    return(
                        <div key={ind} className="items">
                            <div className="SVG">
                                <IoHelpCircleOutline />
                            </div>
                            <div className="TextPar">
                                <Link href={ids?`answer/${el.id}`:`/feedback/answer/${el.id}`}>
                                    <a className="titles">
                                        <div className="text">{el.name}</div>
                                        <div className="approve">
                                            {el.resolved&&<div className="item itemActive">Шийдэгдсэн</div>}
                                        </div>
                                    </a>
                                </Link>
                                
                                <div className="sm">{DateFormat(el.created_at)} - өмнө {el.user?.username} ( {title?title:el.product.title} )</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default QuestionHome

const Container = styled.div`
    .SearchTitle{
        margin-bottom: 10px;
        border-bottom: 1px solid ${props=>props.theme.mainColor2};
    }
    .TopHead{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-bottom: 12px;
        button{
            font-family: ${props=>props.theme.fontFamily2};
            letter-spacing: 0.3px;
            padding: 6px 30px;
            /* width: 20%; */
            border: none;
            outline: none;
            background-color: ${props=>props.theme.mainColor2};
            color:white;
            border-radius: 5px;
            ${props=>props.theme.BoldFont}
            &:hover{
                opacity: 0.8;
            }
        }
    }
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
                    font-size: 20px;
                }
            }
        }
        .items{
            padding: 10px 14px;
            display: flex;
            gap: 15px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            &:hover{
                background-color: #f6f8fa;
            }
            .SVG{
                svg{
                    color: ${props=>props.theme.mainColor2};
                    font-size: 25px;
                }
            }
            .TextPar{
                width:100%;
                .titles{
                    text-decoration:none;
                    width:100%;
                    display:flex;
                    justify-content: space-between;
                    .approve{
                        display:flex;
                        gap:20px;
                        .item{
                            cursor:pointer;
                            text-align:center;
                            background-color:#ffc720;
                            border-radius: 3px;
                            padding: 2px 10px;
                            ${props=>props.theme.BoldFont}
                            font-size: 12px;
                            width:130px;
                            height:22px;
                            border-radius:50px;
                            &:hover{
                                opacity:0.8;
                            }
                        }
                        .itemActive{
                            background-color:#4CBB17 !important;
                        }
                    }
                    .text{
                        cursor:pointer;
                        ${props=>props.theme.BoldFont}
                        text-decoration: none;
                        font-size: 17px;
                        color: #24292e;
                        &:hover{
                            color: ${props=>props.theme.mainColor2};
                        }
                    }
                }
                .sm{
                    margin-top: 6px;
                    font-size: 12.5px;
                    color: #586069;
                }
            }
        }
    }
`
