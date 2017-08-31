const _gedan = '/gedan'
const _baseUrl2 = '/music2'
const _mUrl = '/mUrl'
const _basic = '/basic'
export default {
  getPlayListByWhere (cat, order, offset, total, limit) {
    return _gedan + '?cat=' + cat + '&offset=' + offset + '&limit=' + limit
  },
  getLrc (id) {
    return _basic + '/lyric?id=' + id
  },
  getSong (id) {
    return _mUrl + '?id=' + id
  },
  getPlayListDetail (id) {
    return _baseUrl2 + '?type=playlist&id=' + id
  },
  getMv (id) {
    return _baseUrl2 + '?type=mv&id=' + id
  },
  getDetail (id) {
    return _basic + '/song/detail?ids=' + id
  },
  search (words) {
    return _baseUrl2 + '?type=search&s=' + words
  },
  getHot (limit, cat = '全部') {
    return _basic + '/top/playlist?limit=' + limit + '&cat=' + cat
  },
  singleMatch (key) {
    return _basic + '/search/suggest?keywords=' + key
  },
  searchLists (key, type = 1) {
    return _basic + '/search?keywords=' + key + '&type=' + type
  },
  getAlbums (id) {
    return _basic + '/artist/album?id=' + id + '&limit=30'
  },
  getAlbum (id) {
    return _basic + '/album?id=' + id
  }
}
