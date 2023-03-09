import {Component} from 'react'

import {IoMdClose} from 'react-icons/io'

import Header from '../Header'

import SearchVideos from '../SearchVideos'

import CartContext from '../../context/CardContext'

import {
  HomeContainer,
  HomeSideContainer,
  BannerImage,
  HomeStickyContainer,
  CloseButton,
  BannerText,
  ModalContainer,
  GetItNowButton,
  BannerImageContainer,
} from './styledComponents'

import Sidebar from '../Sidebar'

class Home extends Component {
  state = {display: 'flex'}

  onCloseBanner = () => {
    this.setState({display: 'none'}, this.renderHomeVideos)
  }

  renderHomeVideos = () => {
    const {display} = this.state

    return (
      <>
        <BannerImageContainer data-testid="banner" display={display}>
          <ModalContainer>
            <BannerImage
              src=" https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <BannerText>Buy Nxt Watch Premium</BannerText>
            <GetItNowButton>GET IT NOW</GetItNowButton>
          </ModalContainer>
          <CloseButton
            type="button"
            data-testid="close"
            onClick={this.onCloseBanner}
          >
            <IoMdClose size={20} color="#231f20" />
          </CloseButton>
        </BannerImageContainer>
        <SearchVideos />
      </>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'

          return (
            <div data-testid="home">
              <Header />
              <HomeContainer bgColor={bgColor} data-testid="home">
                <HomeStickyContainer>
                  <Sidebar onChangeActiveTab={this.onChangeActiveTab} />
                </HomeStickyContainer>
                <HomeSideContainer bgColor={bgColor}>
                  {this.renderHomeVideos()}
                </HomeSideContainer>
              </HomeContainer>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Home
