import React from 'react';
import ReactDOM from 'react-dom';

class OldPortal extends React.Component {
  constructor(props) {
    super(props)
  }

  // 初始化时根据visible属性来判断是否渲染
  componentDidMount() {
    const { visible } = this.props
    if (visible) {
      this.renderPortal(this.props);
    }
  }

  // 每次接受到props进行渲染与卸载操作
  componentWillReceiveProps(props) {
    if (props.visible) {
      this.renderPortal(props)
    } else {
      this.closePortal()
    }
  }

  // 渲染
  renderPortal(props) {
    if (!this.node) {
      // 防止多次创建node
      this.node = document.createElement('div');
    }
    // 将当前node添加到body中
    document.body.appendChild(this.node);

    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,           // 上下文指定当前的实例
      props.children, // 渲染的元素为当前的children
      this.node,      // 将元素渲染到我们新建的node中,这里我们不使用第四个参数回调.
    );
  }

  // 卸载
  closePortal() {
    if (this.node) {
      // 卸载元素中的组件
      ReactDOM.unmountComponentAtNode(this.node)
      // 移除元素
    //   document.body.removeChild(this.node)
    }
  }

  render() {
    return null;
  }
}

export default OldPortal

