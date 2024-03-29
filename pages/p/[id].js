import React from "react";
import Root from "@/core/Root";
import ResolveComponent from "@/components/dynamic/ResolveComponent"
import checkLanguage from "@/components/miscs/checkLanguage";

const Index = ({ data }) => {
    let {Layout} = data

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
