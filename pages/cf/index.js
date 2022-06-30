import React from 'react'
import axios from 'axios'
import nookies from 'nookies'
import SendFeedback from '@/components/corefeedback/SendFeedback'
import AdminHome from '@/components/corefeedback/receive/AdminHome'
import Auth from '@/components/corefeedback/receive/Auth'

const index = ({ data }) => {
    if (!data.projectid) return <h5>project ийн нэр-ээ дамжуулна уу</h5>
    if (data.projectid === 'login'){
        if( data.cf_jwt )  return < AdminHome cf_id={data.cf_id} />
        return <Auth />
    }else{
        return <SendFeedback data={data} />
    }
}

export default index

export async function getServerSideProps(ctx){
    const cookies = nookies.get(ctx)
    let projectsname = await axios.get(process.env.serverUrl+'/projectcategories')
    let pId = projectsname?.data?.find( item=> item.name === ctx.query.pname)?.id
    let P = Object.keys(ctx.query).length === 0?'login':pId??null
    let cf_jwt = cookies.cf_jwt??null
    let cf_id = cookies.cf_id??null
    return { props: {data: { cf_jwt:cf_jwt, cf_id: cf_id, projectid: P  } }}
}
  