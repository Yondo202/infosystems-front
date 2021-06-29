import React, { useEffect, useContext } from "react";
import UserContext from "@/core/context/Context";
import Root from "@/core/Root";
import ResolveComponent from "@/components/dynamic/ResolveComponent"
import checkLanguage from "@/components/miscs/checkLanguage";
import Router from "next/router"

const Index = ({ data }) => {
    const { alertFunc } = useContext(UserContext)
    let {Layout} = data
    useEffect(()=>{
        if(data.slug==="download"){
            Router.push('/login')
            alertFunc('orange', 'Нэвтэрсэн байх хэрэгтэй', true);
        }
    },[data])

    return (
        <Root>
            {Layout.length!==0?<ResolveComponent data={Layout}/>:<h3>Мэдээлэл байхгүй байна</h3>}
        </Root>

    );
};

export async function getServerSideProps({params, req}){
    let res = await checkLanguage(`/pages?slug=${params.id}`, req, true);
    return {props: {data:res.data[0]}}
}

export default Index;
