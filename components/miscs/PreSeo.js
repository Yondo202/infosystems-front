import Head from 'next/head';
import React from 'react';
import UserContext from '@/core/context/Context'; 
import { useContext } from "react";
import { useRouter } from 'next/router';

const PreSeo = ({seo}) => {
    const Router = useRouter();
    const ctx = useContext(UserContext);

    if(seo) {
        const {title, description, thumb, article} = seo
        return (
            <Head>
                <title>{title ? title + " - " + ctx.name : ctx.name}</title>
                <meta property="og:title" content={title ? title + " - " + ctx.name : ctx.name} />
                <meta name="og:description" content={description ? description : ctx.description}/>
                <meta property="og:description" content={description ? description : ctx.description} />
                <meta property="og:image" content={thumb ? thumb : '/img/logo.png'} />
                <meta property="og:url" content={process.env.frontUrl + Router.asPath} />
                {article && <meta property="og:type" content="article" />}
            </Head>
        );
    }
    return(
        <Head>
            <title>{ctx.name}</title>
            <meta property="og:title" content={ctx.name} />
            <meta name="description" content={ctx.description}/>
            <meta property="og:description" content={ctx.description} />
            <meta property="og:image" content={'/img/logo.jpg'} />
            <meta property="og:url" content={process.env.frontUrl + Router.asPath} />
        </Head>
    )
    
};

export default PreSeo;