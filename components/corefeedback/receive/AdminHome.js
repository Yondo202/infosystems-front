import React, { useEffect, useState } from 'react'
import { MdDateRange } from "react-icons/md"
import { FaRegDotCircle } from "react-icons/fa"
import { useRouter } from 'next/router'
import { VscIssueReopened } from "react-icons/vsc"
import { Image } from 'antd';
import { AiOutlineUser } from "react-icons/ai"
import axios from "axios"
import styled from 'styled-components'


const AdminHome = ({ cf_id }) => {
    const [ active, setActive ] = useState('all')
    const [ data, setData ] = useState([])
    const [ dataMe, setDataMe ] = useState([])

    useEffect(()=>{
        void async function Fetch(){
            let fetched =  await axios.get(process.env.serverUrl+'/coreissues?_sort=created_at:DESC')
            setData(fetched?.data);

            let fetchedMe =  await axios.get(process.env.serverUrl+`/coreissues?_sort=created_at:DESC&_where[checked_user.id]=${cf_id}`)
            setDataMe(fetchedMe?.data)
        }()
    },[])

    return (
        <Container >
            <div className="content">
                <div className="header">
                    <h5 className="title">Нийт санал хүсэлтийн жагсаалт</h5>
                    <div className="description">Доорх санал хүсэлтүүдээс өөрт хамааралтайг  'Check'- хийнэ үү  </div>
                </div>

                <div className="custom_menu">
                    <div onClick={_=>setActive('all')} className={`menu_item ${active==='all'?`active`:``}`}>Нийт
                        <div className="count">{data?.length} / {data?.filter(item=>item.status).length}</div>
                    </div>
                    <div onClick={_=>setActive('me')} className={`menu_item ${active==='me'?`active`:``}`}>
                        Надад Хамааралтай
                        <div className="count">{dataMe?.length} / {dataMe.filter(item=>item?.status).length}</div>
                    </div>
                </div>

                {active === 'all'?<ListComponent data={data} />: <ListComponent data={dataMe} />}
                
            </div>
        </Container>
    )
}

export default AdminHome

const ListComponent = ({data}) =>{
    const router = useRouter()
    return(
        <div className="issue_list">
            {data.map((el,ind)=>{
                return(
                    <div key={ind} className="issue_item">
                        <div className="left">
                            <div className={`started ${el?.status?``:`done`}`}><FaRegDotCircle /></div>
                            <div className="text_sector">
                                <div className="some_text">
                                    <div className="title"><div onClick={_=>router.push(`/cf/${el.id}`)}>{el.title}</div> </div>
                                    <div className="description">{el.description?.slice(0,100)}</div>
                                </div>

                                <div className="some_info">
                                    <div className="items"><MdDateRange />  {el.created_at.slice(0,10).replace('T', ' ')}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="right">
                            <div className="images">
                                {el.image?.map((item,ind)=>{
                                    return(
                                        <div key={ind} className="img">
                                            <Image width={`100%`}  height="100%"  src={process.env.serverUrl+item.url} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="main_status">
                                <div className="status">
                                    <span className="label"><VscIssueReopened /></span>
                                    {el?.status ?<span className="green">Шийдэгдсэн</span>:<span className="err">Шийдэгдээгүй</span>}
                                </div>
                                {el.checked_user?.length > 0
                                ?<div className="status green">
                                    <span className="label"><AiOutlineUser /></span>{el.checked_user?.map((ell, indd)=> <span className="green" key={indd}>{ell?.username} {el.checked_user?.length !==indd + 1? `, `:``}</span>)}
                                </div>
                                :<div className="status"><span className="label"><AiOutlineUser /></span ><span className="err">байхгүй</span></div> }
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const Container = styled.div`
    font-family: ${props=>props.theme.fontFamily};
    display:flex;
    justify-content:center;
    .content{
        width:900px;
        background-color:#fff;
        border:1px solid rgba(0,0,0,0.2);
        padding:30px 20px;
        .issue_list{
            width:100%;
            max-height:65vh;
            overflow-y:auto;
            .issue_item{
                padding-bottom:15px;
                margin-bottom:15px;
                border-bottom:1px solid rgba(0,0,0,0.1);
                display:flex;
                justify-content:space-between;
                flex-wrap:wrap;
                &:last-child{
                    border-bottom:none;
                }
                .started{
                    width:30px;
                    min-width:30px;
                    svg{
                        color:green;
                        font-size:17px;
                    }
                }
                .done{
                    svg{
                        color:rgba(0,0,0,0.3);
                    }    
                }
                .left{
                    padding-right:20px;
                    display:flex;
                    .text_sector{
                        .some_text{
                            margin-bottom:19px;
                            .title{
                                font-size:15px;
                                font-weight:600;
                                margin-bottom:2px;
                                cursor:pointer;
                                &:hover{
                                    color:blue;
                                }
                            }
                            .description{
                                line-height: 18px;
                                font-size:12px;
                                color:#6c757d;
                            }
                        }
                        
                        .some_info{
                            font-size:12px;
                            display:flex;
                            align-items:center;
                            color:rgba(0,0,0,0.7);
                            font-weight:500;
                            gap:18px;
                            .items{
                                svg{
                                    color:rgba(0,0,0,0.6);
                                    font-size:17px;
                                }
                            }
                        }
                    }
                }
                .right{
                    display:flex;
                    flex-direction:column;
                    align-items: start;
                    height:auto;
                    justify-content:space-between;
                    .main_status{
                        display:flex;
                        gap:32px;
                        .status{
                            width:160px;
                            display:flex;
                            align-items:center;
                            font-size:12px;
                            font-weight:500;
                            color:rgba(0,0,0,0.9);
                            .label{
                                margin-right:6px;
                                svg{
                                    font-size:19px;
                                }
                                color:#6c757d;
                            }
                            .err{
                                // color:#e65555;
                                color: rgba(0,0,0,0.7);
                            }
                            .green{
                                color:green;
                            }
                        }
                    }
                   
                    .images{
                        margin-bottom:25px;
                        display:flex;
                        gap:10px;
                        .img{
                            cursor:pointer;
                            width:32px;
                            height:32px;
                            border-radius:50%;
                            overflow:hidden;
                            img{
                                width:100%;
                                height:100%;
                                object-fit:cover;
                            }
                        }
                    }
                }
            }
        }
        .custom_menu{
            display:flex;
            border-bottom:1px solid rgba(0,0,0,0.2);
            margin-bottom: 1.5rem !important;
            gap:50px;
            .menu_item{
                position:relative;
                cursor:pointer;
                line-height:32px;
                color:rgba(0,0,0,0.8);
                .count{
                    position:absolute;
                    top:-3px;
                    right:-20px;
                    background-color:rgba(0,0,0,0.37);
                    color:#fff;
                    font-weight:800;
                    font-size:9px;
                    border-radius:50px;
                    line-height: 100%;
                    padding:2px 4px;
                }
                &:hover{
                    opacity:0.9;
                }
            }
            .active{
                color:#000;
                font-weight:500;
                border-bottom:2px solid blue;
                .count{
                    background-color:blue;
                    color:#fff;
                }
            }
        }
        .header{
            padding-bottom:1rem;
            .title{
                font-weight: 600;
            }
            .description{
                line-height: 18px;
                font-size:12.5px;
                color:#6c757d;
            }
        }
    }
`