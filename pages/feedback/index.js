import React from 'react'
import Root from "@/core/Root";
import MainFeedback from "@/components/feedback/MainFeedback"
import checkLanguage from "@/components/miscs/checkLanguage";

const index = ({ data }) => {
    return (
        <Root>
            <MainFeedback data={data} />
        </Root>
    )
}

export default index

export async function getServerSideProps({params, req}){
    let res = await checkLanguage(`/products`, req, true);
    return {props: {data:res.data}}
}