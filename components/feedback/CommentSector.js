import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CkEditor from '@/miscs/Ckeditor';
import Comment from "@/components/feedback/Comments";
import { useRouter } from 'next/router'
import axios from 'axios';


const CommentSector = ({ product }) => {
    const [ products, setProduct ] = useState([]);
    const router = useRouter()
    const { slug } = router.query

    useEffect(()=>{
        if(product.id){
            FetchMenu2();
        }
    },[product]);

    const FetchMenu2 = async () =>{
        let res2 = await axios.post(`${process.env.serverUrl}/graphql`, { query:`query{
            productFeedbacks( where: { id: ${slug} }){
             issue_answers{ id content  created_at user{ id username role{ name } } } }
            }`})

        setProduct(res2?.data?.data?.productFeedbacks[0]?.issue_answers);
    }

    return (
        <Container>
            <div className="MainContent">
                <div className="BigTitle">
                    {product?.name}
                </div>
                <Comment parent={true} datas={product} />
            </div>
            
            {products.map((el,ind)=>{
                return(
                    <div key={ind} className="Parent">
                        <Comment datas={el} />
                    </div>
                )
            })}

            <CkEditor productId={product?.id} height={true} />
        </Container>
    )
}

export default CommentSector

const Container = styled.div`
    font-family: ${props=>props.theme.fontFamily2};
    .MainContent{
        .BigTitle{
            font-size: 25px;
            font-weight: 500;
            padding-bottom: 15px;
            margin-bottom:15px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
    }
`
