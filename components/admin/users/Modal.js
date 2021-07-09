import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import UserContext from "@/core/context/Context"
import styled, { keyframes } from 'styled-components'
import { MdClose, MdCheck } from "react-icons/md"
import { VscSave } from "react-icons/vsc"
import Select from 'react-select';
import {MdKeyboardArrowRight} from 'react-icons/md'
import { parseCookies } from "nookies"

const Modal = ({ setShowModal, products, targ}) => {
    const { alertFunc } = useContext(UserContext);
    const { jwt } = parseCookies();
    const [ classN, setClassN ] = useState(``);
    const [ selectOption, setSelectOption ] = useState([]);
    const [ selectOptionId, setSelectOptionId ] = useState([]);
    const [ approve, setApprove ] = useState(targ.admin_confirmed);

    useEffect(()=>{
        let arr = []
        targ?.products.forEach(el=>{
            arr.push(el.id);
        });
        setSelectOptionId(arr);
        setSelectOption(targ?.products);

    },[])

    const CloseHandle = () =>{
        setClassN(`Content2`);
        setTimeout(() => {
            setShowModal(false);
        }, 280);
    }

    const ChangeHandle = (item) =>{
        let arr = []
        item.forEach(el=>{
            arr.push(el.id);
        });
        setSelectOption(item);
        setSelectOptionId(arr);
    }

    const ClickHandle = () =>{
        axios.put(`${process.env.serverUrl}/users/${targ.id}`, { admin_confirmed:approve, products: selectOptionId, seen: true }, {
            headers: {Authorization: `bearer ${jwt}`}
        }).then((res)=>{
            if(res.data.admin_confirmed){
                axios.post(`${process.env.serverUrl}/emails`, { to: targ.email }).then(()=>{
                    setClassN(`Content2`);
                    setTimeout(() => {
                        setShowModal(false);
                        alertFunc('green', 'Email амжилттай илгээгдлээ', true);
                    }, 280);
                })
            }else{
                setClassN(`Content2`);
                setTimeout(() => {
                    setShowModal(false);
                }, 280);
            }
        })
    }

    return (
        <ModalContainer>
           <div className={`Content ${classN}`}>
                <div onClick={()=>CloseHandle()} className="close"><MdClose /></div>
                <div className="mainCont">
                    <div className="info">
                        <div className="title">Байгууллагын нэр: </div>
                        <div className="desc">{targ.company_name}</div>
                    </div>
                    <div className="info">
                        <div className="title">Байгууллагын регистр: </div>
                        <div className="desc">{targ.company_register}</div>
                    </div>
                    <div className="info">
                        <div className="title">Email: </div>
                        <div className="desc">{targ.email}</div>
                    </div>
                </div>

                <div className="Handles">
                    <div className="items">
                        <div className="title">Бүртгэлийн зөвшөөрөл</div>
                        {/* <button className="button"><span>✓ </span>Зөвшөөрөх</button> */}

                        <button onClick={()=>setApprove(prev=>!prev)} className={`buttons ${approve?`A11`:``} `}>
                            <div className="SVG">< MdCheck /></div>
                            <span>{approve?`Зөвшөөрсөн`:`Зөвшөөрөх`}</span><MdKeyboardArrowRight /> <MdKeyboardArrowRight className="one" /> <MdKeyboardArrowRight className="two" />
                        </button>

                    </div>

                    <div className="items">
                        <div className="title">Бүтээгдэхүүн сонгох</div>
                        <Select
                            value={selectOption}
                            // value={option =>`${option.title}`}
                            getOptionLabel={option =>`${option.title}` }
                            isMulti
                            onChange={ChangeHandle}
                            options={products}
                            // autoFocus={true}
                            isClearable={false}
                            isSearchable={true}
                            isOptionSelected={option => { selectOption.id === option.id ? true : false; }}
                            noOptionsMessage={() => null}
                            placeholder={'Байгууллага сонго'}
                            getOptionLabel={option =>`${option.title}` }
                        />
                    </div>
                </div>

                <div className="btnPar">
                    <button onClick={ClickHandle} className={`SaveButton`}> <VscSave /> Хадгалах</button>
                </div>
           </div>
           <div />
        </ModalContainer>
    )
}

