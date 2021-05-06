import React, { FC } from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { NavLink } from 'react-router-dom'

const { Header } = Layout

export const HeaderComponent: FC<PropsType> = (props) => {
    return (
    <Header>
        <div className="logo" />
        <div style={{fontSize: 'large', color: 'white', textAlign: 'left'}}><NavLink to='/' activeStyle={{ color: 'white' }}>ГБУЗ "Северская ЦРБ" МЗ КК</NavLink></div>
    </Header>)
}


type PropsType = {
    
}