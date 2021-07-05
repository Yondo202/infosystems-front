import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { MdClose } from "react-icons/md"
import { VscSave } from "react-icons/vsc"
import Select from 'react-select';

const Modal = ({showModal, setShowModal, products, targ}) => {
    const [ classN, setClassN ] = useState(``);
    const [ selectOption, setSelectOption ] = useState([]);

    const CloseHandle = () =>{
        setClassN(`Content2`);
        setTimeout(() => {
            setShowModal(false);
        }, 300)
    }
    const ChangeHandle = (item) =>{
        // let difference = selectOption.filter(x => !item.includes(x));

        // console.log('Removed: ', difference);

        console.log(`item`, item);

        setSelectOption(item);
    }

    // console.log(`targetProduct`, targ);
    // console.log(`selectOption`, selectOption);

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
                        <button className="button"><span>✓ </span>Зөвшөөрөх</button>
                    </div>

                    <div className="items">
                        <div className="title">Бүтээгдэхүүн сонгох</div>
                        <Select
                            // value={selectOption}
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
                    <button className="SaveButton"><VscSave /> Хадгалах</button>
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

const ModalContainer = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.5);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-evenly;

    .Content{
        animation:${ModalAnimate} 0.3s ease;
        padding:20px 20px;
        border-radius:6px;
        position:relative;
        height:30em;
        width:30em;
        background-color:#ffffff;
        .btnPar{
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
        }
        
        .Handles{
            display:flex;
            flex-direction:column;
            .items{
                margin-bottom:15px;
                width:100%;
                .title{
                    margin-bottom:10px;
                    font-size:13px;
                    font-weight:500;
                }
                .button{
                    display:flex;
                    gap:10px;
                    border:none;
                    padding:2px 20px;
                    background-color:${props=>props.theme.mainColor2};
                    color:white;
                    border-radius:4px;
                    &:hover{
                        opacity:0.8;
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
            top:-10px;
            right:-10px;
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
