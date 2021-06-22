import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CkEditor from '@/miscs/Ckeditor';
import Comment from "@/components/feedback/Comments";


const CommentSector = ({ product }) => {
    const [ Loading, setLoading ] = useState(false);
    const [ data, setData ] = useState('');
    const [ products, setProduct ] = useState([]);

    useEffect(()=>{
        setProduct(product?.product_feedbacks);
        setLoading(true)
    },[product])

    return (
        <Container>
            {products.map((el,ind)=>{
                return(
                    <div key={ind} className="Parent">
                        <Comment datas={el} />
                    </div>
                )
            })}

            <CkEditor productId={product?.id} height={true} data={data} setData={setData} />
        </Container>
    )
}

export default CommentSector

const Container = styled.div`

`
