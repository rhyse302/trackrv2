import React from 'react'
import { Box, Text, VStack } from '@chakra-ui/react'

const Info = (props) => {

  const item = props.item.item

  console.log(props)

  return (
    <Box>
      <VStack align='flex-start'>
        <Text>ID: {item.id}</Text>
        <Text>Original Name: {item.original_name}</Text>
        <Text>Original Language: {item.original_language}</Text>
        <Text>Origin Country: {item.origin_country}</Text>
        <Text>First Air Date: {item.first_air_date}</Text>
        <Text>Last Air Date: {item.last_air_date}</Text>
        <Text>In Production: {item.in_production}</Text>
        <Text>Adult: {item.adult}</Text>
        <Text>Status: {item.status}</Text>
        <Text>Popularity: {item.popularity}</Text>
        <Text>Vote Average: {item.vote_average}</Text>
      </VStack>
    </Box>
  )
}

export default Info