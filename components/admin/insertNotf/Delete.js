import React from 'react'
import {FaRegWindowMinimize, FaExpand, FaTimes } from 'react-icons/fa'
import axios from "axios"
import { Container } from "./edit"
import { parseCookies } from "nookies"


const GetDataURL = `${process.env.serverUrl}/insert-notifications`

const Delete = ({ setShowModal , selectedRow}) => {
    const { jwt } = parseCookies();
    const [ cName, setCName ] = React.useState('');

    const DeleteHandle = () =>{
        axios.delete(`${GetDataURL}/${selectedRow.id}`, { headers: {Authorization: `bearer ${jwt}`} } ).then((res) => {
            console.log(`res`, res)
            setShowModal(false)
       }).catch((err)=>console.log(`err+++`, err.response))
    }

    const HandleClose = () =>{
        setCName('container2');
        setTimeout(() => {
            setShowModal(false);
        }, 600);
    } 

    return (
        <Container>
                <div className={`container ${cName}`} >
                    <div className="header">
                        <div className="inputTitle">Мэдэгдэл Устгах</div>
                        <div className="icons">
                            <FaRegWindowMinimize/>
                            <FaExpand onClick={() => {ToggleMaxSize()}}/>
                            <FaTimes onClick={HandleClose}/>
                        </div>
                    </div>
                    <form >
                        <div className="content" >
                            <div className="inputTitle">Гарчиг</div>
                            <input required defaultValue={selectedRow.description} className="input setValue" type="text" name="description" />
                           
                            <div className="status">
                                <div className="save">
                                    <button type="button" onClick={DeleteHandle} className="ownButton">Устгах</button>
                                    <button onClick={HandleClose} className="ownButton">Болих</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
        </Container>
    )
}

export default Delete
