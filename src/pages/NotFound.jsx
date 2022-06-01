import React from 'react'
import Helmet from 'react-helmet'
import { Box, Text, Heading } from '@chakra-ui/react'

//TODO: Provide a way to submit a bug report
const NotFound = () => {
  return (
    <Box>
      <Helmet><title>404 | Page not found!</title></Helmet>
      <Heading align='center'>404 | Page not found!</Heading>
      <Text align='center'>The page you're looking for does not exist.</Text>
    </Box>
  )
}

export default NotFound