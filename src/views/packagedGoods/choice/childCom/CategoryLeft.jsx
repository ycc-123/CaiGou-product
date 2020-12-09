import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import CategoryLeftItem from './CategoryLeftItem'
import CategoryRight from './CategoryRight'
import BetterScroll from 'common/betterScroll/BetterScroll'

class CategoryLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ys: '',
      kc: '',
      title: [],
      defaultIndex: 0
    }
  }
  render() {
    const scollConfig = {
      probeType: 1
    }
    const scrollStyle = {
      width: '2.46rem',
      height: 'calc(100vh - 1.48rem)',
      top: '0'
    }

    const { title, defaultIndex, goods, ys, kc } = this.state
    const { type } = this.props
    const { cartGoods } = store.getState()
    if (title.length !== 0 && title[defaultIndex].goods.length !== 0) {
      title[defaultIndex].goods.forEach(item => {
        let newGoods = cartGoods.find(cartItem => {
          return cartItem.sid === item.id
        })
        if (newGoods) {
          item.num = newGoods.num
        } else {
          item.num = 0
        }
      })
    }
    return (
      <Fragment>
        {type === 'goods' ? <><div className='categoryLeft'>
          <ul>
            {title.length !== 0 && <BetterScroll config={scollConfig} style={scrollStyle} ref='scroll'>
              <li className='category-left-head'></li>
              {title.map((item, index) => {
                return (
                  <CategoryLeftItem key={item.id + index}
                    item={item}
                    index={index}
                    active={this.state.defaultIndex === index ? true : false}
                    onChangeActive={() => { this.onChangeActive(index) }} />
                )
              })}
            </BetterScroll>}
          </ul>
        </div>
          {title.length !== 0 && title[defaultIndex].goods.length !== 0 && <CategoryRight goodsList={title[defaultIndex].goods} ys={ys} kc={kc} />}
        </> : <>
            </>}
        {
          goods.length === 0 && <div className='wutu' style={{ color: 'white' }}>
            <img style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '2rem', height: '' }} src='https://res.lexiangpingou.cn/images/vip/fengleiwu.png' alt="" />
            <p style={{ position: 'absolute', fontSize: '.32rem', top: '60%', left: '50%', transform: 'translate(-50%, 0)', }}>商家正在努力上新中</p>
          </div>
        }
      </Fragment>
    );
  }
  onChangeActive = index => {
    let { title } = this.state
    if (!title[index].goods) {
      const right_config = {
        action: 'getGoodsByCategory',
        data: {
          uniacid: store.getState().appConfig.uniacid,
          openid: store.getState().userInfoWX.openid,
          cid: this.state.title[index].id,
          pagesize: 100
        }
      }
      _categoryRight(right_config).then(res => {
        title[index].goods = (res.data && res.data.data && res.data.data.list) || []
        this.setState({
          ys: res.data.data.issell,
          kc: res.data.data.showPubStock,
          title,
          defaultIndex: index
        })
      })
    } else {
      this.setState({
        defaultIndex: index
      })
    }
  }

  componentDidMount = () => {
    _categoryLeft().then(res => {
      const right_config = {
        action: 'getGoodsByCategory',
        data: {
          uniacid: store.getState().appConfig.uniacid,
          openid: store.getState().userInfoWX.openid,
          cid: res.data.data[0].id,
          pagesize: 100
        }
      }
      _categoryRight(right_config).then(res1 => {
        let title = (res.data && res.data.data) || []
        title[0].goods = (res1.data && res1.data.data && res1.data.data.list) || []
        this.setState({
          title
        }, () => {
          this.refs.scroll.BScroll.refresh()
        })
      })
    })
  }
}


export default withRouter(CategoryLeft);