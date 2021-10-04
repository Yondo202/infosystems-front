import React from 'react'
import HtmlParser from "@/miscs/CustomParser"
import styled from 'styled-components'
import minimize from "@/miscs/minimize"
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import {FacebookShareButton,TwitterShareButton, LinkedinShareButton, PinterestShareButton, EmailShareButton } from 'react-share';

const ContentSector = ({news}) => {

    return (
        <Container className="MainContent">
            <h2 className="title">{news.title}</h2>

            <div className="Image">
                <img src={process.env.serverUrl+news.image.url} className="myImg"></img>
            </div>

            <div className="ContentSection">
                <div className={`Icons `}>
                    <div className= {`Buttons`}>
                        <FacebookShareButton
                            media={process.env.serverUrl+news.image.url}
                            imageurl={process.env.serverUrl+news.image.url}
                            resetButtonStyle={true}
                            url={`${process.env.frontUrl}${process.env.postUrl}${news.slug}`}
                            // url="https://infosystems.mn/posts/bayar-naadmyn-dr-ded-azhillah-azhilchdyn-ners-holbogdoh-utas"
                        style={{ width: 50, height: 50 }} >
                            <div className="Btnss facebook"><FaFacebookF /></div>
                        </FacebookShareButton>

                        <TwitterShareButton media={minimize(news.image,"small")} resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.postUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                            <div className="Btnss twitter"><FaTwitter /></div>
                        </TwitterShareButton>

                        <PinterestShareButton media={minimize(news.image,"small")} resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.postUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                            <div className="Btnss FaPinterestP"><FaPinterestP /></div>
                        </PinterestShareButton>

                        <LinkedinShareButton media={minimize(news.image,"small")} resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.postUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                            <div className="Btnss FaLinkedinIn"><FaLinkedinIn /></div>
                        </LinkedinShareButton>

                        <EmailShareButton media={minimize(news.image,"small")} resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.postUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                            <div className="Btnss AiOutlineMail"><MdEmail /></div>
                        </EmailShareButton>
                    </div>
                </div>

                <div className="content">
                    <HtmlParser data={news.description}/>
                </div>
            </div>
        </Container>
    )
}

export default ContentSector

const Container = styled.div`
    width: 99%;
    .title{
        font-weight: 400;
    }
    .ContentSection{
        position: relative;
        display:flex;
        justify-content:space-between;
        padding:20px 0px;
        font-family:"Roboto", sans-serif;
        font-weight:500;
        
        .Icons{
           position: sticky;
           width: 8%;
           height:100% !important;
           position: -webkit-sticky;
           top:90px;
           .Buttons{
               display:flex;
               flex-direction:column;
               button{
                    margin-bottom:9px;
                    .Btnss{
                        border-radius:50%;
                        color:#ffffff;
                        font-size:12px;
                        width:38px;
                        height:38px;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        svg{
                            transition:all 0.2s ease;
                            font-size:15px;
                        }
                        &:hover{
                            svg{
                                transform:scale(1.3);
                            }
                        }
                    }
                    .FaPinterestP{
                        background: #cb2027;
                    }
                    .FaLinkedinIn{
                        background: #069;
                    }
                    .facebook{
                        background: #3b5998;
                    }
                    .twitter{
                        background-color: rgb(29, 161, 242);
                    }
                    .AiOutlineMail{
                        font-size:14px;
                        background-color: #bbb;
                    }
               }
           }
           
        }
        .fixed{
            position:sticky;
            position: -webkit-sticky;
            top:90px;
                /* margin-top:60px; */
            /* left:65px; */
        }
        .content{
            width:91%;
            font-size: 15px;
            font-weight:400;
        }
        img{
            width:100%;
        }
        @media (max-width:768px){
            flex-direction:column-reverse;
            .Icons{
                margin-top:25px;
                .Buttons{
                    flex-direction:row;
                    justify-content:space-between;
                    gap:30px;
                }
            }
        }
    }
    .Image{
        margin-bottom: 20px;
        .myImg{
            width: 100%;
        }
    }


`
