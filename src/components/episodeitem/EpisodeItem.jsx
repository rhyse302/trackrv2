import React, { useEffect, useState } from 'react'
import { Box, Image, Checkbox, Text, useColorModeValue, ScaleFade } from '@chakra-ui/react'
import { isEpisodeWatched, markEpisode } from '../../scripts/ListManager'
import apiConfig from '../../api/apiConfig'
import placeholder from '../../res/NotFoundEpisode.png'

const EpisodeItem = (props) => {

  const [watched, setWatched] = useState(false)
  const [isOpen, setIsOpen] = useState(props.open)
  const color = useColorModeValue('white', 'gray.600')

  useEffect(() => {

    setIsOpen(false)

    const getWatched = async () => {
      if (props.onList) {
        let seen = await isEpisodeWatched(props.id, props.season, props.num)
        setWatched(seen)
      }
    }
    getWatched()

    if (props.num >= 12) {
      setTimeout(() => setIsOpen(true), 50 * 12)
    } else {
      setTimeout(() => setIsOpen(true), 50 * props.num)
    }

  }, [props])

  const toggleEpisode = (checked) => {
    console.log("Season", props.season, "episode", props.num, "set to", checked)
    setWatched(checked)
    markEpisode(props.id, props.season, props.num, checked)
  }

  return (

    <Box>
      <ScaleFade in={isOpen} initialScale={0.9} unmountOnExit>
        <Box w='500px' minH='281px' borderRadius='lg' bg={color} borderColor='black' shadow={useColorModeValue('2xl', 'dark-lg')} >
          <Image roundedTop='lg' src={props.item.still_path !== null ? apiConfig.w500Image(props.item.still_path) : placeholder} alt={props.item.name} bgClip='border-box' opacity={watched ? '75%' : '100%'} />
          {props.onList && <Checkbox isChecked={watched} onChange={(e) => { toggleEpisode(e.target.checked) }}>{watched ? 'Watched!' : 'Mark Watched'}</Checkbox>}
          <Text>{props.item.episode_number}: {props.item.name}</Text>
          <Text>{props.item.runtime} minutes</Text>
        </Box >
      </ScaleFade>
    </Box>
  )
}

export default EpisodeItem