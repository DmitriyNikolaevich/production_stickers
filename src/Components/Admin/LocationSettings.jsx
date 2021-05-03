import { Divider, InputNumber } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocationCopyCount } from '../../redux/stickerReducer'
import { getCopyCountSelector, getSelectedLocation } from '../../redux/stickerSelectors'

export const LocationSettings = (props) => {

    const selectedLocation = useSelector(getSelectedLocation)
    const selectedLocationCopyCount = useSelector(getCopyCountSelector)

    const dispatch = useDispatch()

    const onChangeCopy = (value) => {
        let data = { copyCount: value, location: selectedLocation }
        if (selectedLocation === 0) {
            alert('Не выбрана локация для изменения')
        } else {
            dispatch(setLocationCopyCount(data))
        }
    }
    
    return (
        <div style={{ marginTop: '32px' }}>
                <Divider />
                <InputNumber min={1} max={2} value={selectedLocationCopyCount} onChange={onChangeCopy} /> количество копий для выбранной локации
        </div>
    )
}