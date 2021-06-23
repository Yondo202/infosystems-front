import React, { useEffect, useState } from 'react'
import Root from "@/core/Root";
import styled from 'styled-components';
import checkLanguage from "@/miscs/checkLanguage"
// import nextConfig from 'next/config';
import TopHead from "@/components/feedback/header/TopHead"
import LeftMenu from "@/components/feedback/header/LeftMenu"
import CommentSector from '@/components/feedback/CommentSector';


const ProductId = ({datas}) => {
    const [Loading, setLoading] = useState(false);
    const [ targetProduct, setTargetProduct ] = React.useState({});
    useEffect(()=>{
        if(datas){
            setLoading(true);
        }
    },[datas])

    return (
        <Root>
            {/* <MainFeedback data={data2} /> */}
            <TopHead targetProduct={targetProduct} />
            <Container >
                <div className="container-xxl Parent">
                    <LeftMenu targetProduct={targetProduct} setTargetProduct={setTargetProduct} />
                    <div className="CommentSector">
                        {/* <QuestionHome title={data.data[0]?.title} data={data.data[0]?.product_feedbacks} /> */}

                        {Loading?<CommentSector product={datas} />:null}
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
    let res = await checkLanguage(`/product-feedbacks?id=${params.slug}`, req, true);
    return {props: {datas:res.data[0]}}
}