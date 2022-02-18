// import React, { lazy, useEffect, useState } from 'react';
// const importComponent = Name => lazy(()=>import(`../${Name}`));

// const ResolveComponent = ({data}) => {

//     const [views, setViews] = useState([]);

//     useEffect(()=>{
//         async function loadViews(){
//             const componentPromises = data.map(async (el,i) => {
//                 const Comp = await importComponent(sanitizeComponentName(el.__component));
//                 return <Comp key={'cmp'+i} data={el}/>
//             });
//             Promise.all(componentPromises).then(setViews);
//         }
//         loadViews()
//     },[data])
//     return (
//         <React.Suspense
//          fallback={<div style={{width:`100%`, height:`100vh`,display:`flex`, alignItems:"center", justifyContent:"center"}}>
//                         <img src="/giff2.gif" />
//                     </div>}>
//                 {views}
//         </React.Suspense>
//     );
// };

// export default ResolveComponent;

// const sanitizeComponentName = (name) => {

//     let final = name.slice(name.indexOf(".")+1, name.length).replace(/-/g, '');
//     return capitalizeFirstLetter(final)
// }

// function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }



import React, { lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import nProgress from 'nprogress';

const importComponent = Name => lazy(()=>import(`../${Name}`));

const ResolveComponent = ({data}) => {
    const [views, setViews] = useState([]);

    useEffect(()=>{
        async function loadViews(){
            nProgress.start()
            const componentPromises = data.map(async (el,i) => {
                const Comp = await importComponent(sanitizeComponentName(el.__component));
                return <Comp key={'cmp'+i} data={el}/>
            });
            Promise.all(componentPromises).then(setViews);
            nProgress.done()
        }
        loadViews()
    },[data])
    return (
        <React.Suspense fallback={<Container></Container>}>
            {views}
        </React.Suspense>
    );
};


export default ResolveComponent;

const sanitizeComponentName = (name) => {
    let final = name.slice(name.indexOf(".")+1, name.length).replace(/-/g, '');;
    return capitalizeFirstLetter(final)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Container = styled.div `
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
`