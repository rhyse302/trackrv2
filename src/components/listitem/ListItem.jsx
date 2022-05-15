import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HStack, VStack, Heading, Image, Text, useColorModeValue, Badge } from '@chakra-ui/react'

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
      console.log(response.data)
      setStats(response.data)

    }

    getStats()

  }, [props.id, props.category])

  return (
    <HStack w='50%' justify='space-between' align='stretch' shadow={useColorModeValue('xl', '2xl')} p={4}>
      <Image boxSize='400px' objectFit='scale-down' src={apiConfig.w500Image(stats.poster_path || stats.backdrop_path)} alt={stats.name || stats.title} />
      <VStack align='flex-start'>
        <HStack width='100%' justifyContent='space-between'>
          <HStack>
            <Link to={'/' + props.category + '/' + stats.id}><Heading textDecoration='underline'>{stats.title || stats.name}</Heading></Link>
            <Badge>{stats.status}</Badge>
          </HStack>
          <ListButton item={stats} />
        </HStack>
        <Text>{stats.overview}</Text>
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