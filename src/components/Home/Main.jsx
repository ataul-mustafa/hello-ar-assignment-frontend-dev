import React from 'react'
import Songs from './Songs/Songs'
import SideBar from './sidebar/SideBar'

function SongsComp() {
  return (
    <div style={{display: 'flex', width: '100vw'}}>
        <SideBar />
        <Songs />
    </div>
  )
}

export default SongsComp