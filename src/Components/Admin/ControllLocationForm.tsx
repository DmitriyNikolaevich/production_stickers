import { List, Button, Cascader, Divider, Input, Space, Checkbox } from 'antd'
import { CascaderValueType } from 'antd/lib/cascader'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import React, { ChangeEvent, FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/stickerReducer'
import { getAddedLocationAccessListItems, getLPUList, getNewLocation, getSelectedLocation } from '../../redux/stickerSelectors'

export const ControllLocationForm: FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    const options = useSelector(getLPUList)

    const inputValue = useSelector(getNewLocation).location
    const newLocation = useSelector(getNewLocation)
    const selectedLocation = useSelector(getSelectedLocation)
    const listItems = useSelector(getAddedLocationAccessListItems)

    //переменная хранит добавляемые опции новому пользователю
    const userAccesses: UserAccessType = {
        batch: false,
        operativStatisticViewAccess: false
    }

    const onChangeCascader = (value: CascaderValueType) => {
        dispatch(actions.setNewLocationLPU(options[Number(value) - 1].value))
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(actions.setNewLocationLocation(e.target.value))
    }
    //обработка чекбокса добавления опций новому пользователю
    const onChangeCheckBox = (e: CheckboxChangeEvent) => {
        const value = e.target.id as "batch" | "operativStatisticViewAccess"
        e.target.checked ? userAccesses[value] = true : userAccesses[value] = false
        dispatch(actions.setUserAccesses(userAccesses))
      }

    const addLocation = () => {
        dispatch(actions.insertNewLocatoinSagsaAC(JSON.stringify(newLocation)))
    }

    const removeLocation = () => {
        dispatch(actions.deleteLocationSagsaAC(selectedLocation))
    }

    useEffect(() => {
        dispatch(actions.getLPUSagsaAC())
    }, [options, dispatch])

    return (
        <div>
            <Space>
                <Cascader options={options} onChange={onChangeCascader} placeholder="Выберете ЛПУ" style={{ width: '300px' }} />
                <Input placeholder="Введите локацию" style={{ width: '300px' }} onChange={onChangeInput} value={inputValue} />
                <Button type="primary" onClick={addLocation}>Добавить локацию</Button>
                <Button type="primary" onClick={removeLocation}>Удалить локацию</Button>
            </Space>
            <Divider>Дополнительные опции</Divider>
            <Space>
                <List
                    header={<div>Дополнительные опции</div>}
                    bordered
                    dataSource={listItems}
                    renderItem={item => (
                        <List.Item>
                            <Checkbox onChange={onChangeCheckBox} id={item.id}>{item.name}</Checkbox>
                        </List.Item>
                    )}
                />
            </Space>
        </div>
    )
}


type PropsType = {

}

type UserAccessType = {
    batch: boolean
    operativStatisticViewAccess: boolean
}