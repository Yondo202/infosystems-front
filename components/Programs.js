import React, { useEffect } from 'react'
import styled, { keyframes } from "styled-components"
import { ImFileZip } from "react-icons/im"
import { FaDownload } from "react-icons/fa"
import Others from "@/components/posts/Other"
import axios from 'axios'
import FileDownload from "js-file-download"

const Programs = ({ data }) => {
    const DownloadHandle= (el) =>{
        axios({
            url: `${process.env.serverUrl}${el.url}`,
            method: 'GET',
            responseType: 'blob', // Important
        }).then((response) => {
            FileDownload(response.data, el.name);
        });
    }

    return (
        <Container>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-12">
                        <div className="Title">
                            <h2>{data?.name}</h2>
                        </div>
                        <div className="contentPar">
                            <div className="rows header">
                                <div className="cat">Төрөл</div>
                                <div className="name">Файлын нэр</div>
                                <div className="download"></div>
                            </div>
                            {data?.file.map((el,ind)=>{
                                return(
                                    <div key={ind} className="rows items">
                                        <div className="cat"><ImFileZip /></div>
                                        <div className="name">{el.name}</div>
                                        <div className="download">
                                            <button onClick={()=>DownloadHandle(el.files)} className="button"><FaDownload /> Татах</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-3 col-12">
                        <Others />
                    </div>
                </div>
                
            </div>
        </Container>
    )
}

export default Programs

const animate = keyframes`
    0%{ opacity:0; transform:translateY(20px); }
    100%{ opacity:1; transform:translateY(0px); }
`

const Container = styled.div`
    animation: ${animate} 1s ease;
    padding-top:6rem;
    margin-bottom: 12em;
    font-size: 14px;
    .contentPar{
        /* border:1px solid rgba(0,0,0,0.2); */
        margin-bottom: 30px;
        .rows{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
            padding: 15px 20px;
            border-bottom: 1px solid rgba(0,0,0,0.2); 
            &:first-child{
                border-top: 1px solid rgba(0,0,0,0.2);
            }
            .cat{
                width: 20%;
            }
            .name{
                width: 50%;
            }
            .download{
                width: 20%;
            }
            @media (max-width:768px){
                .cat{
                    width: 10%;
                }
                .name{
                    width: 40%;
                }
                .download{
                    width: 40%;
                }
            }
            .button{
                cursor: pointer;
                text-decoration: none;
                background-color: ${props=>props.theme.mainColor2};
                border-style: none;
                padding: 5px 0px;
                width: 100%;
                color: #ffffff;
                letter-spacing: 0.5px;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                svg{
                    margin-right: 14px;
                    font-size: 15px;
                }
                &:hover{
                    opacity: 0.8;
                }
            }
        }
        .header{
            font-weight: 500;
            background-color: ${props=>props.theme.mainColor4};
        }
        .items{
            svg{
                opacity: 0.8;
                font-size:21px;
            }
        }
    }
    .Title{
        padding-bottom:10px;
        margin-bottom:30px;
        text-align:start;
        h2{
            margin-bottom: 0px;
            font-weight:300;
        }
        border-bottom:1px solid ${props=>props.theme.mainColor2};
        
    }
`