import React from "react"
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#fff",
    "1.0": "#fff"
  },
  barThickness:2,
  shadowBlur: 5,
});

const TopLoad =({Router})=> {
    const [ topLoad, setTopLoad ] = React.useState(false);
    React.useEffect(()=>{
        RouteHandle();
    },[])   

    const RouteHandle = async () =>{
       await Router.events.on('routeChangeStart', (url)=>{
            setTopLoad(true)
        });

       await Router.events.on('routeChangeComplete', (url)=>{
            setTopLoad(false);
        })
    }

    return (
        <div>
            {topLoad?<TopBarProgress />:null}
        </div>
    )
}
export default TopLoad;