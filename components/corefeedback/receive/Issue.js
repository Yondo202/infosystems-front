import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MdDateRange, MdOutlineKeyboardBackspace } from "react-icons/md"
import { Checkbox, Image } from 'antd';
import { parseCookies } from 'nookies';
import axios from "axios"
import styled from 'styled-components'

const Issue = ({ data }) => {
    const router = useRouter()
    const { cf_id } = parseCookies()
    const [ userCheck, setUserCheck ] = useState([])
    const [ issueDone, setIssueDone ] = useState(false)

    useEffect(()=>{
        setUserCheck(data?.checked_user.map(el=>el.id))
        setIssueDone(data?.status)
    },[])


    function onChangeCheck(e) {
        axios.put(process.env.serverUrl+`/coreissues/${data?.id}`, { status: e.target.checked } ).then(res=>{
            setIssueDone(e.target.checked)
        })
    }

    function onChangeCheck2(e) {
        if (e.target.checked === true) {
            axios.put(process.env.serverUrl+`/coreissues/${data?.id}`,   { checked_user: [ ...userCheck, cf_id  ]} ).then(res=>{
                setUserCheck(prev=>[ ...prev, +cf_id  ])
            })
        } else {
            axios.put(process.env.serverUrl+`/coreissues/${data?.id}`,   { checked_user: [ ...userCheck.filter(item=> item !== +cf_id )  ]} ).then(res=>{
                setUserCheck(prev=>[ ...prev.filter(item=> item !== +cf_id) ])
            })
        }
    }

    return (
        <Container className="container">
            <div className="content">
                <div className="header">
                    <h5 className="title"><div onClick={_=>router.push('/cf')}><div className="back"><MdOutlineKeyboardBackspace /></div> </div> {data?.title}</h5>
                    <div className="description">
                        <div className="date"><MdDateRange /> {data?.created_at?.slice(0,16).replace('T',' ')}</div>
                        <div className="my_handle">
                            <div className="check_parent">
                                <label htmlFor="issue" className="label">Шийдэгдсэн: </label>
                                <Checkbox
                                    checked={issueDone??false}
                                    id="issue"
                                    name="done"
                                    onChange={onChangeCheck}
                                />
                            </div>
                            <div className="check_parent">
                                <label htmlFor="check" className="label">Надад хамаатай: </label>
                                <Checkbox
                                    checked={userCheck.some(el=>el === +cf_id )}
                                    id="check"
                                    name="user"
                                    onChange={onChangeCheck2}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="issue_body">
                    <div className="desc">{data?.description}</div>
                    <div className="images">
                        {data?.image?.map((item,ind)=>{
                            return(
                                <div key={ind} className="img">
                                    <Image
                                        width={300}
                                        src={process.env.serverUrl+item.url}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Issue

const Container = styled.div`
    .content{
        background-color:#fff;
        border:1px solid rgba(0,0,0,0.2);
        padding:30px 20px;
        .issue_body{
            .desc{
                font-size:13px;
                font-weight:500;
                color:#333;
                line-height:22px;
                margin-bottom:30px;
                paddin-bottom:30px;
            }
            .images{
                display:flex;
                gap:20px;
                flex-wrap:wrap;
            }
        }
        .header{
            margin-bottom: 1.5rem !important;
            padding-bottom:1rem;
            border-bottom:1px solid rgba(0,0,0,0.2);
            .title{
                margin-bottom: 1.2rem !important;
                font-weight: 600;
                display:flex;
                gap:18px;
                align-items:center;
                .back{
                    cursor:pointer;
                    background-color:rgba(0,0,0,0.057);
                    border-radius:50%;
                    padding:5px;
                    width:35px;
                    height:35px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    svg{
                        font-size:25px;
                    }
                    &:hover{
                        background-color:rgba(0,0,0,0.57);
                        svg{
                            color:#fff;
                        }
                    }
                }
            }
            .description{
                line-height: 18px;
                font-size:13px;
                color:#6c757d;
                display:flex;
                justify-content:space-between;
                .date{
                    display:flex;
                    align-items:center;
                    gap:10px;
                    svg{
                        font-size:20px;
                    }
                }
                .my_handle{
                    display:flex;
                    gap:30px;
                    .check_parent{
                        user-select:none;
                        display:flex;
                        align-items:center;
                        gap:5px;
                        .ant-checkbox-inner {
                            width: 20px;
                            height: 20px;
                            border: 1px solid #949090;
                            &:after{
                                width: 5.71428571px;
                                height: 11.14285714px;
                            }
                        }
                        label{
                            font-weight:600;
                            color:rgba(0,0,0,0.7);
                            cursor:pointer;
                        }
                    }
                }
                
              
            }
        }
    }
`