export default Modal

const ModalAnimate = keyframes`
    0%{ opacity:0; transform:scale(0); }
    100%{ opacity:1; transform:scale(1); }
`
const ModalAnimate2 = keyframes`
    0%{ opacity:1; transform:scale(1); }
    100%{ opacity:0; transform:scale(0); }
`

const animation3 = keyframes`
    0% { transform:scale(0); }
    50% { transform:scale(1.2); }
    100% { transform:scale(1); }
`

export const ModalContainer = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    font-size:14px;
    .Content{
        animation:${ModalAnimate} 0.3s ease;
        padding:30px 30px;
        border-radius:6px;
        position:relative;
        z-index:999;
        height:38em;
        width:33em;
        background-color:#ffffff;
        max-height:38em;
        overflow-y:scroll;
        ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }
        .btnPar{
            z-index:1000;
            width:100%;
            margin-top:20px;
            display:flex;
            justify-content:flex-end;
            .SaveButton{
                display:flex;
                align-items:center;
                gap:10px;
                border:none;
                padding:4px 30px;
                background-color:${props=>props.theme.mainColor2};
                color:white;
                border-radius:4px;
                &:hover{
                    opacity:0.8;
                }
            }
            .disable{
                opacity:0.7;
            }
        }
        
        .Handles{
            display:flex;
            flex-direction:column;
            .items{
                margin-bottom:18px;
                width:100%;
                .title{
                    margin-bottom:12px;
                    font-size:14px;
                    font-weight:500;
                }
                .buttons{
                    color: rgba(${props=>props.theme.textColor},0.8);
                    text-decoration:none;
                    margin-right:18px;
                    transition:all 0.3s ease;
                    cursor:pointer;
                    border-radius:5px;
                    padding:5px 60px;
                    padding-right:30px;
                    border:1px solid rgba(0,0,0,0.2);
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    box-shadow:1px 1px 8px -6px;
                    background-color:${props=>props.theme.mainColor4};
                    &:hover{
                        box-shadow:1px 1px 16px -7px;
                        .one{
                            margin-left:0px;
                            transform:scale(1);
                        }
                        .two{
                            margin-left:0px;
                            transform:scale(1);
                        }
                    }
                    span{
                        font-weight:500;
                        margin-right:30px;
                    }
                    svg{
                        opacity:0.6;
                        height:100%;
                        font-size:16px;
                    }
                    .one{
                        transition:all 0.3s ease;
                        margin-left:-15px;
                        transform:scale(0);
                    }
                    .two{
                        transition:all 0.3s ease;
                        margin-left:-15px;
                        transform:scale(0);
                    }
                    .SVG{
                        display:none;
                    }
    
                }
                .A11{
                    position:relative;
                    color: green;
                    border:1px solid rgba(0,0,0,0.2);
                    box-shadow:1px 1px 14px -6px;
                    .SVG{
                        animation:${animation3} 0.7s ease;
                        content:"✔";
                        position:absolute;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        z-index:1;
                        top:-7px;
                        right:0%;
                        border:1px solid green;
                        background-color:white;
                        color:green;
                        width:19px;
                        height:19px;
                        border-radius:50%;
                    }
                }
            }
        }
        .mainCont{
            border-bottom:1px solid rgba(0,0,0,0.2);
            padding-bottom:10px;
            margin-bottom:20px;
            .info{
                margin-bottom:16px;
                display:flex;
                gap:15px;
                .title{
                    font-size:14px;
                    width:46%;
                    color:rgba(17,17,17);
                    font-weight:500;
                    opacity:0.9;
                }
                .desc{
                    color:rgba(60,60,60);
                }
            }
        }
        .close{
            cursor:pointer;
            position:absolute;
            top:3px;
            right:3px;
            background-color:#fff;
            border-radius:50%;
            height:30px;
            width:30px;
            display:flex;
            align-items:center;
            justify-content:center;
            &:hover{
                background-color:#DCDCDC;
            }
            svg{
                font-size:22px;
            }
        }
    }
    .Content2{
        animation:${ModalAnimate2} 0.3s ease;
    }
    
`