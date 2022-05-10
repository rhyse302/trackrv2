import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Helmet from 'react-helmet'
import { Box, Heading, VStack } from '@chakra-ui/react'

import ListItem from '../components/listitem/ListItem'
import tmdbAPI, { category as cate } from '../api/tmdpApi'

const SearchResults = () => {

  const { keyword } = useParams()
  const [items, setItems] = useState([])
  console.log(`Keyword: ${keyword}`)

  useEffect(() => {

    const getResults = async () => {

      let response = null
      const param = { query: keyword };
      response = await tmdbAPI.search(cate.tv, { param })
      console.log(response.data)
      setItems(response.data)

    }

    getResults()

  }, [keyword])

  return (
    <Box>
      <Helmet>
        <title>Results for '{keyword}'</title>
      </Helmet>
      {/* In case I want to add the divider back divider={<StackDivider alignSelf='center' borderWidth={1} stroke={4} width='50%'/>} */}
      <VStack gap={4}>
        <Heading mt={4} alignSelf='center'>Results for '{keyword}'</Heading>
        {(!items || items.length === 0) &&
          <Heading alignSelf='center'>Hmmm, look's like we didn't find anything.</Heading>
        }
        {items && items.map((item, key) => (
          <ListItem item={item} key={key} />
        ))}
      </VStack>
    </Box>
  )
}

export default SearchResults