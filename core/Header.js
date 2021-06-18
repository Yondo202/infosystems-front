import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styled,{ keyframes } from 'styled-components';
import Link from "next/link"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { IoCloseSharp } from "react-icons/io5"
import { FiChevronDown } from "react-icons/fi"
import minimize from "@/miscs/minimize"

const Header = ({menu, logo}) => {
    const router = useRouter()
    const headRef = useRef();
    const [ HeadColor, setHeadColor ] = useState(false);
    const [ leftMenu, setLeftMenu ] = useState(`100%`);
    const [ subMenus, setSubmenu ] = useState([]);
    const [ showSub, setshowSub ] = useState(`none`);

    React.useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
    },[])

    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setHeadColor(true)
        }else {
            setHeadColor(false);
        }
    }

    const MenuHandle = (el) =>{
        setLeftMenu(el);
    }

    const OnMouseOverHandle = (el) =>{
        setshowSub(`block`);
        setSubmenu(el);
    }

    return (
        <Container style={router.asPath==="/"
            ?HeadColor
            ?{backgroundColor:`rgba(37,41,45,.9)`}
            :{backgroundColor:`rgba(0,0,0,0)`}
            :{backgroundColor:`rgba(37,41,45,.9)`}}
        >

            <div onMouseOver={()=>OnMouseOverHandle(subMenus)} onMouseLeave={()=>setshowSub(`none`)} style={{display:showSub}} className="Submenu">
                <div className="subDiv">
                    <div  className="subDivChild container-xxl">
                        {subMenus.map((el,ind)=>{
                            return(
                                <Link  key={ind} href={el.catigory==="Бүтээгдэхүүн" 
                                    ? `${process.env.frontUrl+process.env.productUrl+el.slug}`:
                                    `${process.env.frontUrl+process.env.postUrl+el.slug}`}>
                                    <a onClick={()=>setshowSub(`none`)} className="contents">
                                        <img src={minimize(el.image, "small")} />
                                        <div className="titles">{el.name}</div>
                                    </a>
                                </Link>
                                
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className={`container-xxl Parent ${HeadColor?`ToBottom`:``}`}>
                <Link href="/">
                    <a className="imgPar">
                        <img className="logo" src={process.env.serverUrl + logo?.url} alt="infosystem" />
                    </a>
                </Link>
                <div onClick={()=>MenuHandle(`0`)} className="mobileMenu"> <HiOutlineMenuAlt3 /> </div>
                <div ref={headRef} className="ghost" style={{left:leftMenu}}>
                    <div className="Menu">
                        <div className="headerMobile">
                            <div ><IoCloseSharp  onClick={()=>MenuHandle(`100%`)} /> </div>
                        </div>
                        {menu.map((el, i)=>{
                            return(
                                <Link key={i} href={el.slug!=="/"&&el.slug?`${process.env.frontUrl+process.env.pageUrl+el.slug}`:`/`}>
                                    <a className="content">
                                        <div onClick={()=>MenuHandle(`100%`)} onMouseOver={el.submenu.length?()=>OnMouseOverHandle(el.submenu):console.log()} onMouseLeave={()=>setshowSub(`none`)} className="items">
                                            {el.name}
                                           {el.submenu.length?<FiChevronDown />:null} 
                                        </div>
                                    </a>
                                </Link>
                            )  
                        })}
                        
                    </div>
                </div>

                <div className="smMenu">
                    
                </div>
                
            </div>
            <div style={{display:showSub}} className="GhostBack" />
                 
        </Container>
    )
}

export default Header

const anime = keyframes`
    0%{ transform:translateY(20px); opacity:0 }
    100%{ transform:translateY(0px); opacity:1 }
`
const anime2 = keyframes`
    0%{ opacity:0 }
    30%{ opacity:0 }
    100%{ opacity:1 }
`


const Container = styled.div`
    transition:all 0.3s ease;
    position:fixed;
    top:0;
    left:0;
    z-index:5;
    width:100%;
    .GhostBack{
        animation: ${anime2} 1.2s ease;
        position:fixed;
        z-index:3;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.8);
    }
    .Submenu{
        z-index:6;
        position:absolute;
        top:100%;
        left:0;
        width:100%;
        margin-top:-30px;
        .subDiv{
            animation: ${anime} 0.7s ease;
            background-color:#fff;
            .subDivChild{
                margin-top:30px;
                display:flex;
                justify-content:space-between;
                padding:40px 30px;
                .contents{
                    text-decoration:none;
                    width:18%;
                    img{
                        width:100%;
                        height:7rem;
                        object-fit:cover;
                    }
                    .titles{
                        margin-top:8px;
                        font-size:15px;
                    }
                }
            }
        }
    }
    .Parent{
        position:relative;
        z-index:4;
        transition:all 0.3s ease;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding-top:16px;
        padding-bottom:16px;
        
        .imgPar{
            width:170px;
            .logo{
                width:100%;
                height:auto;
                object-fit:contain;
                vertical-align: middle;
            }
        }
        .mobileMenu{
            display:none;
        }
        .ghost{
            width:60%;
            .Menu{
                display:flex;
                
                .headerMobile{
                    display: none;
                }
                .content{
                    text-decoration: none;
                    .items{
                        display:flex;
                        align-items:center;
                        transition:all 0.3s ease;
                        color: rgba(255,255,255,.65);
                        -webkit-transition: color .25s ease;
                        -o-transition: color .25s ease;
                        transition: color .25s ease;
                        margin: 0px 20px;
                        // line-height: 20px;
                        position: relative;
                        // display: inline-block;
                        cursor: pointer;
                        font-size:1rem;
                        font-weight:400;
                        svg{
                            margin-left:2px;
                            font-size:20px;
                        }
                        &:first-child{
                            margin-left:0px;
                        }
                        &:hover{
                            color: rgba(255,255,255,1);
                        }
                        
                    }
                }
            }
        }
        
        .smMenu{

        }
    }
    .ToBottom{
        transition:all 0.3s ease;
        padding-top:10px;
        padding-bottom:10px;
        .imgPar{
            width:150px;
        }
        .ghost{
            .Menu{
                .content{
                    .items{
                        font-weight: 500;
                        transition:all 0.3s ease;
                        font-size:0.88rem;
                        margin: 0px 30px;
                    }
                }
            }
        }
    }
    @media (max-width:768px){
        .Parent{
            justify-content: space-between;
            .imgPar{
                width: 120px;
            }
            .smMenu{
                display: none;
            }
            .ghost{
                transition: all 0.3s ease;
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                z-index: 9999;
                background-color: rgba(0,0,0,0.6);
                display: flex;
                align-items:center;
                justify-content: flex-end;
                .Menu{
                    padding: 30px 15px;
                    width: 70%;
                    height: 100%;
                    flex-direction: column;
                    background-color: red;
                    background-color: #ffffff;
                    .headerMobile{
                        display: block;
                        padding: 12px 0px;
                        padding-bottom: 30px;
                        svg{
                            font-size: 30px;
                        }
                    }
                    .content{
                        margin: 15px 0px;
                        .items{
                            color: #666666;
                            svg{
                                display:none;
                            }
                        }
                    }
                }
            }
            .mobileMenu{
                color: #ffffff;
                display:block;
                svg{
                    font-size: 25px;
                }
            }
        }
      
    }
    
`
