import React, { FC, useEffect } from 'react'
import { Layout, Button, InputNumber, Divider } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { actions, getLocationCopyCount, GetNumberDataType, printRepeatNumberThunk, printStickersThunk, showLocationThunk } from '../../redux/stickerReducer'
import { BarcodeContainer } from './BarcodeContainer'
import { getCopySelector, getRepeatStickerValue, getUserBatchAccessSelector } from '../../redux/stickerSelectors'
import { BatchPrinting } from '../Admin/BatchPrinting'

const { Content } = Layout

export const ContentComponent: FC<PropsType> = (props) => {

    const id = isNaN(Number(window.location.pathname.slice(1))) ? 3 : Number(window.location.pathname.slice(1))

    const inputRepeatValue = useSelector(getRepeatStickerValue)
    const copy = useSelector(getCopySelector)
    const batchAccess = useSelector(getUserBatchAccessSelector)

    const dispatch = useDispatch()

    const data: GetNumberDataType = {
        id: id,
        copy: copy
    }

    const printStickers = () => {
        const el: HTMLElement = document.getElementById('for-print') as HTMLElement
        const printWindow = window.open('', '', 'left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0') as Window
        printWindow.document.write(
          '<html><head><title></title><style>@page { size: auto;  margin: 0mm; }}</style></head><body style="margin: 0">'
        )
        printWindow.document.write(el.innerHTML)
        printWindow.document.write('</body></html>')
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        setTimeout(() => printWindow.close(), 0)
        dispatch(actions.setCopyAction(1))
    }
    
    const onClick = () => {
        dispatch(actions.setUserID(id))
        if (inputRepeatValue === 0) {
            dispatch(printStickersThunk(printStickers, data))
        } else {
            dispatch(printRepeatNumberThunk(inputRepeatValue, printStickers, id))
        }
    }

    const onChengeRepeatNumber = (value: number) => {
        dispatch(actions.setRepeatStickerValue(value))
    }

    useEffect(() => {
        if (id !== 0) {
            dispatch(showLocationThunk(id))
            dispatch(getLocationCopyCount(id))
        }
    })

    return (
        <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
            <div className="site-layout-content">
                <div>
                    <Button type="primary" danger style={{ width: '500px', height: '250px', fontSize: '35px' }} onClick={onClick}>
                        Печать стикеров
                    </Button>
                </div>
                <InputNumber min={1} max={999999} defaultValue={0} style={{ marginTop: '20px' }} onChange={onChengeRepeatNumber} value={inputRepeatValue} /> Укажите номер стикера для повторной печати
                <Divider />
                {batchAccess && <BatchPrinting />}
            </div>
            <div id="for-print" hidden>
                <BarcodeContainer />
            </div>
        </Content>)
}


type PropsType = {

}