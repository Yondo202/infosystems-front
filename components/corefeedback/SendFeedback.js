import React, { useState } from 'react'
// import { SetStorage, GetStorage } from "miscs/LocalStorage"
import axios from "axios"
import { useForm } from "react-hook-form"
import { RiImageAddFill } from "react-icons/ri"
import { Input, Upload, Modal, message } from 'antd';
import styled from 'styled-components'

const Initial = {
    name: null,
    email: null,
    description:null,
    title:null,
    // issuelevel:[],
}
const InitialImage = {
    previewVisible:false,
    previewImage: '',
    previewTitle: '',
    fileList: []
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

const SendFeedback = ({ data }) => {
    const [ load, setLoad ] = useState(false)
    const [ imageState, setImageState ] = useState(InitialImage)
    const [ iamgeArr, setImageArr ] = useState([])

    const { register, handleSubmit, formState: { errors }, clearErrors, setValue, watch, setError, reset } = useForm({
        defaultValues: Initial
    });

    const uploadButton = (
        <ImageStyle>
          <RiImageAddFill />
        </ImageStyle>
    );

    const state = watch();
    const onChangeHandle = (name, value ) =>{
        setValue(name, value);
        clearErrors()
    }

    const onSubmit  = async ()=> {
        try{
            await axios.post(process.env.serverUrl+'/coreissues', { ...state, projectcategory: data.projectid, image: iamgeArr.map(item=>item.id) })
            message.success('Хүсэлт амжилттай. Баярлалаа...', 3);
            setImageArr([]);
            setImageState(InitialImage);
            reset(Initial);
        }catch(err){
            if (err.response?.data?.error?.message?.includes('email') || err.response?.data?.data.errors?.email){
                message.warning('Имэйл хэсэгээ шалгана уу', 3)
                setError('email', { message: "Имэйл формат буруу байна", })
            } else{
                message.warning('Хүсэлт амжилтгүй', 3)
            }
        }
    };

    const handleCancel = () => {
        setImageState(prev=> ({ ...prev, previewVisible: false }))
    };

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setImageState(prev=>(
            {   ...prev,
                previewImage: file.url || file.preview,
                previewVisible: true,
                previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
            }
        )) ;
    };

    const handleChange = (props) =>{
        uploadHandle(props.file, props.fileList)
    };


    const uploadHandle = (file, fileList) =>{
        if ( file.status !== "removed" && iamgeArr.some(item=>item.name === file.name)){
            message.warning('Хавсаргасан зураг байна!')
        }else{
            setImageState(prev=> ({ ...prev, fileList: fileList }))
            if( file.status === "done" || file.status === "error"){
                    setLoad(true);
                    const image = new FormData();
                    image.append("files", file.originFileObj);
                    axios.post(process.env.serverUrl+`/upload`, image).then(res=>{
                        setImageArr(prev=>[ ...prev, res?.data[0] ])
                        setImageState(prev=> ({ ...prev, fileList: fileList.map(el=>{
                            if(el.name === file.name){
                                el.status = "done"
                                return el
                            }else{
                                return el
                            }
                        })}))
                    }).catch(_=>{
                        message.warning('Хавсаргалт амжилтгүй!')
                    }).finally(_=>setLoad(false))
            }else if( file.status === "removed" ){
                setImageArr(prev=>[ ...prev.filter(item=>item.name !== file.name )])
            }
        }
    }

    return (
        <Container >
            <div className="content">
                <div className="header">
                    <h5 className="title">Шинэ тусламжийн хүсэлт илгээх</h5>
                    <div className="description">Та доорх хэсгийг бөглөнө үү. Бид таны ирүүлсэн хүсэлтийн дагуу холбогдох заавар зөвлөмжийг өгөх бөгөөд хэт ерөнхий буюу асуудал нь тодорхой бус, баримт зураг хавсаргаагүй, мэдээлэл дутуу тохиолдолд таны асуудлыг шийдвэрлэх боломжгүй болохыг анхаарна уу.</div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="inputs_body">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="input_par">
                                <div className="label">Нэр <span className="required">*</span></div>
                                <Input
                                    { ...register('name', { required: 'Нэр ээ оруулна уу' }) }
                                    className={errors.name?.message?`err_style`:``}
                                    value={state.name}
                                    size="medium"
                                    onChange={el => onChangeHandle(el.target.name, el.target.value)}
                                />
                                {errors.name?.message&&<span className="err_text">{errors.name?.message}</span>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="input_par">
                                <div className="label">И-Мэйл <span className="required">*</span></div>
                                <Input
                                    { ...register('email', { required: 'email ээ оруулна уу' }) }
                                    className={errors.email?.message?`err_style`:``}
                                    value={state.email}
                                    size="medium"
                                    onChange={el => onChangeHandle(el.target.name, el.target.value)}
                                />
                                {errors.email?.message&&<span className="err_text">{errors.email?.message}</span>}
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    <div className="input_par">
                        <div className="label">Гарчиг <span className="required">*</span></div>
                        <Input
                            { ...register('title', { required: 'Гарчигаа оруулна уу' }) }
                            className={errors.title?.message?`err_style`:``}
                            value={state.title}
                            size="medium"
                            onChange={el => onChangeHandle(el.target.name, el.target.value)}
                        />
                        {errors.title?.message&&<span className="err_text">{errors.title?.message}</span>}
                    </div>

                    <div className="input_par">
                        <div className="label">Дэлгэрэнгүй тайлбар <span className="required">*</span></div>
                        <Input.TextArea
                            showCount
                            maxLength={1000}
                            rows={5} 
                            { ...register('description', { required: 'Дэлгэрэнгүй тайлбар аа оруулна уу' }) }
                            className={errors.description?.message?`err_style`:``}
                            value={state.description}
                            size="medium"
                            onChange={el => onChangeHandle(el.target.name, el.target.value)}
                        />
                        <div className="description"> Та өөрт тулгарсан асуудлыг ойлгомжтой бичиж оруулна уу. Асуудал нь товч бөгөөд тодорхой байх тусам хурдан шийдэгдэх болно.</div>
                        {errors.description?.message&&<span className="err_text">{errors.description?.message}</span>}
                    </div>

                    <div className="inputs_body">
                        <div className="input_par">
                            <div className="label">Зураг хавсаргах </div>
                            <>
                                <Upload
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    listType="picture-card"
                                    fileList={imageState.fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {imageState.fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={imageState.previewVisible}
                                    title={imageState.previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img alt="example" style={{ width: '100%' }} src={imageState.previewImage} />
                                </Modal>
                            </>
                        </div>

                    </div>

                    <button disabled={load} className="btn btn-primary btn-lg btn-block universal_save_bar_save_btn support-submit">Илгээх</button>
                </form>
            </div>
        </Container>
    )
}

export default SendFeedback

const ImageStyle = styled.div`
    svg{
        font-size:30px;
    }
    .custom_svg{
        margin-top:8px;
        font-size:12px;
    }
`

const Container = styled.div`
    background-color:#051e34;
    height:100vh;
    .content{
        background-color:#fff;
        border:1px solid rgba(0,0,0,0.2);
        padding:20px 20px;
        height:100%;
        max-height:100%;
        overflow-y:auto;
        .btn{
            display:block;
            width:100%;
            margin:18px 0px;
        }
        .header{
            margin-bottom: 1.2rem !important;
            padding-bottom:1rem;
            border-bottom:1px solid rgba(0,0,0,0.2);
            .title{
                color:#283e57;
                font-weight: 600;
            }
            .description{
                line-height: 18px;
                font-size:12.5px;
                color:#476282;
            }
        }
        .input_par{
            width:100%;
            margin-bottom:15px;
            position:relative;
            .description{
                padding:5px 0px;
                line-height: 18px;
                font-size:12.5px;
                color:#476282;
            }
            .err_text{
                position:absolute;
                top:105%;
                right:0;
                font-size:11px;
                color:red;
            }
            .label{
                color:#283e57;
                font-size:13px;
                font-weight:500;
                margin-bottom:8px;
                .required{
                    color:#eb2329;
                }
            }
            .ant-input{
                font-size: 14px;
                color:#000;
                font-weight:500;
            }
            .ant-input-lg{
                padding-bottom: 8px;
            }
            .ant-select{
                width:100%;
                font-weight:500;
            }
            .ant-input-number{
                width:100%;
                .ant-input-number-input-wrap{
                    input{
                        font-size: 14px;
                        color:#000;
                        font-weight:500;
                    }
                }
                .ant-input-number-handler-wrap{
                    display:none;
                }
            }
            .err_style{
                border:1px solid #dc3c1e !important;
                color:#dc3c1e !important;
            }
        }
    }
`