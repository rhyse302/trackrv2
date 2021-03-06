import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Helmet from 'react-helmet'
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import ListItem from '../components/listitem/ListItem'
import tmdbAPI from '../api/tmdpApi'

const SearchResults = () => {

  const { keyword } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {

    const getResults = async () => {

      let response = await tmdbAPI.search('multi', { query: keyword })
      setItems(response.data.results)

    }

    getResults()

  }, [keyword])

  return (
    <Flex direction='column'>
      <Helmet>
        <title>Results for '{keyword}'</title>
      </Helmet>
      {/* In case I want to add the divider back divider={<StackDivider alignSelf='center' borderWidth={1} stroke={4} width='50%'/>} */}
      <Box gap={4}>
        <Heading mt={4} align='center'>Results for '{keyword}'</Heading>
        {items.length === 0 &&
          <Heading alignSelf='center'>Hmmm, look's like we didn't find anything.</Heading>
        }
        {/* {items && items.map((item, key) => (
          <ListItem id={item.id} category={item.media_type} key={key} />
        ))} */}
        <SimpleGrid justifyItems='center' minChildWidth='500px' spacing={4}>
          {items && items.map((item, key) => (
            (item.title !== null || item.name !== null) && <ListItem id={item.id} category={item.media_type} key={key} />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  )
}

export default SearchResults