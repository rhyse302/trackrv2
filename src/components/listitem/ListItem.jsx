import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Flex, Image, ScaleFade, Text, useColorModeValue, Badge } from '@chakra-ui/react'

import ListButton from '../listbutton/ListButton'
import tmdbAPI from '../../api/tmdpApi'
import apiConfig from '../../api/apiConfig'
import placeholder from '../../res/NotFoundPoster.png'

const ListItem = (props) => {

  const [stats, setStats] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const imagePath = stats.poster_path !== null ? stats.poster_path : stats.backdrop_path

  useEffect(() => {

    setIsOpen(false)

    const getStats = async () => {

      let response = null
      const params = {}
      response = await tmdbAPI.detail(props.category, props.id, { params })
      setStats(response.data)

    }

    getStats()
    setIsOpen(true)

  }, [props])

  return (
    // <Flex w='75%' justify='space-between' align='stretch' shadow={useColorModeValue('xl', '2xl')} p={4} flexDirection={{ base: 'column', md: 'row' }}>
    //   <Image boxSize='400px' mr={4} objectFit='scale-down' src={imagePath !== null ? apiConfig.w500Image(imagePath) : placeholder} alt={stats.name || stats.title} />
    //   <VStack align='flex-start'>
    //     <HStack width='100%' justifyContent='space-between'>
    //       <HStack>
    //         <Link to={'/' + props.category + '/' + stats.id}><Heading textDecoration='underline'>{stats.title || stats.name}</Heading></Link>
    //         <Badge>{stats.status}</Badge>
    //       </HStack>
    //       <ListButton item={stats} />
    //     </HStack>
    //     <Text>{stats.overview}</Text>
    //     {props.category === 'tv' &&
    //       <HStack>
    //         <Text>{stats.number_of_seasons} {stats.number_of_seasons > 1 ? 'Seasons' : 'Season'}</Text>
    //         <Text>{stats.number_of_episodes} Episodes</Text>
    //       </HStack>
    //     }
    //   </VStack>
    // </Flex >
    <Flex>
      <ScaleFade in={isOpen} initialScale={0.9} unmountOnExit>
        <Flex p={4} w='500px' alignItems='center' justifyContent='center'>
          <Box rounded='2xl' shadow={useColorModeValue('2xl', 'dark-lg')} position='relative'>
            <Image src={imagePath !== null ? apiConfig.w500Image(imagePath) : placeholder} alt={imagePath !== null ? `Poster for ${stats.name || stats.title}` : 'Poster not found, this is a placeholder image'} roundedTop='2xl' />
            <Box p={4} maxW='500px'>
              <Flex justifyContent='space-between' alignItems='center'>
                <Link to={`/${props.category}/${props.id}`}>
                  <Heading fontWeight='semibold' fontSize='2xl' lineHeight='tight' textDecoration='underline' isTruncated maxW='275px'>
                    {stats.name || stats.title}
                  </Heading>
                </Link>
                <Box>
                  <Badge mr={4}>{stats.status}</Badge>
                  <ListButton item={stats} />
                </Box>
              </Flex>
            </Box>
            <Flex maxH={24} px={4} pb={4}>
              <Text noOfLines={3} overflow='hidden'>{stats.overview}</Text>
            </Flex>
          </Box>
        </Flex>
      </ScaleFade>
    </Flex>
  )
}

export default ListItem