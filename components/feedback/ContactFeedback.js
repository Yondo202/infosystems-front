import React, { useState } from 'react'
import styled from "styled-components"
import { InputStyle } from "@/miscs/CustomStyle"
import { GrSend } from "react-icons/gr"
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import axios from 'axios'

const ContactReport = () => {
    const [ showErr, setShowErr ] = useState(`0`);
    const [ Loading, setLoading ] = useState(false);
    const [ alertShow, setAlertShow ] = useState({ color: "#0071ce", text:"Амжилттай илгээгдлээ", cond:false, });

    const ClickHandle = (e) =>{
        e.preventDefault();
        let inp = document.querySelectorAll('.getInp'); let arr = Array.from(inp); let final = {};
        arr.forEach(el=>{
            if(el.value===""){
                el.classList += " red";
            }else{
                el.classList =- " red";
                el.classList += " getInp";
                final[el.name] = el.value;
            }
        });
        let keys = Object.keys(final).length;
        console.log(`final`, final);

        if(keys < 3){
            setShowErr(`1`); setTimeout(() => {  setShowErr(`0`);  }, 4000)
        }else{
            setLoading(true);
            axios.post(`${process.env.serverUrl}/infosystem-reports`, final).then(res=>{
                console.log(`res`, res);
                setLoading(false);
                setAlertShow({ color: "#0071ce",  text:"Амжилттай илгээгдлээ", cond:true, }); 
                setTimeout(() => {setAlertShow({ cond:false, }); }, 4000);
                e.target.reset();
            }).catch(_=>{
                setLoading(false);
                setAlertShow({ color: "#f56c73",  text:"Алдаа гарлаа", cond:true, }); 
                setTimeout(() => {setAlertShow({ cond:false, }); }, 4000);
            })
            setTimeout(() => {
                setLoading(false); 
            }, 5000)
        }
    }
    // infosystem-reports
    return (
        <Container>
            <form onSubmit={ClickHandle}>
                <InputStyle >
                    <div className="label">Таны И-Мэйл хаяг</div>
                    <input className="getInp" name="email" type="email" required />
                </InputStyle>

                <InputStyle >
                    <div className="label">Таны нэр</div>
                    <input className="getInp" name="name" type="text"  />
                </InputStyle>

                <InputStyle >
                    <div className="label">Таны Санал хүсэлт</div>
                    <textarea className="getInp" name="description"  />
                </InputStyle>

               <div className="buttonPar">
                    <div style={{transform:`scale(${showErr})`, opacity:showErr}} className="errText">Мэдээллээ гүйцэд оруулна уу</div>
                    <button className="button">Илгээх <GrSend /></button>
               </div>
            </form>
            {Loading&&<div className="Loading">
                <img src="/giff2.gif" />
            </div>}

            <div style={alertShow.cond?{right:`0%`, borderBottom:`2px solid ${alertShow.color}`}:{right:`-100%`}} className="Alert">
                <IoCheckmarkCircleOutline color={alertShow.color} />
                <div className="text">{alertShow.text}</div>
            </div>

        </Container>
    )
}

export default ContactReport


const Container = styled.div`
    width:50%;
    position:relative;
    
    .Alert{
        transition:all 0.8s ease;
        position:fixed;
        top:100px;
        right:0%;
        background-color:#fff;
        box-shadow:1px 1px 20px -8px;
        display:flex;
        align-items:center;
        gap:16px;
        padding:16px 18px;
        width:280px;
        border-radius:4px;
        border-bottom:2px solid ${props=>props.theme.mainColor2};
        svg{
            font-size:22px;
        }
        .text{
            font-size:16px;
        }
    }
    .Loading{
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;
        background-color:rgba(255,255,255, 0.5);
        display:flex;
        align-items:center;
        justify-content:center;
        img{
            margin-top:-3rem;
            transform:scale(0.8);
        }
    }
    .buttonPar{
        margin-top:30px;
        display:flex;
        justify-content:space-between;
        .errText{
            background-color: #f6c343;
            transition:all 0.4s ease;
            border-radius:5px;
            font-size:15px !important;
            font-weight:400;
            color:black !important;
            line-height:34px;
            padding:0px 20px;
        }
        .button{
            color:white;
            border-style:none;
            background-color:${props=>props.theme.mainColor2};
            padding:5px 35px;
            font-size:15px;
            border-radius:5px;
            letter-spacing:0.5px;
            border:1px solid #fff;
            svg{
                font-size:18px;
                margin-left:10px;
                path{
                    stroke: rgba(255,255,255,0.9);
                }
            }
        }
    }
    @media (max-width:768px){
        width:100%;
        .buttonPar{
            margin-top:10px;
            flex-direction:column;
            .errText{
                margin-bottom:10px;
            }
        }
    }
`
