
import React, { Component } from 'react'

import CategoryRightItem from './CategoryRightItem'

import BetterScroll from 'common/betterScroll/BetterScroll'

// import { store } from 'store/index'

class CategoryRight extends Component {
  render() {
    const scollConfig = {
      probeType: 1
    }
    const scrollStyle = {
      top: '0',
      bottom: '0',
      width: '7.5rem',
    }
    const { goodsList, ys, kc } = this.props
    console.log(goodsList)
    return (
      <div className='categoryRight'>
        <ul>
          <BetterScroll config={scollConfig} style={scrollStyle} ref='scroll'>
            {goodsList.map((item, index) => {
              return (
                <CategoryRightItem key={item.id + index} goods={item} />
              )
            })}

          </BetterScroll>
        </ul>
      </div>
    );
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log(this.props)
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }


  componentDidUpdate = () => {
    // 默认每次加载x=0，y=0 不然会有bug
    // console.log(this)
    /* console.log('进来了') */
    this.refs.scroll.BScroll.scrollTo(0, 0)
    this.refs.scroll.BScroll.refresh()

  }
}

export default CategoryRight;