import * as React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ children }) => {
  const modal = document.getElementById('modal')
  const el = document.createElement('div')

  React.useEffect(() => {
    modal.appendChild(el)

    return () => {
      modal.removeChild(el)
    }
  }, [el, modal])

  return createPortal(children, el)
}

export default Modal
