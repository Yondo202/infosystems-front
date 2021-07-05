import React, { useState } from 'react'
import axios from "axios"
import { ModalContainer } from "./Modal"
import { parseCookies } from "nookies"
import { MdClose } from "react-icons/md"
import { AiOutlineDelete } from "react-icons/ai"

const Delete = ({setShowModal, targ }) => {
    const { jwt } = parseCookies();
    const [ classN, setClassN ] = useState(``);

    const ClickHandle = () =>{
        axios.delete(`${process.env.serverUrl}/users/${targ.id}`, {
            headers: {Authorization: `bearer ${jwt}`}
        }).then(res=>{
            setClassN(`Content2`);
            setTimeout(() => {
                setShowModal(false);
            }, 280);
        })
    }

    const CloseHandle = () =>{
        setClassN(`Content2`);
        setTimeout(() => {
            setShowModal(false);
        }, 280);
    }

    return (
        <ModalContainer>
        <div className={`Content ${classN}`}>
             <div onClick={()=>CloseHandle()} className="close"><MdClose /></div>
             <div className="mainCont">
                 <div className="info">
                     <div className="title">Байгууллагын нэр: </div>
                     <div className="desc">{targ.company_name}</div>
                 </div>
                 <div className="info">
                     <div className="title">Байгууллагын регистр: </div>
                     <div className="desc">{targ.company_register}</div>
                 </div>
                 <div className="info">
                     <div className="title">Email: </div>
                     <div className="desc">{targ.email}</div>
                 </div>
                
                 <div className="info">
                     <div className="title">Зөвшөөрөл: </div>
                     <div className="desc">{targ.admin_confirmed
                                        ?<span className="apps approve">Зөвшөөрсөн</span>
                                        :<span className="apps notApprove">Хүлээгдсэн...</span>}</div>
                 </div>
                 <div className="info">
                     <div className="title">Бүтээгдэхүүн: </div>
                     <div className="desc"><ul>{targ.products.map((el, ind)=>{return(<li key={ind}>{el.title}</li>)})}</ul></div>
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
