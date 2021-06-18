import React, { useEffect, useState } from 'react'
import styled, { keyframes } from "styled-components"
import { Svg1 } from "@/miscs/Svg"
import { BsChevronDown } from "react-icons/bs"
import { animateScroll as scroll } from "react-scroll";

const Hometop1 = ({ data }) => {
    const [ textWrite, setTextWrite ] = useState('');

    useEffect(()=>{
        Write();
    },[]);

    const Write = () =>{
        let arr = Array.from(data?.BigText?.text_write);
        if(arr && arr.length!==0){
            arr.forEach((el,ind)=>{
                if(textWrite.length < arr.length){
                    setTimeout(() => {
                        setTextWrite(prev=>`${prev}${el}`);
                    }, 100 * ind);
                }
            });
        }
    }

    const scrollHandle = ()=>{
        scroll.scrollTo(890);
    }

    return (
        <Container >
            <div className="container-xxl Parent">
                <div className="TextParent">
                    <div className="Big">
                        <div className="row1">
                            <div className="Text ">{data?.BigText?.text_first}</div>
                            <div className="Text write">
                               {`${textWrite}`}
                               <div className={`line`}>|</div>
                            </div>
                        </div>
                        <div className="Text ">{data?.BigText?.text_last}</div>
                    </div>
                    <div className="Small"></div>
                </div>

                <div className="Cards row">
                    {data?.Cards.map((el,ind)=>{
                        return(
                        <div key={ind} className="col-md-3 col-12 col-sm-12">
                            <div className="CardItems">
                                <div className="ghost" style={{backgroundColor:`${el.color_code}`}} />
                                <div className={`HeadSm ${el.code}`}>
                                    <Svg1 width="25%" fill={el.color_code} code={el.code} />
                                </div>
                                {/* <img className="image" src="/system.svg" alt="system.svg" /> */}
                                <h3 style={{color:el.color_code}} className="title">{el.title}</h3>
                                <div className="desc">{el.text}</div>
                                {/* <div >Learn more</div> */}
                                <div className={`normal Link`} style={{color:el.color_code}} >Дэлгэрэнгүй</div>
                            </div>
                        </div>
                        )
                    })}
                </div>

                <div onClick={scrollHandle} className="BottomArrow"> <BsChevronDown /></div>
            </div>
        </Container>
    )
}

export default Hometop1

const Crow = keyframes`
    0%{ opacity:0; }
    50%{ opacity:1; }
    100%{ opacity:0; }
`
const Opacity = keyframes`
    0%{ opacity:0; }
    100%{ opacity:0.030; }
`
const Home = keyframes`
    0%{ opacity:0; }
    100%{ opacity:1; }
`

const Container = styled.div`
    min-height: 900px;
    height: 100vh;
    background: url(/header-bg.jpg) 70% 30% no-repeat ${props=>props.theme.mainColor};
    padding-top: 80px;
    margin-top: 0px;
    position:relative;
    .Parent{
        animation:${Home} 3s ease;
        .BottomArrow{
            transition:all 0.4s ease;
            color: rgba(255,255,255,.65);
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translate(-50%,0);
            width: 28px;
            font-size:32px;
            cursor:pointer;
            &:hover{
                bottom: 18px;
            }
        }
        .Cards{
            .CardItems{
                position:relative;
                cursor:pointer;
                // padding:5px 15px;
                text-align:center;
                display:flex;
                flex-direction:column;
                align-items:center;
                &:hover{
                    background-color:${props=>props.theme.mainColor};
                    .ghost{
                        display:block;
                    }
                    .normal{
                        color:none;
                    }
                }
                .ghost{
                    animation:${Opacity} 0.8s ease;
                    display:none;
                    opacity:0.030;
                    height:100%;
                    width:100%;
                    position:absolute;
                    z-index:1;
                }
                .HeadSm{
                    height: 120px;
                    padding:8% 15px;
                    // padding:5px ;
                    background-repeat:no-repeat;
                    background-position:center;
                }
                .one{
                    background-image:url(/pet1.png);
                }
                .two{
                    background-image:url(/pet2.png);
                }
                .three{
                    background-image:url(/pet3.png);
                }
                .four{
                    background-image:url(/pet4.png);
                }
                .title{
                    height:6.75rem;
                    font-size:1.25rem;
                    margin-bottom:0;
                    padding: 35px 0 20px 15px;
                    color:#9f62ff;
                }
                .desc{
                    padding:0px 15px;
                    font-size: 15px;
                    line-height: 1.75;
                    color: rgba(255,255,255,.65);
                    opacity: 1;
                    font-weight: 400;
                    height:172px;
                    width:100%;
                    overflow:hidden;
                }
                .Link{
                    // color: rgba(255,255,255,.65);
                    text-transform: uppercase;
                    font-weight: 500;
                    font-size: 0.9rem;
                    letter-spacing: 2px;
                    text-decoration: none;
                    padding-top:20px;
                    padding-bottom:8px;
                }
                .normal{
                    color:rgba(255,255,255,.65) !important;
                }
            }
        }
        .TextParent{
            width: 100%;
            font-size: 3.5rem;
            color: #fff;
            padding-top: 5rem;
            padding-bottom: 6rem;
            .Big{
                .Text{
                    color:white;
                    white-space: nowrap;
                    overflow: hidden;
                    font-weight:500;
                }
                .row1{
                    display:flex;
                    align-items:center;
                    .write{
                        display:flex;
                        align-items:center;
                        font-weight:300;
                        color: #008aff;
                        letter-spacing: 1.5px;
                        padding-bottom:5px;
                        line-height:3rem;
                        margin-left:20px;
                        padding-right:10px;
                        // border-right: solid 3px #008aff;
                        .line{
                            animation: ${Crow} 0.8s linear 0s infinite;
                        }
                    }
                }
            }
        }
    }
    @media(max-width:768px){
        min-height: 900px;
        height: 100%;
        .Parent{
            .BottomArrow{
                display: none;
            }
            .TextParent{
                font-size: 1.5rem;
                .Big{
                    .row1{
                        .write{

                        }
                    }
                }
            }
            .Cards{
                .CardItems{
                    margin-bottom: 30px;
                    .HeadSm{
                        height: 120px;
                        padding: 4% 15px;
                        svg{
                            width: 100% !important;
                        }
                    }
                }
            }
        }
    }
`