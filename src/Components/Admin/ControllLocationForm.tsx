import { Button, Cascader, Input, Space } from 'antd'
import { CascaderValueType } from 'antd/lib/cascader'
import React, { ChangeEvent, FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, deleteLocation, getLPUThunk, insertNewLocatoin } from '../../redux/stickerReducer'
import { getLPUList, getNewLocation, getSelectedLocation } from '../../redux/stickerSelectors'

export const ControllLocationForm: FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    const options = useSelector(getLPUList)

    const inputValue = useSelector(getNewLocation).location
    const newLocation = useSelector(getNewLocation)
    const selectedLocation = useSelector(getSelectedLocation)

    const onChangeCascader = (value: CascaderValueType) => {
        dispatch(actions.setNewLocationLPU(options[Number(value) - 1].value))
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
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


type PropsType = {

}