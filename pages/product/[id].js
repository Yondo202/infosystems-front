import React from "react";
import Root from "@/core/Root";
import checkLanguage from '@/miscs/checkLanguage';
import decrease from "@/miscs/decrease"
import Axios from "axios";
import MainContent from "components/product/MainProduct"

const Products = ({product}) => {
    return (
        <Root seo={{title: product.name, description: decrease(product.description, 120), thumb: product.image.url }}>
             <MainContent product={product} />
        </Root>

    );
};

export default Products;

export async function getServerSideProps({params, req}){
    let data = await checkLanguage(`/products?slug=${params.id}`, req, true);
    let add
    if(data.data[0]?.count){
         add = parseInt(data.data[0].count) + 1
    }else{
         add = 1
    }
    await Axios.put(process.env.serverUrl+'/products/'+ data.data[0]?.id, {count: add});
    return {props: {product: data.data[0]}}
}