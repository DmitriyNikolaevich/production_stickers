import { Layout, Menu, Button, InputNumber } from 'antd'
import './App.css'
import 'antd/dist/antd.css'
import { useState } from 'react'

const { Header, Content, Footer } = Layout


export const App = () => {

  const [copyCount, setCopyCount] = useState()
  const [startNumber, setStartNumber] = useState()

  

  const onChangeCount = (value) => {
    debugger
    setCopyCount(value)
  }

  const onChangeStartNumber = (value) => {
    debugger
    setStartNumber(value)
  }

  const onClick = () => {
    const printWindow = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0')
    // printWindow.document.title = ''
    printWindow.document.write(
      '<html><head><title></title><style>@page { size: auto;  margin: 0mm; }</style></head><body>'
    )
    for (let i = 0; i < copyCount; i++) {
    for (let rep = 0; rep < 2; rep++) {
      printWindow.document.write('<div style="page-break-after: always">HelloWorld!</div>')   
    }
    }
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
          <div style={{ marginTop: '32px' }}>
            <InputNumber min={1} max={999999} defaultValue={1} onChange={onChangeStartNumber} /> Начальный номер
          </div>
          <div style={{ marginTop: '32px' }}>
            <InputNumber min={1} max={1000} defaultValue={1} onChange={onChangeCount} /> количество комплектов
          </div>
        </div>
        <div id="for-print" hidden>
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center', fontSize: 'large', position: 'fixed', width: '100%', bottom: '0' }}>ГБУЗ "Северская ЦРБ" МЗ КК</Footer>
    </Layout>
  )
}