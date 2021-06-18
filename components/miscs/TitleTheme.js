import styled from "styled-components"

export const HeadStyle = styled.div`
    font-size: 28px;
    margin-bottom: 22px;
    position: relative;
    text-align: center;
    .text{
        padding: 5px 20px;
        background-color: #ffffff;
        position: relative;
        z-index: 2;
    }
    &:before{
        content: "";
        height: 1px;
        opacity: 0.76;
        width: 100%;
        position: absolute;
        background-color: ${props=>props.theme.mainColor2};
        left: 0;
        top: 50%;
    }
`