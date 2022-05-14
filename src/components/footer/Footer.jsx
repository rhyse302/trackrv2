import React from 'react'
import { Box, Image, Text, HStack } from '@chakra-ui/react'

const Footer = () => {

  const logo = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'

  return (
    <Box m={4}>
      <HStack justify='center'>
        <Image scale='25%' maxH={8} src={logo} alt='TMDB Logo' />
        <Text>Streaming information provided by JustWatch.</Text>
        <Text>This product uses the TMDB API but is not endorsed or certified by TMDB.</Text>
      </HStack>
    </Box>
  )
}

export default Footer