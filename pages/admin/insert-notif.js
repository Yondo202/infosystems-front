import React from 'react'
import LeftMenu from '@/components/admin/LeftMenu';
import TopMenu from "@/components/admin/TopMenu"
import { Component } from "./index"
import InsertHome from "@/components/admin/insertNotf/Home"

const InserNotif = () => {
    return (
        <>
            <Component>
                <LeftMenu />
                <div className="right">
                    <div className="ghost" />
                    <TopMenu />
                    <InsertHome />
                </div>
            </Component>
        </>
    )
}

export default InserNotif;