import React, { FC, useEffect } from 'react'
import { Layout, Button, InputNumber, Divider } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { actions, GetNumberDataType } from '../../redux/stickerReducer'
import { BarcodeContainer } from './BarcodeContainer'
import { getCopySelector, getRepeatStickerValue, getUserBatchAccessSelector } from '../../redux/stickerSelectors'
import { BatchPrinting } from '../Admin/BatchPrinting'
import { OperativStatisticView } from './OperativStatisticView'

const { Content } = Layout

export const ContentComponent: FC<PropsType> = (props) => {

    const id = isNaN(Number(window.location.pathname.slice(1))) ? 3 : Number(window.location.pathname.slice(1))

    const inputRepeatValue = useSelector(getRepeatStickerValue)         //количество комплектов стикеров
    const copy = useSelector(getCopySelector)           //количество копий для пользователя
    const batchAccess = useSelector(getUserBatchAccessSelector)         //доступ к модулю массовой печати

    const dispatch = useDispatch()

    const buttonPrintStyles: React.CSSProperties = {            //стили кнопки печати
        width: '500px',
        height: '250px',
        fontSize: '35px'
    }

    const inputNumberStyles: React.CSSProperties = {            //стили поля ввода номера повторной печати
        marginTop: '20px'
    }
    
    const contentStyles: React.CSSProperties = {            //стили элемента контент
        padding: '0 50px',
        backgroundColor: 'white'
    }

    const data: GetNumberDataType = {           //данные для печати
        id: id,
        copy: copy
    }

    const printStickers = () => {           //печать этикеток
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
    
    const onClick = () => {         //обработка нажатия кнопки печать
        dispatch(actions.setUserID(id))
        if (inputRepeatValue === 0) {
            dispatch(actions.printStickersSagasAC(printStickers, data))
        } else {
            dispatch(actions.printRepeatNumberSagsaAC(inputRepeatValue, printStickers, id))
        }
    }

    const onChengeRepeatNumber = (value: number) => {           //обработка изменения номера для повторной печати стикера
        dispatch(actions.setRepeatStickerValue(value))
    }

    useEffect(() => {           //получение идентификатора пользователя
        if (id === 0) {
            dispatch(actions.getLocationSagasAC(id))
            dispatch(actions.getLocationCopyCountSagasAC(id))
        }
    })

    return (
        <Content style={contentStyles}>
            <div className="site-layout-content">
                <div>
                    <Button type="primary" danger style={buttonPrintStyles} onClick={onClick}>
                        Печать стикеров
                    </Button>
                </div>
                <InputNumber min={1} max={999999} defaultValue={0} style={inputNumberStyles} onChange={onChengeRepeatNumber} value={inputRepeatValue} /> Укажите номер стикера для повторной печати
                <Divider />
                {batchAccess.batch && <BatchPrinting />}
                {batchAccess.operativStatisticViewAccess && <OperativStatisticView />}
            </div>
            <div id="for-print" hidden>
                <BarcodeContainer />
            </div>
        </Content>)
}


type PropsType = {

}