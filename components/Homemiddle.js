import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import minimize from "components/miscs/minimize"
import Link from "next/link"
import { BsArrowRight } from "react-icons/bs"

{/* <SVG width={"100%"} /> */}
const Homemiddle = ({ data }) => {
    const [ Menu, setMenu ] = useState(data?.ProductSector[0]);
    const [ anime, setAnime ] = useState(false);

    const RenderHandle = (el) =>{
        setMenu(el);
        setAnime(true);
        setTimeout(() => {
            setAnime(false);
        }, 700)
    }

    return (
        <Container>
            <div className="container-xxl">
                <div className="Title">
                   <h1>{data?.title}</h1>
                </div>
                <div className="contentPar">
                    <div className="Header">
                        {data?.ProductSector.map((el,i)=>{
                            return(
                                <div key={i} onClick={()=>RenderHandle(el)} className={`contentSector ${el.code===Menu.code?`Active`:``}`}>
                                    <div className={`svgParent ${el?.code}`}></div> 
                                    <span className="headText">{el?.title_head}</span>
                                </div>
                            )
                        })}
                    </div>
                    {Menu?.id&&<div className={`SoloContent ${anime?`anime`:``}` }>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="textSector">
                                    <h2 className="title">{Menu.title}</h2>
                                    <div className="desc">{Menu?.description}</div>
                                    <Link href={process.env.frontUrl+process.env.productUrl+Menu.slug}>
                                        <a className="More">
                                            <button className="moreBtn">Дэлгэрэнгүй</button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="Image">
                                    <img src={minimize(Menu?.image, "large")} alt="infosystem" />
                                </div>
                            </div>
                        </div>
                    </div>}

                </div>
            </div>
            <div className="AllProduct">
                <Link href={process.env.frontUrl+process.env.pageUrl+data?.slug}><a className="myA"> БҮХ БҮТЭЭГДЭХҮҮН ХАРАХ <BsArrowRight /> </a></Link>
            </div>
        </Container>
    )
}

// href={process.env.frontUrl+process.env.productUrl+el.slug}

export default Homemiddle

const animate = keyframes`
    0% {opacity:0; transform:translateY(-10px); }
    100% {opacity:1; transform:translateY(0px); }
`

const animate2 = keyframes`
    0% {opacity:0; }
    100% {opacity:1; }
`


