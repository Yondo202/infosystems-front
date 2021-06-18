import htmlToText from 'html-to-text'
import {MenuContext} from '@/miscs/ContextMenuProvider'
import { useContext } from 'react';


const decrease = (string, length, mobileLength)=>{

    const {config} = useContext(MenuContext)

    let tmp = htmlToText.fromString(string);
    let linkCount = tmp.split('[').length -1

    // TO REMOVE ALL LINKS
    for(let i=0;i<linkCount; i++){
        let first = tmp.indexOf('[');
        let second = tmp.indexOf(']');
        let remove = tmp.slice(first, second+1);
        tmp = tmp.replace(remove, '');
    }

    if(config.width <= 768) return mobileLength ? tmp.slice(0,mobileLength) : tmp.slice(0,length);
    
    return tmp.slice(0,length);
}

export default decrease