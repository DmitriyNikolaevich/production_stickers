import { Button, Cascader, Input, InputNumber, Space } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, getLPUThunk } from '../../redux/stickerReducer'
import { getLPUList } from '../../redux/stickerSelectors'

export const ControllLocationForm = (props) => {

    const dispatch = useDispatch()

    const options = useSelector(getLPUList)

    const onChangeCascader = (value) => {
        dispatch(actions.setNewLocationLPU(options[value].value))
    }

    const onChangeInput = (e) => {
        dispatch(actions.setNewLocationLocation(e.target.value))
    }

    const addLocation = () => {
        
    }

    const removeLocation = () => {

    }

    useEffect(() => {
        dispatch(getLPUThunk())
    },[options])
    
    return (
        <div>
            <Space>
            <Cascader options={options} onChange={onChangeCascader} placeholder="Выберете ЛПУ" style={{width: '300px'}} />
            <Input placeholder="Введите локацию" style={{ width: '300px' }} onChange={onChangeInput} />
            <Button type="primary" onClick={addLocation}>Добавить локацию</Button>
            <Button type="primary" onClick={removeLocation}>Удалить локацию</Button>
            </Space>
        </div>
    )
}