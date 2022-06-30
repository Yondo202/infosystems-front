import React, { useEffect } from 'react'
import axios from "axios"
import { setCookie } from 'nookies'
import styled from 'styled-components'
import Router from "next/router"
import { Input, message } from 'antd'
import { useForm } from 'react-hook-form'
import { EyeInvisibleOutlined, EyeTwoTone, UnlockOutlined, UserOutlined } from '@ant-design/icons';

const initial = { identifier: null, password: null }

let oneWeek = 7 * 24 * 3600 * 1000; //1 weeks  

const Auth = ({ }) => {
    const { register, handleSubmit, formState:{ errors }, clearErrors, setValue, watch } = useForm({
        defaultValues: initial,
    });

    const LoginInfo = watch()

    const SubmitHandle =_=> {
        LoginHandle()
    }

    const onChange = (name, value) =>{
        clearErrors();
        setValue(name, value);
    }

    useEffect(()=>{
        let name = localStorage.getItem('cf_name')
        if(name) return setValue('identifier', name)
    },[])

    const LoginHandle = () =>{
        axios.post(process.env.serverUrl+`/auth/local`, LoginInfo ).then(res=>{
            setCookie(null, 'cf_jwt', res.data.jwt,{ maxAge: oneWeek, path:"/" });
            setCookie(null, 'cf_username', res.data.user.username, { maxAge: oneWeek, path:"/" });
            setCookie(null, 'cf_id', res.data.user.id, { maxAge: oneWeek, path:"/" });
            localStorage.setItem('cf_name', LoginInfo.identifier);
            Router.push(Router.asPath);
        }).catch(_=>{
            message.warning('Нэвтрэх нэр юмуу нууц үг буруу байна!', 3)
        })
    }

    return (
        <Container>
            <div className="middle_body">
                {/* <div className="head_logo">
                    <img src="/image/infosystems_logo_main.png" />
                </div> */}
                <div />
                <form onSubmit={handleSubmit(SubmitHandle)}>
                    <div className="input_body">
                        <h5 className="title">Нэвтрэх</h5>

                        <div className="input_sector">
                            <div className="label">Нэвтрэх нэр</div>
                            <Input
                                {...register("identifier", { required: true })}
                                value={LoginInfo.identifier}
                                className={errors.identifier ? `err_style` : ``}
                                onChange={el => onChange(el.target.name, el.target.value)}
                                // err={errors.identifier?.message}
                                prefix={<UserOutlined />} 
                                size="large"
                            />
                        </div>

                        <div className="input_sector">
                            <div className="label">Нууц үг</div>
                            <Input.Password 
                                {...register("password", { required: true })}
                                onChange={el => onChange(el.target.name, el.target.value)}
                                className={errors.password ? `err_style` : ``}
                                size="large"
                                prefix={<UnlockOutlined />} 
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </div>
                        <button className="btn btn-primary btn-md btn-block universal_save_bar_save_btn support-submit">Нэвтрэх</button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Auth

const Container = styled.div`
    width:100vw;
    height:100vh;
    background-color:#193048;
    display:flex;
    justify-content:center;
    .middle_body{
        width:360px;
        margin-top:8rem;
        form{
            width:100%;
        }
        .head_logo{
            width:50%;
            padding: 30px 0px 54px 0px;
            img{
                width:100%;
                height:auto;
                object-fit:contain;
            }
        }
        .input_body{
            background-color:#fff;
            width:100%;
            border:1px solid rgba(0,0,0,0.1);
            padding:40px 50px 50px 50px;
            border-radius:5px;
            box-shadow:1px 1px 16px -11px; 
            .btn{
                margin-top:18px;
                width:100%;
            }
            .addition_handle{
                padding:16px 0px;
                margin-top:20px;
                color:#0077C5;
                border-top:1px solid rgba(0,0,0,0.1);
                text-align:center;
                .menus{
                    padding:6px 0px;
                    cursor:pointer;
                }
            }
            .custom_button{
                margin-top:40px;
                width:100%;
                padding: 8px 20px;
                font-weight:500;
                border-bottom:1px solid rgba(0,0,0,0.4);
                svg{
                    font-size:20px;
                }
            }
            .title{
                // text-align:center;
                margin-bottom:40px;
                
            }
            .input_sector{
                margin-bottom:30px;
                .ant-input{
                    font-size:${props=>props.theme.fontSizeMd} !important;
                }
                .label{
                    font-size:13px !important;
                    color:rgba(0,0,0,0.7);
                    font-weight:500;
                    margin-bottom:8px;
                }
                svg{
                    margin-right:4px;
                    color:solid rgba(0,0,0,0.7);
                }
                .err_style{
                    border:1px solid #dc3c1e !important;
                    color:#dc3c1e;
                    &:hover ~ .err_message{
                        display:block !important;
                    }
                    svg{
                        color:#dc3c1e;
                    }
                   
                }
            }
        }
    }
    
`
