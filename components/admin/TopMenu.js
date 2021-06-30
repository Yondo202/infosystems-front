import React from 'react'
import Link from "next/link"
import styled from 'styled-components'
import { GiEntryDoor } from "react-icons/gi"
import { VscCommentDiscussion } from "react-icons/vsc"
import { CgWebsite } from "react-icons/cg"


const TopMenu = () => {
    return (
        <TopHeader>
            <div />
            <div className="items">
                <Link href="/">
                    <a className="item"><img src="/logo_sm.png" alt="infosystem" /> Үндсэн сайт</a>
                </Link>
                <Link href="/feedback">
                    <a className="item"><VscCommentDiscussion /> Тусламж</a>
                </Link>
                
                <div className="item"><GiEntryDoor /> Гарах </div>
            </div>
        </TopHeader>
    )
}

export default TopMenu

const TopHeader = styled.div`
    font-size: 14px;
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 25%);
    .items{
        display: flex;
        gap: 35px;
        font-weight: 500;
        .item{
            text-decoration: none;
            color: unset;
            cursor: pointer;
            gap: 5px;
            display: flex;
            align-items: center;
            img{
                width: 16px;
            }
            svg{
                font-size: 15px;
            }
        }
    }
`
