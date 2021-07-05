import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RiEdit2Line } from "react-icons/ri"
import { VscError } from "react-icons/vsc"
import axios from 'axios'
import { parseCookies } from "nookies"
import Modal from "@/components/admin/users/Modal"
import Delete from "@/components/admin/users/Delete"

const HomeUsers = () => {
    const [ showModal, setShowModal ] = useState(false);
    const [ delModal, setDelModal ] = useState(false);
    const [users, setUsers] = useState([]);
    const [ products, setProducts ] = useState([]);
    const [ targetUser, setTargetUser ] = useState({});
    const { jwt } = parseCookies();

    useEffect(() => {
        Go();
    }, [showModal, delModal]);

    const Go = async () => {
        await axios.post(`${process.env.serverUrl}/graphql`, {
            query: `query { users{ id username email confirmed company_name admin_confirmed company_register created_at
                products{ id title }
            } }`
        }, { headers: { Authorization: `Bearer ${jwt}` } }).then(res => { setUsers(res.data.data?.users); })

        await axios.post(`${process.env.serverUrl}/graphql`, {
            query: `query{products{ id title catigory slug }}`
        }).then(res => { 
            setProducts(res.data.data?.products)
        })
    }

    const ShowHandle = (el) =>{
        setShowModal(true);
        setTargetUser(el);
    }
    const ShowHandle2 = (el) =>{
        setDelModal(true);
        setTargetUser(el);
    }

    return (
        <Container>
            <div className="Parent">
                <div className="title">Нийт хэрэглэгчид - {users.length} </div>

                <div className="UserSector">
                    <table>
                        <tbody>
                            <tr>
                                <th>Байгууллагын нэр</th>
                                <th>Байгууллагын регистр</th>
                                <th>Email</th>
                                <th>Зөвшөөрөл</th>
                                <th>Бүтээгдэхүүн</th>
                                <th>Үйлдэл</th>
                            </tr>

                            {users.map((el, ind) => {
                                return (
                                    <tr key={ind}>
                                        <td>{el.company_name}</td>
                                        <td>{el.company_register}</td>
                                        <td>{el.email}</td>
                                        <td>{el.admin_confirmed
                                        ?<span className="apps approve">Зөвшөөрсөн</span>
                                        :<span className="apps notApprove">Хүлээгдсэн...</span>}</td>
                                        <td style={{textAlign:`left`}}><ul>{el.products.map((el, ind)=>{
                                            return(
                                                <li key={ind}>{el.title}</li>
                                            )
                                        })}</ul></td>
                                        <td className="editDelete">
                                            <div className="editDeletePar">
                                                <div onClick={()=>ShowHandle(el)} className="smBtn"><RiEdit2Line /></div>
                                                <div onClick={()=>ShowHandle2(el)}  className="smBtn"><VscError /></div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
           {showModal&&<Modal products={products} targ={targetUser} setShowModal={setShowModal} />}
           {delModal&&<Delete targ={targetUser} setShowModal={setDelModal}/>}
        </Container>
    )
}

export default HomeUsers

const Container = styled.div`
    padding: 0px 20px;
    .Parent{
        // height: 35.5em;
        height: 85vh;
        overflow-y: scroll;
        ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }
        width: 100%;
        background-color: #ffffff;
        border-radius: 8px;
        padding:12px 15px;
        box-shadow:0px 0px 27px -20px;
        .title{
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 15px;
        }

        .UserSector{
            font-size: 13px;
                .apps{
                    border-radius:3px;
                    padding:4px 10px;
                    font-weight:500;
                    font-size:12px;
                }
                .approve{
                    background-color:#4CBB17;
                }
                .notApprove{
                    background-color:#ffc720;
                }
                table{
                    width:100%;
                    border-collapse: collapse;
                    text-align:center;
                    th{
                        background-color:${props => props.theme.mainColor4};
                    }
                    td, th{
                        &:first-child{
                            text-align:center;
                        }
                        padding:8px;
                        border:1px solid rgba(0,0,0,.2);
                    }
                    td{
                        &:last-child{
                            padding:8px 0px;
                        }
                    }
                    .editDeletePar{
                        padding:2px 5px;
                        display: flex;
                        justify-content: center;
                        gap: 14px;
                        /* justify-content:space-evenly; */
                        align-items:center;
                        .smBtn{
                            cursor:pointer;
                            padding:5px;
                            background-color: #fff;
                            border-color: #ddd;
                            color: #333;
                            border-radius: 4px;
                            border-width: 1px;
                            border-style: solid;
                            display:flex;
                            align-items:center;
                            svg{
                                font-size:16px;
                            }
                            &:hover{
                                background-color:#ddd;
                            }
                        }
                    }
                }
            }
        }
    }
`