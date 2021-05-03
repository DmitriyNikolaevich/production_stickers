import { Divider, InputNumber } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCopySelector } from '../../redux/stickerSelectors'
import { actions } from '../../redux/stickerReducer'

export const BatchPrinting = (props) => {

    const copyValue = useSelector(getCopySelector)

    const dispatch = useDispatch()

    const onChange = (value) => {
        dispatch(actions.setCopyAction(value))
    }

    return (
        <div>
            <InputNumber min={1} max={1000} value={copyValue} onChange={onChange} /> Массовая печать этикеток
            <Divider></Divider>
        </div>
    )
}