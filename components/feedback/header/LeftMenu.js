import React, { useEffect, useState , useContext} from 'react'
import Context from "@/core/context/Context"
import styled from 'styled-components'
import { IoMdArrowDropright } from "react-icons/io"
import axios from "axios"
import Link from "next/link"
import { parseCookies } from "nookies"
import Router from "next/router"

const LeftMenu = () => {
    const { id, jwt, role } = parseCookies(); 
    const ctx = useContext(Context);
    const [ Menu, setMenu ] = useState([]);
    useEffect(()=>{
        Go();
    },[])

    const Go = async () =>{
        if(role==="infosystem_admin"){
            await axios.post(`${process.env.serverUrl}/graphql`, { query:`query{ products{ id title slug }  } `}).then(res=>{
                setMenu(res.data.data.products);
            })
        }else{
            await axios.post(`${process.env.serverUrl}/graphql`, {
                query: `query { users(where:{ id: "${id}" }, sort:"created_at:DESC"){ id username email confirmed company_name admin_confirmed company_register created_at
                    products{ id title slug }
                } }`
            }, { headers: { Authorization: `Bearer ${jwt}` } }).then(res => { 
                setMenu(res.data.data.users[0]?.products);
                if(res.data.data.users[0]?.products.length){
                    if(!Router.pathname.includes('/answer') && !Router.pathname.includes('/search')){
                        Router.push(`/feedback/${res.data.data.users[0]?.products[0]?.id}`);
                    }
                }
            })
        }
    }

    return (
        <LeftMenuComponent className="leftMenu">
            <div className="Title">Бүтээгдэхүүн</div>
            {Menu.map((el,ind)=>{
                return(
                    <Link key={ind} href={`/feedback/${el.id}`}>
                        <a onClick={()=>ctx.TargetProduct(el)} className={`Contents ${ctx.Product.id===el.id?`Active`:``}`}>
                            <div className="svg"><IoMdArrowDropright /></div>
                            <div className="text">{el.title}</div>
                        </a>
                    </Link>
                    
                )
            })}
        </LeftMenuComponent>
    )
}

export default LeftMenu


const LeftMenuComponent = styled.div`
        box-shadow:1px 1px 30px -20px;
        font-size:14px;
        background-color:#fff;
        color:#333;
        width:25%;
        height:80vh;
        border:1px solid rgba(0,0,0,.2);
        padding:30px 20px;
        padding-top:10px;
        .Title{
            font-size:16px;
            font-weight:600;
            color:#7B7B7B;
            border-bottom:1px solid rgba(0,0,0,0.2);
            padding-bottom:20px;
            margin-bottom:15px;
        }
        .Contents{
            text-decoration:none;
            cursor:pointer;
            margin-top:22px;
            margin-bottom:22px;
            display:flex;
            align-items:center;
            color:rgba(${props=>props.theme.textColor},0.8);
            .text{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width:100%;
            }
            &:hover{
                color:rgba(${props=>props.theme.textColor},1);
            }
            .svg{
                width:30px;
                height:30px;
                svg{
                    margin-bottom:-6px;
                    color:rgba(${props=>props.theme.textColor},0.9);
                    font-size:22px;
                    margin-right:3px;
                }
            }
        }
        .Active{
            border-radius:3px;
            // background-color:rgba(20,110,190,1);
            background-color:${props=>props.theme.mainColor2};
            color:white;
            font-weight:600;
            &:hover{
                color:#fff;
            }
            .svg{
                svg{
                    color:#fff;
                }
            }
        }
`