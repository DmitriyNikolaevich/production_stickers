import React, { FC } from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { NavLink } from 'react-router-dom'

const { Header } = Layout

export const HeaderComponent: FC<PropsType> = (props) => {

    const navLinkStyle: React.CSSProperties = {         //стили для NavLink
        fontSize: 'large',
        color: 'white'
    }

    const headerStyle: React.CSSProperties = {         //стили для Header
        textAlign: 'left'
    }

    return (
    <Header style={headerStyle}>
            <NavLink to='/' activeStyle={{ color: 'white' }} style={navLinkStyle}>
                ГБУЗ "Северская ЦРБ" МЗ КК
            </NavLink>
    </Header>)
}


type PropsType = {
    
}