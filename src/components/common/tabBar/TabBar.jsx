import React, { Component } from 'react'
import { HashRouter as Router, withRouter } from 'react-router-dom'

import TabBarItem from './TabBarItem'

class TabBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabArr: [
        { id: 1010, content: '营业概况', src: require('assets/img/home.png'), activeSrc: require('assets/img/home1.png'), path: '/home' },
        { id: 1011, content: '数据报表', src: require('assets/img/bao.png'), activeSrc: require('assets/img/bao1.png'), path: '/My' },
        { id: 1012, content: '我的账号', src: require('assets/img/ren.png'), activeSrc: require('assets/img/ren1.png'), path: '/Baobiao' },
      ]
    }
  }
  render() {
    return (
      <Router>
        <footer className="tab-bar">
          {this.state.tabArr.map((item, index) => {
            return (
              <TabBarItem active={this.props.history.location.pathname === item.path ? true : false}
                onChangeActive={() => this.onChangeActive(item.path)}
                content={item}
                key={index}
                index={index}
                goHome={this.goHome}>
              </TabBarItem>
            )
          })}
        </footer>
      </Router>
    )
  }
  onChangeActive = path => {
    this.props.history.push(path)
    if (this.props.goHome && this.props.history.location.pathname === '/home') {
      this.props.goHome()
    }
  }

  goHome = () => {
    this.props.goHome()
  }
}

export default withRouter(TabBar)