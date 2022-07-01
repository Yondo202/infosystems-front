import React from "react";
import App from "next/app";
import '../style.css'
import checkLanguage from "@/miscs/checkLanguage";
// import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
// import TagManager from "react-gtm-module";
import Router from "next/router"
import { parseCookies } from "nookies"
import { UserStore } from "@/core/context/Context"
 
const MyApp = ({ Component, pageProps, router }) =>{
    const [ stateCore, setStateCore ] = React.useState({
        headerMenu: [],
        footerMenu: [],
        logo: null,
        menuTop: [],
        config: {},
        general: {},
        completelyLoaded: false,
        name: 'ИНФОСИСТЕМС',
        description: 'Манай компани 1997 оноос эхлэн Мэдээллийн технологийн салбарт програм хангамжийн чиглэлээр ажиллаж зах зээлд өөрийн гэсэн байр сууриа эзэлж, тэргүүлэгч компаниудын нэг болсон.'
    })
  
    React.useEffect(()=>{
      Fetch()
    },[])
  
    const Fetch = async () =>{
      const config = { width: window.innerWidth, height: window.innerHeight };
      try{
        const res = await checkLanguage('/settings', null, true);
        setStateCore({
            headerMenu:res.data.header_menu,
            logo : res.data.logo,
            footerMenu: res.data.FooterSector,
            completelyLoaded: true,
            config: config,
        })
        
      }catch{
        return {}
      }
    }
  
    return(
        <UserStore value={stateCore}>
            <ThemeProvider theme={theme}>
                {stateCore.completelyLoaded?
                <Component {...pageProps} key={router.route} /> 
                :<div style={{width:`100%`, height:`100vh`,display:`flex`, alignItems:"center", justifyContent:"center"}}><img src="/giff2.gif" /></div> }
            </ThemeProvider>
        </UserStore>
    )
}
  
function redirectUser(ctx, location){
    if(ctx.req){
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
    }else{
        Router.push(location);
    }
}

MyApp.getInitialProps = async({ Component, ctx }) =>{
    let pageProps = {}
    const jwt = parseCookies(ctx).jwt;
    const role = parseCookies(ctx).role;

    if(!jwt){
        if( ctx.pathname.includes("/admin") ){
            redirectUser(ctx, "/login");
        }else if (ctx.pathname.includes("/answer") || ctx.pathname.includes("/feedback")){
            redirectUser(ctx, "/p/download?redirect=true");
        }
    }else{
        if(ctx.pathname.includes("/admin") && role !== "infosystem_admin" ){
            redirectUser(ctx, "/");
        }
        if(ctx.pathname==="/login"){
            redirectUser(ctx, "/");
        }
    }
    
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx);
    }

    return{
        pageProps
    }
}

export default MyApp;



