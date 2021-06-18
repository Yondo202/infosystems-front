import React from 'react'
import styled from 'styled-components'
import { IoIosCall, IoMdMail } from "react-icons/io"
import { ImLocation } from "react-icons/im"
import { FaFacebookF,FaTwitter, FaYoutube, FaInstagram  } from "react-icons/fa"

const Contact = ({data}) => {
    return (
        <Container>
            <div className="container">
                <div className="Title">
                    <h2>{data?.title}</h2>
                </div>
                <div className="iframeComp">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21388.772984506613!2d106.902443!3d47.924842!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8a3d87fc1d2bc222!2z0JjQvdGE0L7RgdC40YHRgtC10LzRgSDQpdCl0Jo!5e0!3m2!1sen!2smn!4v1623924335834!5m2!1sen!2smn"  loading="lazy"></iframe>
                </div>

                <div className="MainCont">
                    <div className="Sector2 Sector3">
                        <div className="menu">
                            <div className="menus"><IoIosCall /> <span>{data?.phone}</span></div>
                            <div className="menus"><ImLocation /><span>{data?.location}</span></div>
                            <div className="menus"><IoMdMail /><span>{data?.email}</span></div>
                        </div>
                    </div>
                    <div className="SocialButton">
                        {data?.SocialButton?.length&&data?.SocialButton.map((el, ind)=>{
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
        </Container>
    )
}

export default Contact


const Container = styled.div`
    padding-top:6rem;
    margin-bottom: 12em;
    /* width="600" height="450" */
    .iframeComp{
        width: 100%;
        margin-bottom: 40px;

        iframe{
            width: 100%;
            height: 26rem;
        }
    }
   
    .Title{
        padding-bottom:10px;
        margin-bottom:15px;
        text-align:start;
        h2{
            margin-bottom: 0px;
            font-weight:300;
        }
        border-bottom:1px solid ${props=>props.theme.mainColor2};
    }

    .MainCont{
        
        .Sector3{
            font-size: 15px;
            padding-right:20px;
            width:35%;
            .menu{
                .menus{
                   cursor:pointer;
                   transition:all 0.3s ease;
                   display:flex;
                   align-items:center;
                   margin-bottom:30px;
                   &:hover{
                        color: ${props=>props.theme.mainColor2};
                    }
                    svg{
                        color: rgba(0,0,0,.7);
                        margin-right:15px;
                        font-size:24px;
                        width:10%;
                    }
                    span{
                        width:90%;
                    }
                }
            }
            @media (max-width:786px){
                width:100%;
            }
        }

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
                    margin-left: 20px;
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
                    &:hover{
                        transform: scale(1.1);
                    }
                }
                .insta{
                    &:hover{
                        background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
                    }
                }
                .facebook{
                    background: #0268e3;
                }
                .twitter{
                    background-color: rgb(29, 161, 242);
                }
                .youtube{
                    background-color: #f00;
                }
            }
    }
    
`