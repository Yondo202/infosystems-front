import React from 'react'
import LeftMenu from '@/components/admin/LeftMenu';
import TopMenu from "@/components/admin/TopMenu"
import HomeUsers from "@/components/admin/users/HomeUsers"
import { Component } from "./index"

const Users = () => {
    return (
        <>
            <Component>
                <LeftMenu />
                <div className="right">
                    <div className="ghost" />
                    <TopMenu />
                    <HomeUsers />
                </div>
            </Component>
        </>
    )
}
export default Users;