const Container = styled.div`
        scroll-margin-top: 0 !important;
        padding:50px 0px;
        .AllProduct{
            display:flex;
            align-items:center;
            text-align:center;
            width:100%;
                .myA{
                    text-decoration:none;
                    width:100% !important;
                    background-color: ${props=>props.theme.mainColor2};
                    font-size: 1.2rem;
                    padding: 28px 40px;
                    white-space: normal;
                    color:#fff;
                    letter-spacing:.056em;
                    svg{
                        transition:all 0.4s ease;
                        font-size:30px;
                        margin-left:18px;
                        &:hover{
                            margin-left:25px;
                        }
                    }
                    &:hover{
                        background-color: #2086da;
                        svg{
                            margin-left:30px;
                        }
                    }
                }
        }

    .contentPar{
        padding-bottom:100px;
        .SoloContent{
            height:32em;
            @media (max-width:768px){
                height:100%;
            }
            .textSector{
                .More{
                    text-decoration: none;
                        .moreBtn{
                            text-transform: uppercase;
                            padding: 12px 30px;
                            font-size: 0.85rem;
                            background-color: ${props=>props.theme.mainColor2};
                            color:#fff;
                            border: 1px solid #DDD;
                            letter-spacing:.12em;
                            &:hover{
                                background-color: #2086da;
                            }
                        }
                }
                .title{
                    font-weight:400;
                    font-size:1.8rem;
                    color:#3D3D3D;
                    padding: 3rem 0 2rem 0rem;
                }
                .desc{
                    margin-bottom: 28px;
                    object-fit:cover;
                    font-family: ${props=>props.theme.fontFamily2};
                    font-weight:400;
                    width:80%;
                    color:#6A6A6A;
                    font-size:17px;
                }
                
            }
            .Image{
                height:100%;
                img{
                    width:100%;
                    height:32em;
                    object-fit:cover;
                }
            }
        }
        .anime{
            animation: ${animate2} 0.7s ease;
        }
        
        .Header{
            margin-bottom:90px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            .contentSector{
                cursor:pointer;
                border: 1px solid #F2F3F4 !important;
                width:15%;
                background-color:#fff;
                padding: 0px 20px 0px 5px;
                display:flex;
                align-items:center;
                border-radius:3px;
                &:hover{
                    .svgParent{
                        opacity: 1;
                    }
                    .headText{
                        color:#3D3D3D;
                    }
                }
                .headText{
                    font-weight: 500;
                    font-size: 1rem;
                    line-height: normal;
                    padding-left: 8px;
                    color:#6a6a6a;
                }
                .svgParent{
                    width: 70px;
                    height: 70px;
                    margin: 0;
                    opacity: .85;
                    background-image:url(/SVG/one.png);
                    background-size:cover;
                    background-repeat:no-repeat;
                    background-position:center;
                }
                .one{
                    background-image:url(/SVG/one.png);
                }
                .two{
                    background-image:url(/SVG/two.png);
                }
                .three{
                    background-image:url(/SVG/three.png);
                }
                .four{
                    background-image:url(/SVG/four.png);
                }
                .five{
                    background-image:url(/SVG/five.png);
                }
                .six{
                    background-image:url(/SVG/six.png);
                }
            }
            .Active{
                position:relative;
                // box-shadow:1px 2px 25px -15px;
                box-shadow: 0 20px 40px rgba(0,0,0,.1)!important;
                .svgParent{
                    opacity: 1;
                }
                .headText{
                    color:#3D3D3D;
                }
                &:after{
                    content:"";
                    transition:all 0.4s ease;
                    animation: ${animate} 0.4s ease;
                    content:"";
                    position:absolute;
                    bottom:-12px;
                    left:45%;
                    z-index:1;
                    width: 0;
                    height: 0;
                    border-left: 20px solid transparent;
                    border-right: 20px solid transparent;
                    border-top: 12px solid white;
                }
            }
        }
    }
    .Title{
        padding-bottom:20px;
        text-align:center;
        h1{
            font-weight:300;
        }
    }
    @media (max-width:768px){
        .AllProduct{
            .myA{
                font-size: 0.9rem;
            }
        }
        .contentPar{
            .SoloContent{
                .textSector{
                    .More{
                        .moreBtn{
                           
                        }
                    }
                }
                .Image{
                    display: none;
                    height:100%;
                    img{
                        width:100%;
                        height:32em;
                        object-fit:cover;
                    }
                }
            }
            .anime{
                animation: ${animate2} 0.7s ease;
            }
            
            .Header{
                margin-bottom:30px;
                flex-direction: column;
                .contentSector{
                    width:100%;
                    padding: 0px 20px 0px 5px;
                    .headText{
                    }
                    .one{
                        background-image:url(/SVG/one.png);
                    }
                    .two{
                        background-image:url(/SVG/two.png);
                    }
                    .three{
                        background-image:url(/SVG/three.png);
                    }
                    .four{
                        background-image:url(/SVG/four.png);
                    }
                    .five{
                        background-image:url(/SVG/five.png);
                    }
                    .six{
                        background-image:url(/SVG/six.png);
                    }
                }
                .Active{
                    position:relative;
                    // box-shadow:1px 2px 25px -15px;
                    box-shadow: 0 20px 40px rgba(0,0,0,.1)!important;
                    .svgParent{
                        opacity: 1;
                    }
                    .headText{
                        color:#3D3D3D;
                    }
                    &:after{
                        content:"";
                        display: none;
                    }
                }
            }
        }
    }
`
