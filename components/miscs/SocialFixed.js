import React from 'react';
import styled from 'styled-components';
import {TiSocialFacebook} from 'react-icons/ti'
import {FaInstagram, FaTwitter, FaLinkedinIn} from 'react-icons/fa'
import {FacebookShareButton, TwitterShareButton, LinkedinShareButton} from 'react-share'
import Head from 'next/head';

const SocialFixed = ({title, description, thumb, url}) => {
    let path = window.location.origin + '/product/' + url
    return (
        <>
        <Head>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description}/>}
            {url && <meta property="og:url" content={path} />}
            <meta property="og:type" content="article" />
            {title && <meta property="og:title" content={title} />}
            {description && <meta property="og:description" content={description} />}
            {thumb && <meta property="og:image" content={thumb} />}
        </Head>
        <Wrapper>
            <FacebookShareButton url={path}>
                <div className="icons">
                    <TiSocialFacebook/>
                </div>
            </FacebookShareButton>
            
            <TwitterShareButton url={path}>
                <div className="icons">
                    <FaTwitter/>
                </div>
            </TwitterShareButton>
            
            <LinkedinShareButton url={path}>
                <div className="icons">
                    <FaLinkedinIn/>
                </div>
            </LinkedinShareButton>
            
        </Wrapper>
        </>
    );
};


export default SocialFixed;

const Wrapper = styled.div `
    margin-left:-75px;
    position:fixed;
    display:flex;
    flex-direction:column;
    .icons{
        text-align:center;
        line-height:42px;
        background:black;
        color:white;
        height:42px;
        width:42px;
        border-radius:100%;
        box-shadow:6px 6px 10px rgba(0,0,0,.08);
        transition:0.2s ease;
        margin-bottom:20px;
        font-size: ${props=>props.theme.fontSizeMedium};
        &:hover{
            cursor:pointer;
        }
    }
    @media only screen and (max-width: 768px){
        position: unset !important;
        flex-direction:row-reverse !important;
        margin-left:unset !important;
        .icons{
            margin-left:15px;
            font-size: ${props=>props.theme.fontSize};
            height:30px;
            width:30px;
            line-height:30px;
        }
    }
`