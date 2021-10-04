import React,{useContext} from 'react'
import styled from 'styled-components'
import UserContext from '@/core/context/Context'
import { FaComments, FaUsers } from "react-icons/fa"
import { MdModeComment } from "react-icons/md"
import { MdNotifications } from "react-icons/md"
import Link from "next/link"
import { useRouter } from 'next/router'

const LeftMenu = () => {
    const path = useRouter().pathname;
    const { logo } = useContext(UserContext);

    return (
        <LeftMenuStyle>
            <Link href="/admin">
                <a className="Header">
                    <img src={process.env.serverUrl+logo?.url} />
                </a>
            </Link>

            <div className="mainMenu">
                <Link href="/admin/users">
                    <a className={`items ${path.includes('users')?`Active`:``}`}><FaUsers /><span>Хэрэглэгчид</span> </a>
                </Link>
                <Link href="/admin/care">
                    <a className={`items ${path.includes('care')?`Active`:``}`}><FaComments /><span>Тусламж</span> </a>
                </Link>

                <Link href="/admin/insert-notif">
                    <a className={`items ${path.includes('insert-notif')?`Active`:``}`}>
                        <MdNotifications />
                        <span>Мэдэгдэл оруулах</span>
                    </a>
                </Link>
                
                <div className="items"><MdModeComment /><span>Санал хүсэлт</span> </div>
            </div>
        </LeftMenuStyle>
    )
}

export default LeftMenu

const LeftMenuStyle = styled.div`
    position:sticky;
    top:0;
    left:0;
    width: 280px;
    height: 100vh;
    background-color: #182444;
    color: #ffffff;
    font-family:${props=>props.theme.fontFamily2};
    font-size: 13px;
    letter-spacing: 0.5px;
    .mainMenu{
        width: 100%;
        .items{
            text-decoration: none;
            color: unset;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 15px 25px;
            font-weight: 500;
            color: rgba(255,255,255,.7);
            svg{
                color: rgba(255,255,255,.7);
                font-size: 22px;
            }
            &:hover{
                background-color: rgba(20,130,225,0.6);
                color: rgba(255,255,255,1);
                svg{
                    color: #ffffff;
                }
            }
        }
        .Active{
            background-color: rgba(20,130,225,0.6);
            color: rgba(255,255,255,1);
            svg{
                color: #ffffff;
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