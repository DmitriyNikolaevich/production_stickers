import React, { useEffect } from 'react'
import { ControllLocationForm } from './ControllLocationForm'
import { LocationSettings } from './LocationSettings'
import { LocationsList } from './LocationsList'
import { Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getLocations } from '../../redux/stickerSelectors'
import { getAllLocations } from '../../redux/stickerReducer'
import { numberAPI } from '../../API/numberAPI'

export const AdministativComponent = (props) => {

    const locations = useSelector(getLocations)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllLocations())
    },[])

    const data = 2

    const anser = numberAPI.postNewLocation(data).then(res => {
        console.log(res);
    })
    
    return (
        <div>
            {console.log(locations)}
            <Divider>Панель администрирования</Divider>
            <ControllLocationForm />
            <LocationSettings />
            <LocationsList locations={locations} />
        </div>
    )
}