import React from 'react'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'

const { Header } = Layout

export const HeaderComponent = (props) => {
    return (
    <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">Печать наклеек с штрихкодом</Menu.Item>
        </Menu>
    </Header>)
}