import React, { } from 'react'

import { LoadedStyle, LoadingMoreStyle } from './style'

export const Loaded = (props) => {

  return (
    <>
      <LoadedStyle>
        <p>已加载全部</p>
      </LoadedStyle>
    </>
  )
}

export const LoadingMore = (props) => {

  return (
    <>
      <LoadingMoreStyle>
        <p>{props.isLoading ? '加载中...' : '已加载全部'} </p>
      </LoadingMoreStyle>
    </>
  )
}
