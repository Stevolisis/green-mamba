import Menu from '@/components/Menu'
import React, { ReactNode } from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }:Readonly<Props>) => {
  return (
    <div>
        { children }
        <Menu/>
    </div>
  )
}

export default layout