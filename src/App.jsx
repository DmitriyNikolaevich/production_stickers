import './App.css'
import { ContentComponent } from './Components/Content/ContentComponent'
import { HeaderComponent } from './Components/Header/Header'
import { AdministativComponent } from './Components/Admin/AdministativComponent'
import { Route, Switch } from 'react-router'
import { Footer } from 'antd/lib/layout/layout'

export const App = (props) => {

  return (
    <div style={{backgroundColor: 'white', textAlign: 'center'}}>
      <HeaderComponent />
      <ContentComponent />
      <Switch>
        <Route render={() => <AdministativComponent />} path='/admin' />
        <Route render={() => <Footer style={{ textAlign: 'center', fontSize: 'large', position: 'fixed', width: '100%', bottom: '0' }}></Footer>} path='/' />
      </Switch>
    </div>
  )
}