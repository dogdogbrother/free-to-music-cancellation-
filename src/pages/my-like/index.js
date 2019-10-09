import React from 'react'
import SongList from '../../components/song-list'
import { useObservable } from 'rxjs-hooks'
import { userInfo } from '../../rxStore/user'

const MyLike = ()=> {
  let cUserInfo = useObservable(() => userInfo.asObservable()) || userInfo
  return(
    <div className="song-list">
      <div className="res-container">
        <SongList listData={cUserInfo.fonds ? cUserInfo.fonds : []}/>
      </div>
    </div>
  )
}

export default MyLike