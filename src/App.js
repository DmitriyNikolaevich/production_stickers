import { Layout, Menu, Button, InputNumber } from 'antd'
import './App.css'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import Barcode from "react-hooks-barcode"

const { Header, Content, Footer } = Layout


export const App = () => {

  const [copyCount, setCopyCount] = useState(1)
  const [startNumber, setStartNumber] = useState(1)

  const config = {
    background: "white",
    marginTop: "20px",
    marginBottom: "20px",
    width: 2,
    height: 40
  }

  let result = []
  
  const setResult = (result, copyCount, startNumber) => {
    for (let i = 0; i <= copyCount; i++) {
      result.push(<Barcode value={startNumber} {...config} />)
    }
    debugger
    return result
  }

  const onChangeCount = (value) => {
    setCopyCount(value)
    result = setResult(result, copyCount, startNumber) 
  }

  const onChangeStartNumber = (value) => {
    setStartNumber(value)
    console.log(value)
    result = setResult(result, copyCount, startNumber)
  }

  const onClick = () => {
    
    const el = document.getElementById('for-print')
    const printWindow = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0')
    printWindow.document.write(
      '<html><head><title></title><style>@page { size: auto;  margin: 0mm; }</style></head><body style="margin: 0">'
    )
    for (let i = 0; i < copyCount; i++) {
    for (let rep = 0; rep < 2; rep++) {
      printWindow.document.write(`<div id="for-print${i}${rep}" style="page-break-after: always">`)
      printWindow.document.write(el.innerHTML)
      printWindow.document.write("</div>")
    }
    }
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  useEffect(() => {
    
  }, [result])

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
        {result}
        </div>
        <Barcode value={startNumber} {...config} />
      </Content>
      
      <Footer style={{ textAlign: 'center', fontSize: 'large', position: 'fixed', width: '100%', bottom: '0' }}>ГБУЗ "Северская ЦРБ" МЗ КК</Footer>
    </Layout>
  )
}