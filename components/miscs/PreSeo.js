import Head from 'next/head';
import React from 'react';
import UserContext from '@/core/context/Context'; 
import { useContext } from "react";
import { useRouter } from 'next/router';

const PreSeo = ({seo}) => {
    const Router = useRouter();
    const ctx = useContext(UserContext);

    if(seo) {
        const { title, description, thumb } = seo;
        return (
            <Head>
                <title>{title ? title + " - " + ctx.name : ctx.name}</title>
                <meta property="og:title" content={title ? title + " - " + ctx.name : ctx.name} />
                <meta name="description" content={description ? description : ctx.description} />
                <meta property="og:description" content={description ? description : ctx.description} />
                <meta property="og:image" content={thumb ? process.env.serverUrl+thumb : '/logo_sm.png'} />
                <meta property="og:url" content={process.env.frontUrl + Router.asPath} />
                <meta property="og:type" content="article" />
                {/* <meta property="fb:app_id" content="358757829197481" /> */}
                <meta property="og:type" content="article" />
            </Head>
        );
    }else{
        return(
            <Head>
                <title>{ctx.name}</title>
                <meta property="og:title" content={ctx.name} />
                <meta name="description" content={ctx.description}/>
                <meta property="og:description" content={ctx.description} />
                <meta property="og:image" content={'/logo_sm.jpg'} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={process.env.frontUrl + Router.asPath} />
                {/* <meta property="fb:app_id" content="358757829197481" /> */}
            </Head>
        )
    }
};

export default PreSeo;