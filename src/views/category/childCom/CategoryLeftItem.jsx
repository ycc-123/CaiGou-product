import React, { Component, Fragment } from 'react'

class CategoryLeftItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      index: this.props.index
    }
  }
  render() {
    const { item, index } = this.state
    console.log(this.props.active)
    return (
      <Fragment>
        <li className={`category-title ${this.props.active ? 'category-title-active' : ' '}`}
          // style={{ paddingLeft: this.props.active ? '.1rem' : '.23rem' }}
          ref='li' onClick={() => { this.getGoodsData(index, item) }}>
          {item.name}
        </li>
      </Fragment>
    );
  }
  componentWillUnmount() {
    console.log('卸载完成')
  }


  shouldComponentUpdate = nextProps => {
    return this.props.active !== nextProps.active
  }
  getGoodsData = (index) => {
    this.props.onChangeActive(index)
  }
}

export default CategoryLeftItem;