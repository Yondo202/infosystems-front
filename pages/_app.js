import React from "react";
import App from "next/app";
import checkLanguage from "@/miscs/checkLanguage";
import { MenuProvider } from "@/miscs/ContextMenuProvider";
import { ThemeProvider } from "styled-components";
import * as theme from "@/miscs/theme";
// import TagManager from "react-gtm-module";


class MyApp extends App {
    state = {
      headerMenu: [],
      footerMenu: [],
      logo: null,
      menuTop: [],
      config: {},
      general: {},
        completelyLoaded: false,
        name: 'ИНФОСИСТЕМС',
        description: 'To be continued...'
    };
    
    async componentDidMount() {
        const res = await checkLanguage('/settings', null, true);
        const config = {width: window.innerWidth, height: window.innerHeight};
        console.log(`res`, res);
        if(res.data.header_menu?.length){
            this.setState({
                completelyLoaded: true,
                headerMenu:res.data.header_menu,
                logo : res.data.logo,
                footerMenu: res.data.FooterSector,
                // menuTop: res.data.help_menu,
                // general: {social: res.data.Social_links,copyright: res.data.Copyright},
                config
            });
        }

        // GOOGLE TAG MANAGER
        // const tagManagerArgs = { gtmId: "GTM-5GWNX89" };
        // TagManager.initialize(tagManagerArgs);
    }



    render() {
        const { Component, pageProps, router } = this.props;
            return (
                <ThemeProvider theme={theme}>
                    <MenuProvider value={this.state}>
                           {this.state.completelyLoaded? <Component {...pageProps} key={router.route} /> 
                           :<div style={{width:`100%`, height:`100vh`,display:`flex`, alignItems:"center", justifyContent:"center"}}> <img src="/giff2.gif" /></div> }
                    </MenuProvider>
                </ThemeProvider>
            );
    }
}

export default MyApp;


