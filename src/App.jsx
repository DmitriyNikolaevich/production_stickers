import { Layout } from 'antd'
import './App.css'
import 'antd/dist/antd.css'
import { useEffect } from 'react'
import { ContentComponent } from './Components/Content/ContentComponent'
import { getCurentNumber } from './redux/stickerReducer'
import { HeaderComponent } from './Components/Header/Header'
import { useDispatch } from 'react-redux'

const { Footer } = Layout

export const App = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurentNumber())
  })

  return (
    <Layout className="layout">
      <HeaderComponent />
      <ContentComponent />
      <Footer style={{ textAlign: 'center', fontSize: 'large', position: 'fixed', width: '100%', bottom: '0' }}>ГБУЗ "Северская ЦРБ" МЗ КК</Footer>
    </Layout>
  )
}