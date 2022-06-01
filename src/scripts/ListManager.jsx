import tmdbAPI from '../api/tmdpApi'

//Big boy, adding a movie is simple, but it's the TV shows where this new structure really shines
export async function addListItem(data) {

  //DO NOT ADD IF IT'S ALREADY ON THE LIST
  if (isOnList(data.id)) {

    console.error("Cannot add", data.id, "- already on list")

  } else {

    let list = getWatchList()

    if (data.title) { //It's a movie
      list[data.id] = {
        "id": data.id,
        "category": "movie",
        "finished": false,
        "runtime": data.runtime
      }
    } else { //It's a show

      let seasons = []
      let totalTime = 0

      for (const item of data.seasons) { //Can't use a foreach, since the await will give the website an anyeurism

        let episodes = []
        let episodeData = await getEpisodes(data.id, item.season_number)
        // eslint-disable-next-line
        episodeData.episodes.forEach((episode) => {
          totalTime += episode.runtime
          episodes.push({
            "watched": false,
            "runtime": episode.runtime
          })
        })

        //Create a season item
        const season = {
          "number": item.season_number,
          "season_name": item.name,
          "finished": false,
          "episodes": episodes
        }

        seasons.push(season)
      }

      //Compile everything into an entry
      list[data.id] = {
        "category": "tv",
        "finished": false,
        "total_runtime": totalTime,
        "watched": 0,
        "seasons": seasons
      }
    }

    localStorage.setItem("watchlist", JSON.stringify(list))
  }
}

//Remove items
export function removeItem(id) {

  let newList = getWatchList()
  delete newList[id]

  localStorage.setItem("watchlist", JSON.stringify(newList))

}

//Probably the most essential function here
export function getWatchList() {

  if (localStorage.getItem("watchlist")) {
    return JSON.parse(localStorage.getItem("watchlist"))
  } else {
    localStorage.setItem("watchlist", JSON.stringify({}))
    return {}
  }
}

//Mark a single episode as watched or unwatched, and adjust the time accordingly
export function markEpisode(id, season, episode, val) {

  let list = getWatchList()

  //If we are marking an episode as false, then the show is not finished
  if (val === false && list[id].finished === true) {
    list[id].finished = false
  }

  //Find the season we need
  list[id].seasons.forEach((seasonItem, seasonNum) => {
    //Can't have us double marking an episode
    if (seasonItem.number === season && list[id].seasons[seasonNum].episodes[episode].watched !== val) {
      //If we're marking it as unwatched, we need to remove the time watched instead
      list[id].seasons[seasonNum].episodes[episode].watched = val
      list[id].seasons[seasonNum].watched += val === true ? list[id].seasons[seasonNum].episodes[episode].runtime : -list[id].seasons[seasonNum].episodes[episode].runtime
      list[id].watched += val === true ? list[id].seasons[seasonNum].episodes[episode].runtime : -list[id].seasons[seasonNum].episodes[episode].runtime
    }
  })

  localStorage.setItem("watchlist", JSON.stringify(list))

}

//This is the universal one. 
export function markItem(id, val) {

  let list = getWatchList()

  //Find the entry


  //Movie or tv show?
  if (list[id].category === "movie") {
    list[id].finished = val
    localStorage.setItem("watchlist", JSON.stringify(list))
  } else {

    list[id].finished = val
    localStorage.setItem("watchlist", JSON.stringify(list))
    list[id].seasons.forEach(seasonItem => {
      seasonItem.episodes.forEach((episode, episodeNum) => { markEpisode(id, seasonItem.number, episodeNum, val) })
    })

  }
  console.log("Successfully marked", id, "watch value as", val)
}


//Get the episode data for entering a show onto the watchlist
async function getEpisodes(id, num) {
  const response = await tmdbAPI.episodes(id, num)
  return response.data
}

//Get the total runtime and the time already watched of a show
export function getTimes(id) {

  if (isOnList(id)) {
    const list = getWatchList()
    return [list[id].watched, list[id].total_runtime]
  }

}

//Is it on the list?
export function isOnList(id) {

  const list = getWatchList()

  return list[id] ? true : false

}

//Is an episode watched?
export async function isEpisodeWatched(id, season, episode) {

  const list = getWatchList()
  let watched = false
  list[id].seasons.forEach((entry, seasonNum) => {
    if (entry.number === season) {
      watched = list[id].seasons[seasonNum].episodes[episode].watched
    }
  })
  return watched
}