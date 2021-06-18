import React from 'react';

const MenuContext = React.createContext();

const MenuProvider = MenuContext.Provider
const MenuConsumer = MenuContext.Consumer

export {MenuProvider, MenuConsumer, MenuContext}