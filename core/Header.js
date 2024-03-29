import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled,{ keyframes } from 'styled-components';
import Link from "next/link";
import LanguageDate from "@/miscs/LanguageDate"
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { RiArrowRightSLine, RiMailSendLine } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoBell } from "react-icons/go";
import minimize from "@/miscs/minimize";
import { parseCookies } from "nookies";
import nookies from 'nookies';
import axios from 'axios';

const Header = ({menu, logo, login}) => {
    const { id, jwt, role, username } = parseCookies();
    const router = useRouter();
    const headRef = useRef();
    const [ HeadColor, setHeadColor ] = useState(false);
    const [ leftMenu, setLeftMenu ] = useState(`100%`);
    const [ subMenus, setSubmenu ] = useState([]);
    const [ showSub, setshowSub ] = useState(`none`);
    const [ showSmMenu, setShowSmMenu ] = useState(false);
    const [ notf, setNotf ] = useState([]);
    const [ showNotf, setShowNotf ] = useState(false);

    React.useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousedown", handleScroll2, false);
        window.addEventListener("mousedown", handleScrollNotf, false);
    },[])

    useEffect(()=>{
        if(id){
            FetchData();
            if(role === "infosystem_admin"){
                FetchUser();
                FetchFeedback();
            }
        }
    },[])

    const FetchData = async () =>{
           await axios.post(`${process.env.serverUrl}/graphql`, {
                query:`query {
                    user(id: ${id}){
                        id username  product_feedbacks{ id name
                            issue_answers(where:{ seen: false }, sort:"created_at:DESC"){
                                id seen created_at
                                user{ id }
                            }
                        }
                    }
                }` 
            },{ headers: {
                Authorization: `Bearer ${jwt}`
              } }).then(res=>{
                let arr = [];
                res.data.data.user.product_feedbacks.forEach(el=>{
                    if(el.issue_answers?.length){arr.push(el) }
                })
                setNotf(arr);
            })
    }

    const FetchUser = async () =>{
        await axios.post(`${process.env.serverUrl}/graphql`, {
            query: `query { users(where:{ seen: false }, sort:"created_at:DESC"){ id username email confirmed company_name admin_confirmed company_register created_at
                products{ id title }
            }}`
        }, { headers: { Authorization: `Bearer ${jwt}` } }).then(res => {
            // setUserNotif(res.data.data?.users);
            setNotf(prev=> [ ...prev, ...res.data.data?.users]);
        })
    }

    const FetchFeedback = async () =>{
        await axios.post(`${process.env.serverUrl}/graphql`, {
            query: `query{ productFeedbacks(where:{ seen: false }, sort:"created_at:DESC"){ id name created_at } }`
        }, { headers: { Authorization: `Bearer ${jwt}` } }).then(res => {
            setNotf(prev=> [ ...prev, ...res.data.data?.productFeedbacks]);
        })
    }

    const LogOut = () =>{
        nookies.destroy(null, 'jwt');
        nookies.destroy(null, 'username');
        nookies.destroy(null, 'role');
        nookies.destroy(null, 'id');
        nookies.destroy(null, 'email');
        router.reload(router.asPath);
    }

    const handleScrollNotf = (e) => {
        if(!e.target.classList.value.includes("BellChild")){
            setShowNotf(false);
        }
    }

    const handleScroll2 = (e) => {
        if(!e.target.classList.value.includes("dropDown")){
            setShowSmMenu(false);
        }
    }

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
        return
    }

    const SeenHandle = (el) =>{
        el.forEach(item=>{
            axios.put(`${process.env.serverUrl}/issue-answers/${item.id}`, { seen:true },{ headers:{
               Authorization:`bearer ${jwt}`
           }})
        })
    }

    const SeenUserHandle = (el) =>{
        axios.put(`${process.env.serverUrl}/users/${el.id}`, { seen:true },{ headers:{
            Authorization:`bearer ${jwt}`
        }})
    }

    const SeenFeedback = (el) =>{
        axios.put(`${process.env.serverUrl}/product-feedbacks/${el.id}`, { seen:true },{ headers:{
            Authorization:`bearer ${jwt}`
        }})
    }

    return (
        <Container style={
            router.asPath==="/" || router.asPath==="/login"
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
                    <a className={`imgPar ${role==="infosystem_admin"?`B22`:``}`}>
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
                                        <div onClick={()=>MenuHandle(`100%`)} onMouseOver={el.submenu.length?()=>OnMouseOverHandle(el.submenu):()=>setshowSub(`none`)} onMouseLeave={()=>setshowSub(`none`)}
                                         className={`items ${login?`A2`:``}`}>
                                            {el.name}
                                           {el.submenu.length?<FiChevronDown />:null} 
                                        </div>
                                    </a>
                                </Link>
                            )  
                        })}
                    </div>
                    <div className="Menu B2">

                        {username?
                             <div className="BellPar content Bell">
                                <div onClick={()=>setShowNotf(prev=>!prev)} tooltip={notf.length}
                                style={showNotf?{color:"#fff"}:{color:`rgba(255,255,255,.65)`}}
                                className={`BellPar items Alert ${notf.length?``:`Alert2`} ${login?`A2`:``}`}>
                                    <GoBell className="BellPar" />
                                </div>
                                
                                {showNotf&&notf.length?<div className="notify BellChild">
                                    {notf.map((el,ind)=>{
                                        return(
                                            <Link key={ind} href={!el.email?el.issue_answers?`/feedback/answer/${el.id}`:`/admin/care`:`/admin/users`}>
                                                <a onClick={()=>!el.email?el.issue_answers?SeenHandle(el.issue_answers):SeenFeedback(el):SeenUserHandle(el)} className="Itemss BellChild">
                                                    <div className="svgs BellChild"><RiMailSendLine /></div>
                                                    {!el.email?el.issue_answers?<div className="textPar BellChild">
                                                        <div className="par BellChild">{el.name}</div>
                                                        <div className="childs BellChild">Хариулсан байна <span><BiMessage />{el.issue_answers?.length}</span> </div>
                                                        <div className="date BellChild">{LanguageDate(el.issue_answers[0]?.created_at)} - өмнө</div>
                                                    </div>
                                                    :<div className="textPar BellChild">
                                                        <div className="par BellChild">{el.name}</div>
                                                        <div className="childs BellChild">Тусламж хүсэлтийн зөвшөөрөл хүссэн <span><BiMessage />1</span> </div>
                                                        <div className="date BellChild">{LanguageDate(el.created_at)} - өмнө</div>
                                                    </div>
                                                    :<div className="textPar BellChild">
                                                        <div className="par BellChild">{el.email}</div>
                                                        <div className="childs BellChild">Шинэ бүртгэл
                                                        </div>
                                                        <div className="date BellChild">{LanguageDate(el.created_at)} - өмнө</div>
                                                    </div>}
                                                </a>
                                            </Link>
                                        )
                                    })}
                                </div>:null}

                            </div>
                        :null}


                        {/* <Link href={username?"/feedback":"/login"}> */}
                        <Link href="/feedback">
                             <a className="content">
                                <div className={`items ${login?`A2`:``}`}>
                                    Тусламж
                                </div>
                            </a>
                        </Link>

                        {!username?<Link href={"/login"}>
                             <a className="content">
                                <div className={`items ${login?`A2`:``}`}>
                                    Нэвтрэх
                                </div>
                            </a>
                        </Link>

                        :<div  className="content Login">
                            <div style={showSmMenu?{color:"#fff"}:{color:`rgba(255,255,255,.65)`}} onClick={()=>setShowSmMenu(prev=>!prev)} className={`items ${login?`A2`:``}`}>
                                {username}
                                <TiArrowSortedDown />
                            </div>
                            {showSmMenu?<div className="showMenu">
                                <div onClick={LogOut} className="dropDown">
                                    Гарах <RiArrowRightSLine />
                                </div>
                            </div>:null}
                        </div>}
                        

                    </div>
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

