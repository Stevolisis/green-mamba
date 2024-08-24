import React, { ReactNode } from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }:Readonly<Props>) => {
  return (
    <div>
        { children }
    </div>
  )
}

export default layout