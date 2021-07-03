import React from 'react'
import styled from 'styled-components';
import LeftMenu from '@/components/admin/LeftMenu';
import TopMenu from "@/components/admin/TopMenu"
import HomeUsers from "@/components/admin/users/HomeUsers"

const Users = ({data, cond, users}) => {
    return (
        <>
            {!cond?
            <Component>
                <LeftMenu />
                <div className="right">
                    <div className="ghost" />
                    <TopMenu />
                    <HomeUsers users={users} data={data} />
                </div>
            </Component>
            :<Errors><h1>Эрх хүрэлцэхгүй байна</h1></Errors>}
        </>
    )
}
export default Users;

const Errors = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;
    width: 100vw;
`
const Component = styled.div`
    display: flex;
    .right{
        width: 100%;
        position: relative;
        .ghost{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: ${props=>props.theme.mainColor4};
            border-radius: 0px 0px 10px 10px;
            z-index: -1;
        }
    }
`

// MainFeedback.getInitialProps = async ctx =>{
//     const {jwt} = parseCookies(ctx);
//     try{
//         let res = await axios.get(`${process.env.serverUrl}/infosystem-reports`, { headers:{ Authorization: `bearer ${jwt}` } })
//         let users =  await axios.post(`${process.env.serverUrl}/graphql`, {
//             query:`query { users{  id username email company_name company_register created_at }
//             }`
//         },{ headers: {
//             Authorization: `Bearer ${jwt}`
//           } })
//         return {data: res.data, users:users.data.data?.users, cond:true}
//     }catch{
//         return {data: [], users:[], cond:false}
//     }
// }

// export default MainFeedback



