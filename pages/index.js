import React, { useEffect, useState } from "react";
import Root from "@/core/Root"
import ResolveComponent from "@/components/dynamic/ResolveComponent"
import checkLanguage from "@/components/miscs/checkLanguage";

export default function Home({ data }) {
  const [loaded, setLoaded] = useState(false);
    useEffect(()=>{
        setLoaded(true);
    },[]);
  return (
      <Root>
          {loaded && <ResolveComponent data={data.Layout}/> }
      </Root>
  )
}



// getServerSideProps
// getStaticProps
export async function getServerSideProps({req}){
  let res = await checkLanguage('/home', req, true);
  return {props: {data: res.data}}
}

// , revalidate: 60