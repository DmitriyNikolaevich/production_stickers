import React from 'react'
import { ControllLocationForm } from './ControllLocationForm'
import { LocationSettings } from './LocationSettings'
import { LocationsList } from './LocationsList'
import { Divider } from 'antd'

export const AdministativComponent = (props) => {

    
    return (
        <div>
            <Divider>Панель администрирования</Divider>
            <ControllLocationForm />
            <LocationSettings />
            <LocationsList />
        </div>
    )
}