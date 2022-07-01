import React from 'react'
import axios from 'axios'
import nookies from 'nookies'
import styled from 'styled-components'
import CFRoot from '@/components/corefeedback/CFRoot'
import SendFeedback from '@/components/corefeedback/SendFeedback'
import AdminHome from '@/components/corefeedback/receive/AdminHome'
import Auth from '@/components/corefeedback/receive/Auth'

const index = ({ data }) => {
    
    if (!data.projectid) return <h5>project ийн нэр-ээ дамжуулна уу</h5>
    if (data.projectid === 'login'){
        if( data.cf_jwt )  return <Container> <CFRoot /> <AdminHome pdata={data.projectsnamedata} cf_id={data.cf_id} /> </Container>
        return <Auth />
    }else{
        return <SendFeedback data={data} />
    }
}

export default index

export const Container = styled.div`
    background-image: url(/img/left_menu_background.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    background-color:#051e34;
    height:100vh;
    width:100%;
    display:flex;
    flex-direction:column;
`

export async function getServerSideProps(ctx){
    const cookies = nookies.get(ctx)
    let projectsname = await axios.get(process.env.serverUrl+'/projectcategories')
    let pId = projectsname?.data?.find( item=> item.name === ctx.query.pname)?.id
    let P = Object.keys(ctx.query).length === 0?'login':pId??null
    let cf_jwt = cookies.cf_jwt??null
    let cf_id = cookies.cf_id??null
    return { props: {data: { cf_jwt:cf_jwt, cf_id: cf_id, projectid: P, projectsnamedata :projectsname.data  } }}
}
  