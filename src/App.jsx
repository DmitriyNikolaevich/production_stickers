import './App.css'
import {ContentComponent} from './Components/Content/ContentComponent'
import { HeaderComponent } from './Components/Header/Header'
import { AdministativComponent } from './Components/Admin/AdministativComponent'
import { Route, Switch } from 'react-router'
import { Footer } from 'antd/lib/layout/layout'
import { useSelector } from 'react-redux'
import { getLocation } from './redux/stickerSelectors'

export const App = (props) => {

  const location = useSelector(getLocation)

  return (
    <div style={{backgroundColor: 'white', textAlign: 'center'}}>
      <HeaderComponent />
      <ContentComponent />
      <Switch>
        <Route render={() => <AdministativComponent />} path='/admin' />
        <Route render={() => <Footer style={{ textAlign: 'right', fontSize: 'large', position: 'fixed', width: '100%', bottom: '0' }}>{location}</Footer>} path="/:id" />
        <Route render={() => <div>404 NOT FOUND</div>} path='*' />
      </Switch>
    </div>
  )
}