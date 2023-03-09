import {Component} from 'react'
import Cookies from 'js-cookie'
// import Loader from 'react-loader-spinner'
// import VideoCard from '../VideoCard'
// import Header from '../Header'

// import Sidebar from '../Sidebar'
import GamingItem from '../GamingItem'
import CartContext from '../../context/CardContext'

import {SearchVideosContainer, VideosContainer} from './styledComponents'

class Gaming extends Component {
  state = {
    gamingVideos: [],
  }

  componentDidMount = () => {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      this.setState({gamingVideos: updatedData})
    }
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {gamingVideos} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? '#0f0f0f' : '#f9f9f9'

          return (
            <SearchVideosContainer data-testid="gaming" bgColor={bgColor}>
              <h1>Gaming</h1>
              <VideosContainer bgColor={bgColor}>
                {gamingVideos.map(each => (
                  <GamingItem key={each.id} details={each} />
                ))}
              </VideosContainer>
            </SearchVideosContainer>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Gaming
