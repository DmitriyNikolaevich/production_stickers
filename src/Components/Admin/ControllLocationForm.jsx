import { Button, Cascader, Input, Space } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, deleteLocation, getLPUThunk, insertNewLocatoin } from '../../redux/stickerReducer'
import { getLPUList, getNewLocation, getSelectedLocation } from '../../redux/stickerSelectors'

export const ControllLocationForm = (props) => {

    const dispatch = useDispatch()

    const options = useSelector(getLPUList)

    const inputValue = useSelector(getNewLocation).location
    const newLocation = useSelector(getNewLocation)
    const selectedLocation = useSelector(getSelectedLocation)

    const onChangeCascader = (value) => {
        dispatch(actions.setNewLocationLPU(options[value - 1].value))
    }

    const onChangeInput = (e) => {
        dispatch(actions.setNewLocationLocation(e.target.value))
    }

    const addLocation = () => {
        dispatch(insertNewLocatoin(JSON.stringify(newLocation)))
    }

    const removeLocation = () => {
        dispatch(deleteLocation(selectedLocation))
    }

    useEffect(() => {
        dispatch(getLPUThunk())
    },[options, dispatch])
    
    return (
        <div>
            <Space>
            <Cascader options={options} onChange={onChangeCascader} placeholder="Выберете ЛПУ" style={{width: '300px'}} />
            <Input placeholder="Введите локацию" style={{ width: '300px' }} onChange={onChangeInput} value={inputValue} />
            <Button type="primary" onClick={addLocation}>Добавить локацию</Button>
            <Button type="primary" onClick={removeLocation}>Удалить локацию</Button>
            </Space>
        </div>
    )
}