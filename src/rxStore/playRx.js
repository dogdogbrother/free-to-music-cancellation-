import { BehaviorSubject } from "rxjs";

export const currentPlay = new BehaviorSubject({
  url:'',
  img:'',
  name:'',
  art:'', //歌手
  id:'',
})

export const setCurrentPlay = (obj)=>{ 
  let play = currentPlay.value;
  currentPlay.next({
    ...play,
    ...obj
  })
}

//播放列表是个数组,里面存的是对象,对应的就是当前播放的格式
export const playList = new BehaviorSubject([])

export const pushPlayList = (obj)=>{
  //其实push进来应该有别的操作,例如检查这个歌曲是否已经在列表中了,没有的话再添加
  let list = playList.value
  playList.next([...list,obj])
}

export const deletePlayList = (index)=>{
  playList.value.splice(index,1)
  playList.next([...playList.value])
}

