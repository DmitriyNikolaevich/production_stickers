import React from 'react'
import { Layout, Button, InputNumber } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch } from 'react-redux'
import { actions, getNumber } from '../../redux/stickerReducer'
import { BarcodeContainer } from '../BarcodeContainer'

const { Content } = Layout



export const ContentComponent = (props) => {

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
        dispatch(getNumber(printStickers))
    }

    const onChangeCopy = (value) => {
        dispatch(actions.setCopyAction(value))
    }

    return (
        <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
            <div className="site-layout-content">
                <div>
                    <Button type="primary" danger style={{ width: '500px', height: '250px', fontSize: '35px' }} onClick={onClick}>
                        Напечатать этикетку
                    </Button>
                </div>
                <div style={{ marginTop: '32px' }}>
                    <InputNumber min={1} max={2} defaultValue={2} onChange={onChangeCopy} /> количество копий
                </div>
            </div>
            <div id="for-print" hidden>
                <BarcodeContainer />
            </div>
        </Content>)
}