// const anime3D = keyframes`
//     0%{ transform: perspective(600px) rotateX(-30deg); opacity:0 }
//     100%{ transform: perspective(0px) rotateX(0deg); opacity:1 }
// `

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
        animation: ${anime2} 1s ease;
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
            animation: ${anime} 0.250s ease;
            background-color:#fff;
            .subDivChild{
                margin-top:30px;
                display:flex;
                justify-content:space-between;
                padding:40px 30px;
                .contents{
                    text-decoration:none;
                    width:18%;
                    &:hover{
                        .titles{
                            color: ${props=>props.theme.mainColor2};
                        }
                    }
                    img{
                        width:100%;
                        height:7rem;
                        object-fit:cover;
                    }
                    .titles{
                        margin-top:8px;
                        font-size:14px;
                        font-family:${props=>props.theme.fontFamily};
                    }
                }
            }
        }
        @media (max-width:768px){
            display: none !important;
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
            position: relative;
            z-index: 2;
            width:170px;
            .logo{
                width:100%;
                height:auto;
                object-fit:contain;
                vertical-align: middle;
            }
            
        }
        .B22{
            position: relative;
            z-index: 2;
            &:before{
                z-index:0;
                font-size: 12px;
                content: "admin";
                position: absolute;
                right: -25%;
                color: white;
                top: -20%;
                ${props=>props.theme.BoldFont}
                padding: 2px 10px;
                letter-spacing: 0.2px;
                border-radius: 3px;
            }
        }
        .mobileMenu{
            display:none;
        }
        .ghost{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width:90%;
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
                        transition: color .25s ease;
                        margin: 0px 20px;
                        position: relative;
                        cursor: pointer;
                        font-size:1rem;
                        font-family:${props=>props.theme.fontFamily};
                        
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
                  
                    .A2{
                        font-size:0.97rem;
                        color: rgba(255,255,255,1);
                    }
                }
                .Bell{
                    position: relative;
                    .Alert{
                        position: relative;
                        &:before{
                            content: attr(tooltip);
                            position: absolute;
                            top: -40%;
                            right: -40%;
                            z-index: 333;
                            font-size: 12px;
                            background-color: red;
                            color: #ffffff;
                            width: 18px;
                            height: 18px;
                            ${props=>props.theme.BoldFont}
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        }
                    }
                    .Alert2{
                        &:before{
                            display: none;
                        }
                    }
                    .notify{
                        width: 340px;
                        background-color: #fff;
                        position: absolute;
                        top:130%;
                        right: 0;
                        padding: 12px 12px;
                        max-height: 80vh;
                        overflow-y: scroll;
                        border-radius: 5px;
                        box-shadow:1px 1px 20px -10px;
                        animation: ${anime} 0.3s ease;
                        ::-webkit-scrollbar {
                            width: 0px;
                            height: 0px;
                        }
                        .Itemss{
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            gap: 14px;
                            margin:8px 0px;
                            padding:8px 0px;
                            text-decoration: none;
                            &:hover{
                                background-color: ${props=>props.theme.mainColor4};
                            }
                            .svgs{
                                width: 42px;
                                height: 42px;
                                background-color: ${props=>props.theme.mainColor4};
                                border-radius: 50%;
                                padding: 10px 10px;
                                svg{
                                    font-size: 20px;
                                    color: rgba(0,0,0,0.6);
                                }
                            }
                            
                            .textPar{
                                width: 100%;
                                .par{
                                    line-height: 100%;
                                    font-size: 15px;
                                    ${props=>props.theme.BoldFont}
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    width: 210px;
                                }
                                .childs{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    
                                    span{
                                        color: rgba(0,0,0,0.7);
                                        display: flex;
                                        align-items: center;
                                        gap: 6px;
                                        font-size: 15px;
                                        ${props=>props.theme.BoldFont}
                                        svg{
                                            margin-bottom: -2px;
                                            font-size: 15px;
                                        }
                                    }
                                }
                                .date{
                                    color: ${props=>props.theme.mainColor2};
                                }
                            }
                            
                        }
                    }
                }
            }
            .B2{
                .Login{
                    position: relative;
                    .showMenu{
                        border-radius: 3px;
                        position: absolute;
                        width: 10em;
                        padding: 8px 16px;
                        top: 130%;
                        right: 0;
                        background-color: #ffffff;
                        box-shadow:1px 1px 20px -10px;
                        animation: ${anime} 0.5s ease;
                        .dropDown{
                            padding: 3px 5px;
                            cursor: pointer;
                            font-size: 15px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            svg{
                                font-size: 20px;
                            }
                            &:hover{
                                background-color: #DCDCDC;
                            }
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
                        ${props=>props.theme.BoldFont}
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
                align-items:flex-end;
                justify-content: flex-end;
                flex-direction: column;
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
                            color: #666666 !important;
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
