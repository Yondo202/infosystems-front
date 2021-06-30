import React from 'react'
import Root from "@/core/Root";
import styled from 'styled-components';
import axios from 'axios';
// import nextConfig from 'next/config';
import TopHead from "@/components/feedback/header/TopHead"
import LeftMenu from "@/components/feedback/header/LeftMenu"
import QuestionHome from '@/components/feedback/QuestionHome';

const Search = ({data2}) => {

    return (
        <Root>
            {/* <MainFeedback data={data2} /> */}
            <TopHead />
            <Container >
                <div className="container-xxl Parent">
                    <LeftMenu  />
                    <div className="CommentSector">
                        <QuestionHome search={true} data={data2} />
                    </div>
                </div>
            </Container>
        </Root>
    )
}

export default Search;

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
    let res2 = await axios.post(`${process.env.serverUrl}/graphql`, { query:`query{
            productFeedbacks( where:{ name_contains:"${params.search}" }, sort:"created_at:DESC"){
                id name  created_at
                product{ id title }
                user{ id username role{ name } }
            }
    }`})
 
    return {props: {data2:res2.data.data.productFeedbacks}}
}