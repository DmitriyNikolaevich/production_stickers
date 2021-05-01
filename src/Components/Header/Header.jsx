import React from 'react'
import { Layout } from 'antd'
import 'antd/dist/antd.css'

const { Header } = Layout

export const HeaderComponent = (props) => {
    return (
    <Header>
        <div className="logo" />
        <div style={{fontSize: 'large', color: 'white', textAlign: 'left'}}>ГБУЗ "Северская ЦРБ" МЗ КК</div>
    </Header>)
}