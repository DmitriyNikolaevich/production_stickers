import './App.css'
import {ContentComponent} from './Components/Content/ContentComponent'
import { HeaderComponent } from './Components/Header/Header'
import { AdministrativComponent } from './Components/Admin/AdministrativComponent'
import { Route, Switch } from 'react-router'
import { Footer } from 'antd/lib/layout/layout'
import { useSelector } from 'react-redux'
import { getLocation } from './redux/stickerSelectors'
import { ModalSelectLocation } from './Components/Content/ModalSelectLocation'
import { FC } from 'react'

export const App: FC<PropsType> = (props) => {

  const location = useSelector(getLocation)

  return (
    <div style={{backgroundColor: 'white', textAlign: 'center'}}>
      <HeaderComponent />
      <ContentComponent />
      <Switch>
        <Route render={() => <AdministrativComponent />} path='/admin' />
        <Route render={() => <Footer style={{ textAlign: 'right', fontSize: 'large', position: 'fixed', width: '100%', bottom: '0' }}>{location}</Footer>} path="/:id" />
        <Route render={() => <ModalSelectLocation />} path='*' />
      </Switch>
    </div>
  )
}


type PropsType = {
  
}