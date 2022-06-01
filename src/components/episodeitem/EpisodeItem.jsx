import React, { useEffect, useState } from 'react'
import { Box, Image, Checkbox, Text, useColorModeValue } from '@chakra-ui/react'
import { isEpisodeWatched, markEpisode } from '../../scripts/ListManager'
import apiConfig from '../../api/apiConfig'

const EpisodeItem = (props) => {

  const [watched, setWatched] = useState(false)
  const color = useColorModeValue('white', 'gray.600')

  useEffect(() => {

    const getWatched = async () => {
      if (props.onList) {
        let seen = await isEpisodeWatched(props.id, props.season, props.num)
        setWatched(seen)
      }
    }
    getWatched()

  }, [props])

  const toggleEpisode = (checked) => {
    console.log("Season", props.season, "episode", props.num, "set to", checked)
    setWatched(checked)
    markEpisode(props.id, props.season, props.num, checked)
  }

  return (
    <Box w='500px' minH='281px' borderRadius={4} bg={color} borderWidth={4} borderColor='black'>
      <Image src={apiConfig.w500Image(props.item.still_path)} alt={props.item.name} bgClip='border-box' opacity={watched ? '75%' : '100%'} />
      {props.onList && <Checkbox isChecked={watched} onChange={(e) => { toggleEpisode(e.target.checked) }}>{watched ? 'Watched!' : 'Mark Watched'}</Checkbox>}
      <Text>{props.item.episode_number}: {props.item.name}</Text>
      <Text>{props.item.runtime} minutes</Text>
    </Box>
  )

}

export default EpisodeItem