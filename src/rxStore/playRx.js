import { BehaviorSubject } from "rxjs";

export const currentPlay = new BehaviorSubject({
  url:'',
  img:'',
  name:'',
  art:'',
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
  console.log('我想知道有没有添加动作',obj);
  
  let list = playList.value
  playList.next([...list,obj])
}

