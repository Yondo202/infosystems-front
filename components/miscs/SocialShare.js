import React from 'react'
import styled from 'styled-components'
// import minimize from "@/miscs/minimize"
// import Head from 'next/head';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import {FacebookShareButton,TwitterShareButton, LinkedinShareButton, PinterestShareButton, EmailShareButton } from 'react-share';

const SocialShare = ({ news }) => {
    // let path = window.location.origin + '/product/' + news.slug
    // console.log(`path`, path);
    return (
        <>
            <Container className={`Icons `}>
                <div className= {`Buttons`}>
                    <FacebookShareButton resetButtonStyle={true} url={process.env.frontUrl+process.env.productUrl+news.slug} style={{ width: 50, height: 50 }} >
                        <div className="Btnss facebook"><FaFacebookF /></div>
                    </FacebookShareButton>
                    <TwitterShareButton resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.productUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                    <div className="Btnss twitter"><FaTwitter /></div>
                    </TwitterShareButton>
                    <PinterestShareButton resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.productUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                        <div className="Btnss FaPinterestP"><FaPinterestP /></div>
                    </PinterestShareButton>
                    <LinkedinShareButton resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.productUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                        <div className="Btnss FaLinkedinIn"><FaLinkedinIn /></div>
                    </LinkedinShareButton>
                    <EmailShareButton resetButtonStyle={true} url={`${process.env.frontUrl}${process.env.productUrl}${news.slug}`} style={{ width: 50, height: 50 }} >
                        <div className="Btnss AiOutlineMail"><MdEmail /></div>
                    </EmailShareButton>
                </div>
            </Container>
        </>
    )
}

export default SocialShare

const Container = styled.div`
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
    
`
