import React from 'react'
import { parseCookies, destroyCookie  } from 'nookies'
import { push } from "next/router"
import { MdLogout } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import { Popconfirm } from 'antd';
import styled from 'styled-components'
const text = 'Гарахдаа итгэлтэй байнуу?';

const CFRoot = () => {
    const { cf_username } = parseCookies();

    const confirm = () => {
        destroyCookie(null, 'cf_username')
        destroyCookie(null, 'cf_id')
        destroyCookie(null, 'cf_jwt')
        push(`/cf`)
    };

    return (
        <Container >
            <div className="container content">
                <div className="name">
                    <AiOutlineUser /> {cf_username}
                </div>
                <Popconfirm placement="bottomRight" title={text} onConfirm={confirm} okText="Тийм" cancelText="Үгүй">
                    <div className="logout">
                        <MdLogout />
                    </div>
                </Popconfirm>
            </div>
        </Container>
    )
}

export default CFRoot

const Container = styled.div`
    color:#fff;
    border-bottom:1px solid rgba(255,255,255,0.2);
    padding-top:8px;
    padding-bottom:8px;
    margin-bottom:10px;
    background-color:rgba(255,255,255,0.1);
    .content{
        display:flex;
        justify-content:space-between;
        .name{
            display:flex;
            align-items:center;
            gap:10px;
            font-weight:500;
            svg{
                color:rgba(255,255,255,1);
                font-size:20px;
            }
        }
        .logout{
            width:27px;;
            height:27px;;
            background-color:rgba(0,10,100, 0.057);
            border-radius:50%;
            display:flex;
            align-items:center;
            justify-content:center;
            svg{
                color:rgba(255,255,255,1);
                font-size:20px;
            }
            cursor:pointer;
        }
    }
`