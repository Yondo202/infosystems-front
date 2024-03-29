import React, { useState, useContext } from 'react'
import { FaRegUser } from "react-icons/fa"
import { BiLock } from "react-icons/bi"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import axios from 'axios'
import { setCookie } from 'nookies'
import Router from "next/router"
import { LoadingStyle } from '../miscs/CustomComp'
import UserContext from '@/core/context/Context'

const login = () => {
    const { alertFunc } = useContext(UserContext);
    const [ showPass, setShowPass ] = useState(false);
    const [ errText, setErrText ] = useState('Мэдээллээ гүйцэд оруулна уу');
    const [ showErr, setShowErr ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const ClickHandle = async (e) =>{
        e.preventDefault();
            const loginInfo = {
                identifier: username,
                password: password,
            }
            if(username===''){
                setErrText('Имэйл хаягаа оруулна уу');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 5000)
            }else if(password===''){
                setErrText('Нууц үгээ оруулна уу');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 5000)
            }else{
                setLoading(true);
                await axios.post(`${process.env.serverUrl}/auth/local`, loginInfo )
                .then(res=>{
                    if(res.data.user.admin_confirmed){
                        setCookie(null, 'jwt', res.data.jwt,{ maxAge: 30 * 24 * 60 * 60, path:"/" });
                        setCookie(null, 'username', res.data.user.username, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                        setCookie(null, 'role', res.data.user.role.type, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                        setCookie(null, 'id', res.data.user.id, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                        setCookie(null, 'email', res.data.user.email, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                        Router.push('/');
                    }else{
                        alertFunc('green', "Зөвшөөрөл хүлээнэ үү...", true);
                        Router.push(Router.asPath);
                    }
                    setLoading(false);
                }).catch(err=>{
                    setLoading(false);
                    setErrText('Нууц үг болон нэвтрэх нэрээ шалгана уу');
                    setShowErr(true);
                    setTimeout(() => {  setShowErr(false); }, 5000)
                })
            }
    }

    return (
        <form onSubmit={ClickHandle}>
            <div className="InputParent">
                <div className="inputItem">
                    <div className="title">Нэвтрэх нэр</div>
                    <div className="inputPar">
                        <input value={username} autoFocus onChange={e=>setUsername(e.target.value)} type="email" placeholder="E-мэйл хаягаараа нэвтэрнэ үү" />
                        <FaRegUser />
                        <div className="line" />
                    </div>
                </div>

                <div className="inputItem">
                    <div className="title titleV2">
                        <span>Нууц үг</span>
                        <span className="forget">Нууц үг мартсан</span>
                    </div>
                    <div className="inputPar">
                        <input value={password} className="pass" onChange={e=>setPassword(e.target.value)}
                         type={showPass?`text`:`password`}
                         placeholder="Нууц үгээ оруулна уу" />
                        <BiLock className="A2"  />
                        <div className="line" />
                        <div className="mySvg">{showPass?<BsEye onClick={()=>setShowPass(false)} />:<BsEyeSlash onClick={()=>setShowPass(true)} />}</div>
                    </div>
                </div>
                
                <div className="buttonPar">
                    {showErr&&<div className="ErrTxt">{errText}</div>}
                    <button type="submit">Үргэлжлүүлэх</button>
                </div>
            </div>
            {loading?<LoadingStyle> <img src="/giff2.gif" /></LoadingStyle>:<></>}
        </form>
        
    )
}

export default login;

