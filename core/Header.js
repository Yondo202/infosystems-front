import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components';
import Link from "next/link"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { IoCloseSharp } from "react-icons/io5"

const Header = ({menu, logo}) => {
    const router = useRouter()
    const headRef = useRef();
    const [ HeadColor, setHeadColor ] = useState(false);
    const [ leftMenu, setLeftMenu ] = useState(`100%`);

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

    return (
        <Container style={router.asPath==="/"
            ?HeadColor
            ?{backgroundColor:`rgba(37,41,45,.9)`}
            :{backgroundColor:`rgba(0,0,0,0)`}
            :{backgroundColor:`rgba(37,41,45,.9)`}}
        >
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
                                        <div onClick={()=>MenuHandle(`100%`)} className="items">{el.name}</div>
                                    </a>
                                </Link>
                            )  
                        })}
                    </div>
                </div>

                <div className="smMenu">
                    
                </div>
            </div>

        </Container>
    )
}

export default Header

const Container = styled.div`
    transition:all 0.3s ease;
    position:fixed;
    top:0;
    left:0;
    z-index:5;
    width:100%;
    .Parent{
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
                        transition:all 0.3s ease;
                        color: rgba(255,255,255,.65);
                        -webkit-transition: color .25s ease;
                        -o-transition: color .25s ease;
                        transition: color .25s ease;
                        padding: 0px 20px;
                        // line-height: 20px;
                        position: relative;
                        // display: inline-block;
                        cursor: pointer;
                        font-size:1rem;
                        font-weight:400;
                        &:first-child{
                            padding-left:0px;
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
                        padding: 0px 30px;
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
