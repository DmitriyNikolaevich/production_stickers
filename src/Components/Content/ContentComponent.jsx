import React, { useEffect } from 'react'
import { Layout, Button, InputNumber } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { actions, printRepeatNumberThunk, printStickersThunk, showLocationThunk } from '../../redux/stickerReducer'
import { BarcodeContainer } from './BarcodeContainer'
import { getRepeatStickerValue } from '../../redux/stickerSelectors'

const { Content } = Layout

export const ContentComponent = (props) => {

    const id = Number(window.location.pathname.slice(1))

    const inputRepeatValue = useSelector(getRepeatStickerValue)

    const dispatch = useDispatch()

    const printStickers = () => {
        const el = document.getElementById('for-print')
        const printWindow = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0')
        printWindow.document.write(
          '<html><head><title></title><style>@page { size: auto;  margin: 0mm; }</style></head><body style="margin: 0">'
        )
        printWindow.document.write(el.innerHTML)
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
    }
    
    const onClick = () => {
        dispatch(actions.setUserID(id))
        console.log(id);
        if (inputRepeatValue === 0) {
            dispatch(printStickersThunk(printStickers, id))
        } else {
            dispatch(printRepeatNumberThunk(inputRepeatValue, printStickers))
        }
    }

    const onChengeRepeatNumber = (value) => {
        dispatch(actions.setRepeatStickerValue(value))
    }

    useEffect(() => {
        dispatch(showLocationThunk(id))
    })

    return (
        <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
            <div className="site-layout-content">
                <div>
                    <Button type="primary" danger style={{ width: '500px', height: '250px', fontSize: '35px' }} onClick={onClick}>
                        Напечатать этикетку
                    </Button>
                </div>
                <InputNumber min={1} max={999999} defaultValue={0} style={{ marginTop: '20px' }} onChange={onChengeRepeatNumber} value={inputRepeatValue} /> Укажите номер этикетки для повторной печати
            </div>
            <div id="for-print" hidden>
                <BarcodeContainer />
            </div>
        </Content>)
}