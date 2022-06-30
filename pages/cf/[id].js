import React from 'react'
import axios from 'axios'
import nookies from 'nookies'
import Auth from '@/components/corefeedback/receive/Auth'
import Issue from '@/components/corefeedback/receive/Issue'

const ids = ({ data, cf_jwt }) => {
    if( cf_jwt )  return < Issue data={data} />
    return <Auth />
}

export default ids

// getServerSideProps
// getStaticProps
export async function getServerSideProps(ctx){
    const cookies = nookies.get(ctx)
    let fetched =  await axios.get(process.env.serverUrl+`/coreissues/${ctx.params.id}`)
    return { props: { data: fetched?.data, cf_jwt:cookies.cf_jwt??null }}
}
  
  // , revalidate: 60