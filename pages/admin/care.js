import React from 'react'
import LeftMenu from '@/components/admin/LeftMenu';
import TopMenu from "@/components/admin/TopMenu"
import { Component } from "./index"
import CarePage from "@/components/admin/care/MainPage"

const Care = () => {
    return (
        <>
            <Component>
                <LeftMenu />
                <div className="right">
                    <div className="ghost" />
                    <TopMenu />
                    <CarePage />
                </div>
            </Component>
        </>
    )
}

export default Care;
