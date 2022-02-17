import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import axios from "axios"
import DateFormat from "@/miscs/LanguageDate"
import { IoHelpCircleOutline } from "react-icons/io5"
import { FiClock, FiUser } from "react-icons/fi"
import { AiOutlineFileProtect, AiOutlineDelete } from "react-icons/ai"
import HtmlParser from "@/miscs/CustomParser2"
import { parseCookies } from "nookies"
import Delete from "@/components/admin/care/Delete"

const MainPage = () => {
    const [ show, setShow ] = useState(false);
    const { jwt } = parseCookies();
    const [ datas, setDatas ] = useState([]);
    const [ targ, setTarg ] = useState(null);
    const [ Target, setTarget ] = useState({});

    useEffect(()=>{
        FetchData();
    },[])

    const FetchData = async () =>{
        let res2 = await axios.post(`${process.env.serverUrl}/graphql`, { query:`query{
            productFeedbacks(sort:"created_at:DESC"){
                id name content created_at admin_confirmed resolved
                issue_answers{ id }
                product{ id title }
                user{ id username role{ name } }
            }
        }`})
        setDatas(res2.data.data.productFeedbacks);
    }

    const HandleToggle = (el) =>{
        if(targ===el){
            setTarg(null);
        }else{
            setTarg(el);
        }
    }

    const ApproveHandle = (el) =>{
        axios.put(`${process.env.serverUrl}/product-feedbacks/${el.id}`, { admin_confirmed: el.admin_confirmed?false:true, seen: true }, { headers:{ Authorization:`bearer ${jwt}` } }).then(_=>{
            FetchData();
        })
    }

    const ResolveHandle = (el) =>{
        axios.put(`${process.env.serverUrl}/product-feedbacks/${el.id}`, { resolved: el.resolved?false:true }, { headers:{ Authorization:`bearer ${jwt}` } }).then(_=>{
            FetchData();
        })
    }

    const ShowHandle = (el) =>{
        console.log("el");
        setTarget(el);
        setShow(true);
    }


    console.log(`datas`, datas);

    return (
        <Container>
            <div className="title">Нийт хүсэлт</div>
            <div className="Parent">
                {datas.map((el,ind)=>{
                    return(
                        <div key={ind} className="items">
                            <div className={`itemsChild ${el.id===targ?`itemsChild2`:``}`}>
                                <div className="SVG">
                                    <IoHelpCircleOutline />
                                </div>
                                <div className="TextPar">
                                        <div className="titles" >
                                            <div onClick={()=>HandleToggle(el.id)} className="text">{el.name}</div>
                                            <div className="approve">
                                                {el.resolved
                                                ?<div onClick={()=>ResolveHandle(el)} className="item itemActive">Шийдэгдсэн</div>
                                                :<div onClick={()=>ResolveHandle(el)} className="item">Шийдэгдээгүй</div>}
                                                
                                                {el.admin_confirmed
                                                ?<div onClick={()=>ApproveHandle(el)} className="item itemActive">Зөвшөөрсөн</div>
                                                :<div onClick={()=>ApproveHandle(el)} className="item">Хүлээгдсэн...</div>}
                                                <div onClick={()=>ShowHandle(el)} className="itemDel"><AiOutlineDelete /></div>
                                            </div>
                                        </div>
                                    <div className="sm">
                                        <span><FiClock /> {DateFormat(el.created_at)} - өмнө</span> 
                                        <span><FiUser /> {el.user?.username}</span>
                                        <span><AiOutlineFileProtect /> ( {el.product.title} )</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`MainConent ${el.id===targ?`MainConent2`:``}`}>
                                <div className="gap" />
                                <HtmlParser data={el.content}  />
                            </div>
                        </div>
                    )
                })}
            </div>
            {show&&<Delete setShow={setShow} Target={Target} FetchData={FetchData} />}
        </Container>
    )
}

export default MainPage

const Container = styled.div`
    padding: 0px 20px;
    .title{
        padding:0px 15px;
        font-size: 20px;
        ${props=>props.theme.BoldFont}
        margin-bottom: 15px;
    }
    .Parent{
        // height: 35.5em;
        height: 85vh;
        overflow-y: scroll;
        ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }
        width: 70%;
        background-color: #ffffff;
        border-radius: 8px;
        padding:12px 15px;
        box-shadow:0px 0px 27px -20px;
        @media (max-width:1400px){
            width: 100%;
        }
        .items{
            .itemsChild2{
                background-color: rgba(20,100,220, 0.087);
            }
            .itemsChild{
                width:100%;
                display: flex;
                gap: 15px;
                border-bottom: 1px solid rgba(0,0,0,0.1);
                // cursor:pointer;
                padding: 20px 14px;
                // &:hover{
                //     background-color: rgba(20,100,220, 0.057);
                // }
                .SVG{
                    svg{
                        color: ${props=>props.theme.mainColor2};
                        font-size: 25px;
                    }
                }
                .TextPar{
                    width:100%;
                    .titles{
                        width:100%;
                        display:flex;
                        gap:15px;
                        justify-content: space-between;
                        .approve{
                            display:flex;
                            gap:20px;
                            .itemDel{
                                color:white;
                                cursor:pointer;
                                background-color:#f33c29;
                                width:25px;
                                height:25px;
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                border-radius:50%;
                                &:hover{
                                    opacity:0.8;
                                }
                            }
                            .item{
                                cursor:pointer;
                                text-align:center;
                                background-color:#ffc720;
                                border-radius: 50px;
                                padding: 2px 10px;
                                ${props=>props.theme.BoldFont}
                                font-size: 11.5px;
                                width:140px;
                                height:25px;
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
                        display:flex;
                        gap:28px;
                        align-items:center;
                        span{
                            display:flex;
                            align-items:center;
                            gap:8px;
                            svg{
                                font-size:15px;
                            }
                        }
                    }
                }
            }
            .MainConent{
                transition:all 0.3s ease;
                overflow:hidden;
                height:0px;
                display:flex;
                gap:20px;
                padding:0px 0px;
                border-bottom:1px solid rgba(0,0,0,0);
                background-color: rgba(20,100,220, 0.087);
                .gap{
                    width:30px;
                }
                width:100%;
                fint-size:13px;
            }
            .MainConent2{
                transition:all 0.3s ease;
                padding:1px 0px;
                height:100%;
                border-bottom:1px solid rgba(0,0,0,0.2);
            }
           
        }
    }
`
