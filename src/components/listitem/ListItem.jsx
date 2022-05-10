import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HStack, VStack, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react'

import ListButton from '../listbutton/ListButton'
import tmdbAPI from '../../api/tmdpApi'
import apiConfig from '../../api/apiConfig'

const ListItem = (props) => {

  const [stats, setStats] = useState([])

  useEffect(() => {

    const getStats = async () => {

      let response = null
      const params = {}
      response = await tmdbAPI.detail(props.category, props.id, { params })
      setStats(response.data)

    }

    getStats()

  }, [props.id, props.category])

  return (

    <HStack width='75%' justify='space-around' align='stretch' shadow={useColorModeValue('xl', '2xl')} p={4} >
      <Image boxSize='400px' objectFit='scale-down' src={apiConfig.w500Image(stats.poster_path || stats.backdrop_path)} alt={stats.name || stats.title} />
      <VStack align='flex-start' width='50%'>
        <HStack width='100%' justifyContent='space-between'>
          <Link to={'/' + props.category + '/' + stats.id}><Heading textDecoration='underline'>{stats.title || stats.name}</Heading></Link>
          <ListButton id={stats.id} name={stats.name || stats.title} category={props.category} />
        </HStack>
        <Text>{stats.overview}</Text>
        {/*TODO: Once we start taking in the category, throw these into conditional rendering. Since we only need them if it's a TV show.*/}
        {props.category === 'tv' &&
          <HStack>
            <Text>{stats.number_of_seasons} {stats.number_of_seasons > 1 ? 'Seasons' : 'Season'}</Text>
            <Text>{stats.number_of_episodes} Episodes</Text>
          </HStack>
        }
      </VStack>
    </HStack >
  )
}

export default ListItem