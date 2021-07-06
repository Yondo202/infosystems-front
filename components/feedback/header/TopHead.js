import React,{ useContext, useState } from 'react'
import styled from 'styled-components'
import { FaFilter } from "react-icons/fa"
import { BiSearchAlt } from "react-icons/bi"
import Context from "@/core/context/Context"
import Router from "next/router"

const TopHead = () => {
    const ctx = useContext(Context);
    const [ search, setSearch ] = useState('');

    const HandleSubmit = (e) =>{
        e.preventDefault();
        if(search){
            Router.push(`/feedback/search/${search}`);
        }
    }

    return (
        <Header className="Header">
            <div className="container-xxl Parent">
                <div className="FirstParent">
                    <div className="filter">
                        <FaFilter />
                        <span>Шүүлтүүр</span>
                    </div>
                    {ctx.Product?.title?<div className="TargetFilter">{ctx.Product?.title}</div>:null}
                </div>

                <form onSubmit={HandleSubmit} className="searchPar">
                    <input value={search} onChange={e=>setSearch(e.target.value)} className="myInp" placeholder="Хайх..." type="text" />
                    <BiSearchAlt />
                </form>
            </div>
        </Header>
    )
}

export default TopHead

const Header = styled.div`
    margin-top: 76.28px;
    font-family:${props=>props.theme.fontFamily2};
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 25%);
    height: 50px;
    color:#969696;
    display:flex;
    align-items:center;
    font-size:13px;
    margin-bottom:30px;
    .Parent{
        display:flex;
        justify-content:space-between;
        align-items:center;
        .searchPar{
            position:relative;
            width:25%;
            color:#7B7B7B;;
            &:hover{
                svg{
                    color:#21659f;
                }
            }
            .myInp{
                transition:all 0.3s ease;
                background-color:white;
                width:100%;
                border:1px solid rgba(0,0,0,.4);
                padding:6px 20px;
                padding-right:40px;
                border-radius:50px;
                font-weight: 500;
                &:hover{
                    border:1px solid rgba(33, 101, 159, 0.4);
                }
                &:focus{
                    border:1px solid #21659f;
                    outline-width: 0;
                }
            }
            svg{
                transition:all 0.3s ease;
                position:absolute;
                font-size:20px;
                top:20%;
                right:10px;
            }
        }
        .FirstParent{
            display:flex;
            align-items:center;
            gap:40px;
            .filter{
                cursor:pointer;
                display:flex;
                align-items:center;
                gap:8px;
                font-size:15px;
                svg{
                    font-size:18px;
                }
            }
            .TargetFilter{
                color:rgba(${props=>props.theme.textColor},0.9);
                border:1px solid rgba(0,0,0,0.2);
                padding:4px 20px;
                border-radius:50px;
            }
        }
    }
`