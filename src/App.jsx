import { Layout, Menu, Button, InputNumber } from 'antd'
import './App.css'
import 'antd/dist/antd.css'
import { useState } from 'react'
import { BarcodeContainer } from './Components/BarcodeContainer'
import { actions, getNumber } from './redux/stickerReducer'
import { numberAPI } from './API/numberAPI'
import { useSelector } from 'react-redux'
import { getStartNumber } from './redux/stickerSelectors'

const { Header, Content, Footer } = Layout

export const App = (props) => {

  const [copyCount, setCopyCount] = useState(1)
  const [copy, setCopy] = useState(2)

  // const startNumber = useSelector(getStartNumber())

  const config = {
    background: "white",
    marginTop: "20px",
    marginBottom: "20px",
    width: 2,
    height: 30
  }

  // const onChangeCount = (value) => {
  //   setCopyCount(value)
  // }

  // const onChangeStartNumber = (value) => {
  //   setStartNumber(value)
  // }

  const onChangeCopy = (value) => {
    setCopy(value)
  }

  const onClick = () => {
    numberAPI.getAPI().then(async resp => {
      let data = await resp.values[0][0]['MAX(id)']
      actions.setStartNumber(data);
    })
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

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Печать наклеек с штрихкодом</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
        <div className="site-layout-content">
          <div>
            <Button type="primary" danger style={{ width: '500px', height: '250px', fontSize: '35px' }} onClick={onClick}>
              Напечатать этикетку
            </Button>
          </div>
          {/* <div style={{ marginTop: '32px' }}>
            <InputNumber min={1} max={999999} defaultValue={1} onChange={onChangeStartNumber} /> начальный номер
          </div> */}
          {/* <div style={{ marginTop: '32px' }}>
            <InputNumber min={1} max={1000} defaultValue={1} onChange={onChangeCount} /> количество комплектов
          </div> */}
          <div style={{ marginTop: '32px' }}>
            <InputNumber min={1} max={2} defaultValue={2} onChange={onChangeCopy} /> количество копий
          </div>
        </div>
        <div id="for-print" hidden>
          <BarcodeContainer copy={copy} startNumber={1} iterations={copyCount} config={config} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', fontSize: 'large', position: 'fixed', width: '100%', bottom: '0' }}>ГБУЗ "Северская ЦРБ" МЗ КК</Footer>
    </Layout>
  )
}