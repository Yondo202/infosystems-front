import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { IoHelpCircleOutline, IoCheckmarkCircleOutline } from "react-icons/io5"
import Link from "next/link"
import DateFormat from "@/miscs/LanguageDate"
import IssueEditor from "@/components/feedback/IssueEditor"

const QuestionHome = ({data, title, ids, productId, search}) => {
    const [ Menu, setMenu ] = useState([]);
    const [ sort, setSort ] = useState(`DESC`);
    const [ showEditor, setShowEditor ] = useState(false);

    useEffect(()=>{
        // Go();
        setMenu(data);
        setShowEditor(false);
        console.log("----------");
    },[sort, data])

    const Go = async () =>{
        let res2 = await axios.post(`${process.env.serverUrl}/graphql`, { query:`query{
            productFeedbacks(sort:"created_at:${sort}"){
                id name  created_at
                product{ id title }
                user{ id username role{ name } }
            }
        }`})
        setMenu(res2.data.data.productFeedbacks);
    }

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
                                        <span>{el.name}</span>
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
            font-weight: 500;
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
                font-weight: 500;
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
                .titles{
                    font-weight: 500;
                    text-decoration: none;
                    font-size: 17px;
                    color: #24292e;
                    &:hover{
                        color: ${props=>props.theme.mainColor2};
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
