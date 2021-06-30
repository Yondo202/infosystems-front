import React,{useContext} from 'react'
import styled from 'styled-components'
import UserContext from '@/core/context/Context'
import { FaComments, FaUsers } from "react-icons/fa"
import Link from "next/link"

const LeftMenu = () => {
    const { logo } = useContext(UserContext);
    return (
        <LeftMenuStyle>
            <Link href="/">
                <a className="Header">
                    <img src={process.env.serverUrl+logo?.url} />
                </a>
            </Link>

            <div className="mainMenu">
                <div className="items"><FaComments /><span>Сэтгэгдэлүүд</span> </div>
                <div className="items"><FaUsers /><span>Хэрэглэгчид</span> </div>
            </div>
        </LeftMenuStyle>
    )
}

export default LeftMenu

const LeftMenuStyle = styled.div`
    width: 280px;
    height: 100vh;
    background-color: #182444;
    color: #ffffff;
    font-family:${props=>props.theme.fontFamily2};
    font-size: 14px;
    letter-spacing: 0.5px;
    .mainMenu{
        width: 100%;
        .items{
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 15px 25px;
            font-weight: 500;
            svg{
                color: rgba(255,255,255,.7);
                font-size: 22px;
            }
            &:hover{
                background-color: rgba(20,130,225,0.6);
                color: rgba(255,255,255,.8);
                svg{
                    color: #ffffff;
                }
            }
        }
    }
    .Header{
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255,255,255,.2);
        img{
            width: 55%;
        }
    }
`