import api from '../api'
export const changePlaying = {
  computed: {
    oAudio () {
      return document.getElementById('playMusic')
    }
  },
  methods: {
    changePlaying (item, index) {
      this.$store.commit('setPlaying', item)
      this.$store.commit('setPicUrl', item.al.picUrl)
      this.$store.commit('resetPlay')
      this.$store.commit('changeLrcTop', window.innerHeight * 0.4)
      this.$store.commit('resetProgressPlayed')
      this.$store.state.playIndex = index
      // 获取歌曲url
      this.$http.get(api.getSong(this.playSong.id)).then(
        (res) => {
          console.log(res.data)
          if (!res.data.data) {
            console.log('歌曲加载错误！')
          } else {
            this.oAudio.src = res.data.data[0].url
          }
        }
      )
      // 获取歌词
      this.$http.get(api.getLrc(this.playSong.id)).then(
        (res) => {
          if (!res.data.lrc) {
            console.log('歌词加载错误!')
          } else {
            var lyric = res.data.lrc.lyric
            var lyricData = []
            lyric.split('\n').forEach(function (val, index) {
              var splitIndex, timeTemp, lyricTemp
              var lyricDataTemp = {}
              splitIndex = val.indexOf(']') + 1
              // 过滤无用行
              if (val.charAt(1).search(/\d/) === -1) {
                return
              }
              // 获取时间和对应的歌词
              timeTemp = val.substring(1, splitIndex - 1)
              lyricTemp = val.substring(splitIndex)
              var m = parseInt(timeTemp.substr(0, 2))
              var s = parseInt(timeTemp.substr(3, 2))
              timeTemp = m * 60 + s
              lyricDataTemp.lyricTime = timeTemp
              lyricDataTemp.lyric = lyricTemp
              lyricData.push(lyricDataTemp)
            })
            this.$store.commit('setLyric', lyricData)
          }
        }
      )
    }
  }
}
