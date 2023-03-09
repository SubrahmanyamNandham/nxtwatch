import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import HomeRoute from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideoDetails from './components/VideoDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import CartContext from './context/CardContext'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
    activeTab: 'HOME',
  }

  onChangeTheme = () => {
    this.setState(prev => ({isDarkTheme: !prev.isDarkTheme}))
  }

  addToSaveVideos = videoDetails => {
    const {savedVideos} = this.state
    const videoObject = savedVideos.find(each => each.id === videoDetails.id)

    if (videoObject) {
      this.setState(prev => ({
        savedVideos: [...prev.savedVideos],
      }))
    } else {
      this.setState({savedVideos: [...savedVideos, videoDetails]})
    }
  }

  removeSaveVideos = id => {
    const {savedVideos} = this.state
    const updatedVideos = savedVideos.filter(each => each.id !== id)
    this.setState({savedVideos: updatedVideos})
  }

  activeTabItem = item => {
    this.setState({activeTab: item})
  }

  render() {
    const {isDarkTheme, savedVideos, activeTab} = this.state
    console.log(isDarkTheme)

    return (
      <CartContext.Provider
        value={{
          isDarkTheme,
          savedVideos,
          addToSaveVideos: this.addToSaveVideos,
          activeTabItem: this.activeTabItem,
          activeTab,
          onChangeTheme: this.onChangeTheme,
          removeSaveVideos: this.removeSaveVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/game" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
