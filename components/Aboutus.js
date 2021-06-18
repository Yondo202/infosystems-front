import React from 'react'
import styled, { keyframes } from 'styled-components';
import HtmlParser from "@/miscs/CustomParser2"
import { HeadStyle } from "@/miscs/TitleTheme"

const Aboutus = ({data}) => {
    return (
        <Container>
            <div  className="container">
                <div className="contentSector">
                    {data.AboutUsChild.map((el,ind)=>{
                        return(
                            <div key={ind} className="contents">
                                <HeadStyle ><span className="text">{el?.title}</span></HeadStyle>
                                <div className="contentsChild">
                                    <HtmlParser data={el?.description} />
                                    {/* {parser.parse(el.description)} */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Container>
    )
}

export default Aboutus

const animate = keyframes`
    0%{ opacity:0; transform:translateY(20px); }
    100%{ opacity:1; transform:translateY(0px); }
`

const Container = styled.div`
    animation: ${animate} 1s ease;
    padding-top: 8rem;
    padding-bottom:  2rem;
    font-size: 17px !important;
    background-color: #ffffff;
    .contentSector{
        width: 90%;
        .contents{
            padding-bottom:  2rem;
        }
    }
`
