import { Divider, InputNumber } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { actions } from '../../redux/stickerReducer'
import { getCopySelector } from '../../redux/stickerSelectors'

export const LocationSettings = (props) => {

    const onChangeCopy = (value) => {
        actions.setCopyAction(value)
    }

    const value = useSelector(getCopySelector)

    
    return (
        <div style={{ marginTop: '32px' }}>
                <Divider />
                <InputNumber min={1} max={2} defaultValue={value} onChange={onChangeCopy} /> количество копий для выбранной локации
        </div>
    )
}