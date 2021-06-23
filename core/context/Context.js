import React, { useEffect, useState } from 'react'
const UserContext = React.createContext();
import { useRouter } from 'next/router'
import axios from 'axios';

export const UserStore = (props) => {
    const router = useRouter()
    const { ids } = router.query
    const { slug } = router.query
    const [ alert, setAlert ] = useState({ color: 'white', text: '', cond: false });
    const [ Product, setProduct ] = useState({});

    useEffect(()=>{
        if(!Product.id && ids){
            FetchMenu()
        }else if(slug){
            FetchMenu2();
        }
    },[slug, ids]);

    const FetchMenu = async () =>{
        let res2 = await axios.post(`${process.env.serverUrl}/graphql`, { query:`query{ products(where:{ id: ${ids} }){ id title slug }  } `})
        setProduct(res2?.data?.data?.products[0]);
    }

    const FetchMenu2 = async () =>{
        let res2 = await axios.post(`${process.env.serverUrl}/graphql`, { query:`query{
            productFeedbacks( where: { id: ${slug} }){
             id name  created_at
             product{ id title }
            }
        }`})

        console.log(`res2`, res2?.data?.data?.productFeedbacks[0]);
        setProduct(res2?.data?.data?.productFeedbacks[0]?.product);
    }
    
    const alertFunc = (color, text, cond)=>{
        setAlert({ color: color, text: text, cond: cond });
        setTimeout(() => { setAlert({ color: 'white', text: '', cond: false }); }, 4000);
    }

    const TargetProduct = (el) =>{
        setProduct(el)
    }
    
    return (
        <UserContext.Provider value={{ alert, alertFunc, TargetProduct, Product }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;