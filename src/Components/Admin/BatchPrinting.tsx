import { Divider, InputNumber } from 'antd'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCopySelector } from '../../redux/stickerSelectors'
import { actions } from '../../redux/stickerReducer'

export const BatchPrinting: FC<PropsType> = (props) => {

    const copyValue = useSelector(getCopySelector)

    const dispatch = useDispatch()

    const onChange = (value: number) => {
        dispatch(actions.setCopyAction(value))
    }

    return (
        <div>
            <InputNumber min={1} max={1000} value={copyValue} onChange={onChange} /> Массовая печать стикеров
            <Divider></Divider>
        </div>
    )
}


type PropsType = {
    
}