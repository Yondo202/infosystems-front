import React, { useState } from 'react'
import axios from "axios"
import { ModalContainer } from "@/components/admin/users/Modal"
import { parseCookies } from "nookies"
import { MdClose } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"

const Delete = ({setShow, Target, FetchData }) => {
    const { jwt } = parseCookies();
    const [ classN, setClassN ] = useState(``);

    const ClickHandle = () =>{
        axios.delete(`${process.env.serverUrl}/product-feedbacks/${Target.id}`, {
            headers: {Authorization: `bearer ${jwt}`}
        }).then(()=>{
            FetchData();
            setClassN(`Content2`);
            setTimeout(() => {
                setShow(false);
            }, 280);
        })
    }

    const CloseHandle = () =>{
        setClassN(`Content2`);
        setTimeout(() => {
            setShow(false);
        }, 280);
    }

    return (
        <ModalContainer >
            <div className={`Content ${classN}`} style={{height:`12em`}}>
                <div onClick={()=>CloseHandle()} className="close"><MdClose /></div>
                <div className="mainCont">
                    <div className="info">
                        <div style={{width:`100%`}} className="title">{Target?.name} </div>
                        {/* <div className="desc">{Target.company_name}</div> */}
                    </div>
                </div>

                <div className="btnPar">
                    <button onClick={ClickHandle} className={`SaveButton`}> <AiOutlineDelete /> Устгах</button>
                </div>
            </div>
            <div />
     </ModalContainer>
    )
}

export default Delete
