import React from 'react'
import Root from "@/core/Root";
import MainFeedback from "@/components/feedback/MainFeedback"
import checkLanguage from "@/components/miscs/checkLanguage";
// import nextConfig from 'next/config';

const index = ({ data }) => {
    return (
        <Root>
            <MainFeedback data={data} />
        </Root>
    )
}

export default index;


// const { publicRuntimeConfig } = nextConfig();

export async function getServerSideProps({params, ctx, req}){
    let res = await checkLanguage(`/products`, req, true);
    return {props: {data:res.data}}
}