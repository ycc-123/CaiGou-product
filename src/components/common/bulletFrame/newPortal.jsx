import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const NewPortal = props => {

  const node = useRef()
  const { visible, children } = props
  useEffect(() => {
    node.current = document.createElement('div')
    document.body.appendChild(node.current)
    return () => {

    }
  }, [])

  return (
    visible && ReactDOM.createPortal(
      children,
      node.current,
    )
  )
}

export default NewPortal
