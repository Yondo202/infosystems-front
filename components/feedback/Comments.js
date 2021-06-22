import React from 'react'
import styled from 'styled-components'
import { FaUserTie } from "react-icons/fa"
import HtmlParser from "@/miscs/CustomParser2"

const Comments = ({ datas }) => {
    console.log(`datas`, datas);
    return (
        <Container>
            <div className="userProfile">
               <div className="profileImg"><FaUserTie /></div> 
            </div>

            <div className="ContentPar">
                <div className="header">
                    <div className="name">Баатарсайхан</div>
                    <div className="date">2016-07-05</div>
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
            background-color: #e9edf1;
            display: flex;
            gap: 15px;
            padding: 10px 15px;
            color: #586069;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            border-radius: 8px;
            .name{
                font-weight: 500;
                color: #24292e;
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