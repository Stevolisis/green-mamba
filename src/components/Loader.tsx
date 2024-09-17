"use client"
import React from 'react'
import { Grid } from 'react-loader-spinner'

type Props = {
    size:number;
    color:string;
}

const Loader = (props: Props) => {
  return (
    <Grid
        visible={true}
        height={props.size}
        width={props.size}
        color={props.color}
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
  )
}

export default Loader