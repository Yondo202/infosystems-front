import React from 'react'
import styled from 'styled-components'
// import Other from "components/posts/Other"
import ProductSector from "@/components/product/ProductSector"

const MainPost = ({product}) => {
    return (
        <Container >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ProductSector news={product} />
                    </div>
                    {/* <div className="col-md-3">
                        <Other news={news?.id} />
                    </div> */}
                </div>
            </div>
        </Container>
    )
}

export default MainPost

const Container = styled.div`
    background-color: #ffffff;
    padding-top: 100px;
    padding-bottom: 100px;
`
