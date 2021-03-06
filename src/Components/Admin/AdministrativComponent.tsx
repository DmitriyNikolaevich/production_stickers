import React, { FC, useEffect } from 'react'
import { ControllLocationForm } from './ControllLocationForm'
import { LocationSettings } from './LocationSettings'
import { BatchPrinting } from './BatchPrinting'
import { LocationsList } from './LocationsList'
import { Divider } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllLocations } from '../../redux/stickerReducer'

export const AdministrativComponent: FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllLocations())
    },[dispatch])

    return (
        <div>
            <Divider>Панель администрирования</Divider>
            <BatchPrinting />
            <ControllLocationForm />
            <LocationSettings />
            <LocationsList />
        </div>
    )
}


type PropsType = {
    
}