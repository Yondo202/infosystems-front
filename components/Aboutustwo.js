import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Minimize from "@/miscs/minimize"
import { HeadStyle } from "@/miscs/TitleTheme"

const Aboutustwo = ({ data }) => {
    const [ Active, setActive ] = useState({});
    useEffect(()=>{
        if(data){
            setActive(data.PurposeComp[0]);
        }
    },[])

    const SwitchHandle = (el) =>{
        setActive(el);
    }

    return (
        <Container>
            <div className="container">
                {data?.AboutUsTwoChild.title?<div className="contentSector">
                    <div  className="contents">
                        <HeadStyle ><span className="text">{data?.AboutUsTwoChild.title}</span></HeadStyle>
                        <div className="imgPar">
                            <img  src={Minimize(data?.AboutUsTwoChild.image, "large")} />
                        </div>
                    </div>
                </div>:null}

                <div className="PurposeComp">
                    <div className="Headers">
                        {data?.PurposeComp.map((el,ind)=>{
                            return(
                                <div key={ind} onClick={()=>SwitchHandle(el)} className={`items ${Active.title===el.title&&`Active`}`}>{el?.title} <div className="line" /></div>
                            )
                        })}
                    </div>

                    <div className="MainContents">
                        <div className="smTitles">{Active.smTitle} </div>
                        <ul className="Ul">
                            {Active?.AboutList?.map((el,ind)=>{
                                return(
                                    <li className="List" key={ind}>{el.text}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div className="Awards">
                    <HeadStyle ><span className="text">{data?.Awards.title}</span></HeadStyle>
                    <div className="images">
                            {data?.Awards.image.map((el,ind)=>{
                                return(
                                    <div key={ind} className="imgCont"><img src={Minimize(el, "medium")} /></div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Aboutustwo


const Container = styled.div`
    padding-top: 0rem;
    padding-bottom: 50px;
    font-size: 17px !important;
    background-color: #ffffff;
    .Awards{
        .images{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .imgCont{
                width: 24%;
                img{
                    width: 100%;
                }
            }
            @media (max-width:768px){
                flex-direction: column;
                .imgCont{
                    width: 100%;
                }
            }
        }
    }
    .PurposeComp{
        margin-bottom: 2rem;
        .MainContents{
            .Ul{
                .List{
                    padding: 10px 0px;
                }
            }
        }
        .Headers{
            display: flex;
            gap: 30px;
            border-bottom: 1px solid ${props=>props.theme.mainColor2};
            margin-bottom: 20px;
            .items{
                color: #666666;
                cursor: pointer;
                padding: 10px 20px;
                font-weight: 400;
                position: relative;
                transition: all 0.3s ease;
                /* border-bottom: 0px solid ${props=>props.theme.mainColor2}; */
                &:hover{
                    color: black;
                }
                .line{
                    height: 3px;
                    width: 0%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background-color: ${props=>props.theme.mainColor2};
                }
            }
            .Active{
                position: relative;
                font-weight: 500;
                color: #262626;
                /* border-bottom: 3px solid ${props=>props.theme.mainColor2}; */
                .line{
                    transition: all 0.3s ease;
                    height: 3px;
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background-color: ${props=>props.theme.mainColor2};
                }
            }
        }
    }
    .contentSector{
        margin-bottom: 3rem;
        width: 90%;
        .imgPar{
            img{
                width: 100%;
            }
        }
    }
`