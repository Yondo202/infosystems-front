import styled from "styled-components"

export const InputStyle = styled.div`
        transition:all 0.3s ease;
        position:relative;
        display:flex;
        flex-direction:column;
        align-items:start;
        overflow:hidden;
        width:100%;
        margin-bottom:15px;
        font-size:14px;
        color:#212529;
        .label{
            opacity:0.9;
            margin-bottom:8px;
        }
        input{
            box-shadow:1px 1px 13px -8px #21659f;
            border-radius: 4px;
            align-self:flex-end;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            padding:10px 0px;
            padding-left:10px;
            transition:all 0.3s ease;
            color:#212529;
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.4);
            }
            &:focus{
                border:1px solid #21659f;
                outline-width: 0;
            }
        }
        .RedPar{
            border-bottom:1px solid red;
        }
        select{
            color:rgba(0,0,0,0.75);
            font-size:14px;
            transition:all 0.3s ease;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            appearance: none;
            width:100%;
            border-radius: 4px;
            align-self:flex-end;
            border:1px solid rgba(0,0,0,0.2);
            padding:6px 0px;
            padding-left:5px;
            transition:all 0.3s ease;
            option[value=""][disabled] {
                display: none;
            }
            option {
                color:rgba(0,0,0,0.8);;
            }
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.4);
            }
            &:focus{ 
                border:1px solid #21659f;
                outline-width: 0;
            }
            &:focus ~ .SelectArr{ 
                background-color:rgba(0,0,0,0.1);
                svg{
                    transform: rotate(180deg);
                }
            }
            &::-ms-expand{
                display: none;
            }
            & > option[value=""][disabled] {
                color: red;
            }
        }
        .SelectArr{
            transition:all 0.3s ease;
            position:absolute;
            top:2%;
            right:0.5%;
            background-color:white;
            height:95%;
            width:24px;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:2px;
            z-index:1;
            svg{
                transition:all 0.3s ease;
                font-size:14px;
                color:rgba(0,0,0,0.8);
            }
        }
        
        textarea{
            color:#212529;
            min-height:180px;
            border-radius: 4px;
            align-self:flex-end;
            width:100%;
            border:1px solid rgba(0,0,0,0.2);
            padding:10px 10px;
            padding-left:10px;
            transition:all 0.3s ease;
            &:hover{
                border:1px solid rgba(33, 101, 159, 0.3);
            }
            &:focus{ 
                outline-width: 0;
                border:1px solid #21659f;
            }
        }
        .red{
            border:1px solid rgba(255,0,0,0.8);
            &:focus{
                border:1px solid rgba(255,0,0,0.8);
            }
        }
        .cash{
            padding-right:10px;
            text-align:right;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
        }
`

export const TitleStyle = styled.div`
    position:relative;
    margin-bottom:25px;
    font-size:21px;
    ${props=>props.theme.BoldFont};
    &:before{
        content:'';
        position: absolute;
        bottom: 0;
        left: 0;
        height:2px;
        width:100%;
        background-color: rgba(0,0,0,.1);
    }
    
    .text{
        color:${props=>props.theme.mainColor2};
        color:#222f3e;
        display: inline-block;
        position: relative;
        z-index: 1;
        padding: 5px 5px 12px 0;
        // text-transform: uppercase;
        &:before{
            content:'';
            position: absolute;
            bottom: 0;
            left: 0;
            height:2px;
            width:100%;
            background-color: ${props=>props.theme.mainColor2};
        }
        
    }
`