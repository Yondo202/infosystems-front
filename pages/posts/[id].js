import React from "react";
import Root from "@/core/Root";
import checkLanguage from '@/miscs/checkLanguage';
import decrease from "@/miscs/decrease"
import Axios from "axios";
import MainContent from "components/posts/MainPost"

const Blog = ({news}) => {
    return (
        <Root seo={{title: news.name, description: decrease(news.description, 120), thumb: news.image.url }}>
             <MainContent news={news} />
        </Root>

    );
};

export default Blog;

export async function getServerSideProps({params, req}){
    let data = await Axios.get(`${process.env.serverUrl}/posts?slug=${params.id}`);

    let add
    if(data.data[0]?.count){
         add = parseInt(data.data[0].count) + 1
    }else{
         add = 1
    }
    await Axios.put(process.env.serverUrl+'/posts/'+ data.data[0]?.id, {count: add});
    return {props: {news: data.data[0]}}
}