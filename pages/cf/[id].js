import React from 'react'
import axios from 'axios'
import nookies from 'nookies'
import CFRoot from '@/components/corefeedback/CFRoot'
import Auth from '@/components/corefeedback/receive/Auth'
import { Container } from "./index"
import Issue from '@/components/corefeedback/receive/Issue'

const ids = ({ data, cf_jwt }) => {
    if( cf_jwt )  return <Container><CFRoot /> <Issue data={data} /> </Container>
    return <Auth />
}

export default ids

export async function getServerSideProps(ctx){
    const cookies = nookies.get(ctx)
    let fetched =  await axios.get(process.env.serverUrl+`/coreissues/${ctx.params.id}`)
    let cf_jwt = cookies.cf_jwt??null
    let data = fetched?.data??{}
    return { props: { data: data, cf_jwt: cf_jwt }}
}
  