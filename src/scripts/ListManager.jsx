import dummyData from '../components/listitem/dummyEntry.json'

const list = dummyData.watchlist

const ListManager = {

  getWatchList: () => {
    return list
  },

  addItem: (data) => {
    list.push(data)
  },

  removeItem: (data) => {
    let newList = list
    newList.find(data)
  }

}

export default ListManager