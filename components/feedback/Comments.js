import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FaUserTie } from "react-icons/fa"
import HtmlParser from "@/miscs/CustomParser2"
import DateFormat from '../miscs/FormatDate'
import axios from 'axios'
import { parseCookies } from "nookies"

const Comments = ({ datas, parent }) => {
    
    useEffect(()=>{
        // if(!parent){
        //     FetchUser();
        // }
    },[])

    // const FetchUser = () =>{
    //     axios.get(`${process.env.serverUrl}/users?id=${datas.id}`,{ headers: {
    //         Authorization: `Bearer ${parseCookies().jwt}`
    //       } } ).then(res=>{
    //           console.log(`res`, res);
    //       })
    // }

    return (
        <Container>
            <div className="userProfile">
               <div className="profileImg"><FaUserTie /></div> 
            </div>
            <div className="ContentPar">
                <div className="header">
                    <div className="texts">
                        <div className="name">{datas.user?.username}</div>
                        <div className="date">{DateFormat(datas.created_at)}</div>
                    </div>
                    {parent&&<div className="Author">
                        Асуултын эзэн
                    </div>}
                </div>
                <div className="MainConent">
                    <HtmlParser data={datas.content} />
                </div>
            </div>
        </Container>
    )
}

export default Comments


const Container = styled.div`
    /* min-height: 10em; */
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    &:before{
        content: "";
        position: absolute;
        height: 30px;
        width: 3px;
        bottom: 0;
        left: 20%;
        margin-bottom: -30px;
        background-color: #e1e4e8;
    }
    .ContentPar{
        margin-left: 58px;
        position: relative;
        background-color: #ffffff;
        border:1px solid rgba(0,0,0,.2);
        border-radius: 8px;
        .MainConent{
            width: 100%;
            padding: 15px;
            overflow: visible;
            font-size: 14px;
        }
        .header{
            background-color: ${props=>props.theme.mainColor4};
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            color: #586069;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            border-radius: 8px 8px 0px 0px;
            .texts{
                gap: 15px;
                display: flex;
                .name{
                    font-weight: 500;
                    color: #24292e;
                }
            }
          .Author{
              border-radius: 50px;
              font-weight: 500;
              padding: 4px 15px;
              border: 1px solid rgba(0,0,0,0.1);
          }
        }
        &:before{
            content:"";
            position:absolute;
            top: 12px;
            left:-12px;
            background-color: #b3b3b3;
            width: 18px;
            height: 18px;
            clip-path: polygon(68% 0, 1% 50%, 68% 100%);
            z-index: 2;
        }
    }
    .userProfile{
        position: absolute;
        left: 0;
        top: 0;
        .profileImg{
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #d6e2ef;
            svg{
                color: #586069;
                font-size: 22px;
            }   
        }
        
    }
    
        
`