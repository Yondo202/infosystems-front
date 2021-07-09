import React, { useState, useContext } from 'react'
import UserContext from '@/core/context/Context'
import { FaRegUser } from "react-icons/fa"
import { BiLock } from "react-icons/bi"
import { AiOutlineMail } from "react-icons/ai"
import { CgNametag } from "react-icons/cg"
import { RiRegisteredLine } from "react-icons/ri"
import axios from 'axios'
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { LoadingStyle } from '../miscs/CustomComp'
import styled from 'styled-components'

const SignUp = ({setShowLogin}) => {
    const { alertFunc } = useContext(UserContext);
    const [ showPass, setShowPass ] = useState(false);
    const [ errText, setErrText ] = useState('Мэдээллээ гүйцэд оруулна уу');
    const [ showErr, setShowErr ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ companyName, setCompanyName ] = useState('');
    const [ companyRegister, setCompanyRegister ] = useState('');
    const [ email, setEmail ] = useState('');


    const ClickHandle = async (e) =>{
            e.preventDefault();
            const loginInfo = {
                username: username,
                email: email,
                password: password,
                company_name: companyName,
                company_register: companyRegister,
                admin_confirmed:false,
                seen:false
            }

            if(username===''){
                setErrText('Нэрээ оруулна уу');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 6000)
            }else if(username.length < 5){
                setErrText('Нэр - ий урт 5с багагүй байх');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 6000)
            }else if(password===''){
                setErrText('Нууц үгээ оруулна уу');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 6000)
            }else if(password.length < 6){
                setErrText('Нууц үг - ий урт 6с багагүй байх');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 6000)
            }else if(email===''){
                setErrText('Имэйл хаягаа оруулна уу');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 6000)
            }else if(companyName===''){
                setErrText('Байгууллагын нэрээ оруулна уу');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 6000)
            }else if(companyRegister==='' || companyRegister.length!==7){
                setErrText('Байгууллагын регистрээ шалгана уу');
                setShowErr(true);
                setTimeout(() => {  setShowErr(false); }, 6000)
            }else{
                setLoading(true);
                await axios.post(`${process.env.serverUrl}/auth/local/register`, loginInfo )
                .then(()=>{
                    // if(res.data.user.admin_confirmed){
                    //     setCookie(null, 'jwt', res.data.jwt,{ maxAge: 30 * 24 * 60 * 60, path:"/" });
                    //     setCookie(null, 'username', res.data.user.username, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                    //     setCookie(null, 'id', res.data.user.id, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                    //     setCookie(null, 'email', res.data.user.email, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                    //     setCookie(null, 'role', res.data.user.role.type, { maxAge: 30 * 24 * 60 * 60, path:"/" });
                    //     Router.push('/');
                    // }else{
                        alertFunc('green', "Амжилттай зөвшөөрөл хүлээнүү", true);
                        setShowLogin(true);
                    // }
                    setLoading(false);
                }).catch(err=>{
                    console.log(`err.response`, err);
                    if(err.response.data.message){
                        setLoading(false);
                        setErrText('Алдаа гарлаа');
                        setShowErr(true);
                        setTimeout(() => {  setShowErr(false); }, 6000)
                    }
                })
            }
    }

    const RegisterHandle = (e) =>{
        if(e.target.value.length<8){
            setCompanyRegister(e.target.value);
        }
    }

    return (
        <form onSubmit={ClickHandle}>
            <InputParent className="InputParent">
                <div className="another">
                    <div className="items">
                        <div style={{marginBottom:20}} className="inputItem">
                            <div className="title">Нэр</div>
                            <div className="inputPar">
                                <input value={username} autoFocus onChange={e=>setUsername(e.target.value)} type="text" placeholder="Нэрээ оруулна уу" />
                                <FaRegUser />
                                <div className="line" />
                            </div>
                        </div>

                        <div style={{marginBottom:20}} className="inputItem">
                            <div className="title">Email</div>
                            <div className="inputPar">
                                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="имэйл хаягаа оруулна уу" />
                                <AiOutlineMail />
                                <div className="line" />
                            </div>
                        </div>

                        <div style={{marginBottom:20}} className="inputItem">
                            <div className="title">Нууц үг</div>
                            <div className="inputPar">
                                <input value={password}
                                 type={showPass?`text`:`password`}
                                 className="pass"
                                 onChange={e=>setPassword(e.target.value)} placeholder="Нууц үгээ оруулна уу" />
                                <BiLock className="A2"  />
                                <div className="line" />
                                <div className="mySvg">{showPass?<BsEye onClick={()=>setShowPass(false)} />:<BsEyeSlash onClick={()=>setShowPass(true)} />}</div>
                           
                            </div>
                        </div>
                    </div>

                    <div className="items">
                        <div style={{marginBottom:20}} className="inputItem">
                            <div className="title">Байгууллагын нэр</div>
                            <div className="inputPar">
                                <input value={companyName} onChange={e=>setCompanyName(e.target.value)} type="text" placeholder="Байгууллагын нэр" />
                                <CgNametag />
                                <div className="line" />
                            </div>
                        </div>

                        <div style={{marginBottom:20}} className="inputItem">
                            <div className="title">Байгууллагын регистр</div>
                            <div className="inputPar">
                                <input value={companyRegister} onChange={RegisterHandle} type="number" placeholder="Байгууллагын регистр" />
                                <RiRegisteredLine />
                                <div className="line" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                
                
                <div className="buttonPar">
                    {showErr&&<div className="ErrTxt">{errText}</div>}
                    <button type="submit">Үргэлжлүүлэх</button>
                </div>
                {loading?<LoadingStyle> <img src="/giff2.gif" /></LoadingStyle>:<></>}
            </InputParent>
        </form>
        
    )
}

export default SignUp;

const InputParent = styled.div`
    .another{
        display: flex;
        gap: 30px;
        .items{
            width: 100%;
        }
    }
`