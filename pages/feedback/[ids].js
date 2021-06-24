import React from 'react'
import Root from "@/core/Root";
import styled from 'styled-components';
import checkLanguage from "@/miscs/checkLanguage"
// import nextConfig from 'next/config';
import TopHead from "@/components/feedback/header/TopHead"
import LeftMenu from "@/components/feedback/header/LeftMenu"
import QuestionHome from '@/components/feedback/QuestionHome';
import axios from 'axios';

const ProductId = ({ data }) => {
    const [ targetProduct, setTargetProduct ] = React.useState({});
    
    return (
        <Root>
            <TopHead targetProduct={targetProduct} />
            <Container >
                <div className="container-xxl Parent">
                    <LeftMenu targetProduct={targetProduct} setTargetProduct={setTargetProduct} />
                    <div className="CommentSector">
                        {data?.length?<QuestionHome ids={true} title={data?.[0]?.title} productId={data?.[0]?.id} data={data?.[0]?.product_feedbacks} />
                        :<QuestionHome ids={true} title={null} productId={null} data={[]} /> }
                    </div>
                </div>
            </Container>
        </Root>
    )
}

export default ProductId

const Container = styled.div`
    padding-bottom: 10em;
    .Parent{
        display:flex;
        justify-content:space-between;
        .CommentSector{
            width:72.5%;
        }
    }
`

export async function getServerSideProps({params, req}){
    
    let res2 = await axios.post(`${process.env.serverUrl}/graphql`, { query: `query{
        products(where:{id:${params.ids}}){
            id
            title
            product_feedbacks(sort:"created_at:DESC"){
            id
            created_at
            name
            user{
                    id
                    username
                    
                }
            }
        }
    }`});
    return {props: { data: res2.data.data.products}}
}

