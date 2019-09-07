import React from 'react'
import ReactDom from 'react-dom'
import {combineReducers, createStore, compose } from 'redux'

import UserReducer from './UserReducer'
import PermisssionReducer from './PermissionReducer'
import NavReducer from './NavReducer'


const allReducer=combineReducers({
    user:UserReducer,
    permission:PermisssionReducer,
    nav:NavReducer
})

const store = createStore(allReducer, 
    {
        user:{type:'ChangeToken',payload:{Token:''}},
        permission:{type:'ChangePermission',payload:{}},
        nav:{type:'NavChange',payload:{Nav:0}}
    },
    compose(
        (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f
       )
)

console.log(store.getState())

export default store