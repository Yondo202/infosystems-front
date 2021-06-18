import React from 'react'
import Link from "next/link"
import styled from 'styled-components'
import { IoIosCall, IoMdMail } from "react-icons/io"
import { ImLocation } from "react-icons/im"
import { FaFacebookF,FaTwitter, FaYoutube, FaInstagram  } from "react-icons/fa"

const Footer = ({logo , footerMenu}) => {
    return (
        <Container >
            <div className="container-xxl SectorParent">
                <div className="Sector">
                    <img className="logo" src={process.env.serverUrl + logo?.url} alt="infosystem" />
                    <div className="aboutUs">{footerMenu?.aboutUs}</div>
                </div>
                <div className="Sector2">
                    <h6 className="title">Меню</h6>
                    <div className="menu">
                        {footerMenu?.FooterMenu?.map((el,ind)=>{
                            return(
                                <Link key={ind} href={el.slug!=="/"&&el.slug?`${process.env.frontUrl+process.env.pageUrl+el.slug}`:`/`}>
                                    <a>
                                        <div className="menus">{el.name}</div>
                                    </a>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="Sector2 Sector3">
                    <h6 className="title">Холбоо барих</h6>
                    <div className="menu">
                        <div className="menus"><IoIosCall /> <span>{footerMenu?.phone}</span></div>
                        <div className="menus"><ImLocation /><span>{footerMenu?.location}</span></div>
                        <div className="menus"><IoMdMail /><span>{footerMenu?.email}</span></div>
                    </div>
                </div>
                <div className="Sector2 Sector4">
                    <h6 className="title">Биднийг дагах</h6>
                    <div className="SocialButton">
                        {footerMenu?.SocialButton?.length&&footerMenu?.SocialButton.map((el,ind)=>{
                            return(
                                <div key={ind}>
                                    {el.name==="facebook"&&<a href={el.link} target="_blank" className="icon facebook"> <FaFacebookF /></a> }
                                    {el.name==="twitter"&&<a href={el.link} target="_blank" className="icon twitter"> <FaTwitter /></a> }
                                    {el.name==="youtube"&&<a href={el.link} target="_blank" className="icon youtube"> <FaYoutube /></a>}
                                    {el.name==="instagram"&&<a href={el.link} target="_blank" className="icon insta"> <FaInstagram /></a>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="copyRight">
                <div className="container-xxl">{footerMenu?.Copyright}</div>
            </div>
        </Container>
    )
}

export default Footer

const Container = styled.div`
    font-family:${props=>props.theme.fontFamily2};
    background-color:${props=>props.theme.mainColor};
    color:#a9a9ab !important;
    font-size:14px;
    .copyRight{
        padding:10px 0px;
        background-color:#1d1d21;
        .container{
            font-size: 0.8rem;
            opacity: .4;
            color: #fff;
        }
    }
    .SectorParent{
        padding:80px 12px;
        padding-bottom:100px;
        display:flex;
        gap:10px;
        .Sector{
            padding-right:60px;
            width:33%;
            .logo{
                margin-bottom:30px;
            }
            .aboutUs{
                font-size:14px;
                font-weight:400;
                color: rgba(255,255,255,.4);
            }
        }
        .Sector2{
            width:17%;
            a{
                text-decoration: none !important;
            }
            .title{
                color:#fff;
                margin-bottom:25px;
            }
            .menu{
                .menus{
                    cursor:pointer;
                    transition:all 0.3s ease;
                    margin-bottom:14px;
                    &:hover{
                        color: ${props=>props.theme.mainColor2};
                    }
                }
            }
        }
        .Sector3{
            padding-right:20px;
            width:35%;
            .menu{
                .menus{
                   display:flex;
                   align-items:center;
                    svg{
                        margin-right:15px;
                        font-size:22px;
                        width:10%;
                    }
                    span{
                        width:90%;
                    }
                }
            }
        }
        .Sector4{
            width:15%;
            .SocialButton{
                display:flex;
                flex-direction:row;
                justify-content:start;
                align-items:center;
                gap: 20px;
                .icon{
                    transition:all 0.3s ease;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    cursor: pointer;
                    margin-left: 15px;
                    background: rgba(255,255,255,.15);
                    -webkit-border-radius: 50%;
                    border-radius: 50%;
                    color: #fff;
                    font-size: 16.5px;
                    text-align: center;
                    width: 35px;
                    height: 35px;
                    &:first-child{
                        margin-left: 0px;
                    }
                }
                .FaTumblr{
                        &:hover{
                            background: #304E6C;
                        }
                }
                .FaPinterestP{
                    &:hover{
                        background: #cb2027;
                    }
                }
                .FaLinkedinIn{
                    &:hover{
                        background: #069;
                    }
                }
                .insta{
                    &:hover{
                        background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
                    }
                }
                .facebook{
                    &:hover{
                        background: #0268e3;
                    }
                }
                .twitter{
                    &:hover{
                        background-color: rgb(29, 161, 242);
                    }
                }
                .youtube{
                    &:hover{
                        background-color: #f00;
                    }
                }
            }
        }
    }
    @media (max-width:768px){
        .SectorParent{
            flex-direction: column;
            .Sector{
                width: 100%;
            }
            .Sector2{
                width: 100%;
            }
        }
    }
`