import React from 'react'
import styled from 'styled-components'
import Other from "components/posts/Other"
import ContentSector from "@/components/posts/ContentSector"

const MainPost = ({ news }) => {
    return (
        <Container >
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <ContentSector news={news} />
                    </div>
                    <div className="col-md-3">
                        <Other news={news?.id} />
                    </div>
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
