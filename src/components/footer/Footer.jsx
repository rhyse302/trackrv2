import React from 'react'
import { Image, Text, Flex } from '@chakra-ui/react'

const Footer = () => {

  const logo = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'

  return (
    <Flex m={4} direction={{ base: 'column', md: 'row' }} justify='center' align='center' gap={4}>
      <Image scale='25%' maxH={8} src={logo} alt='TMDB Logo' />
      <Text>This product uses the TMDB API but is not endorsed or certified by TMDB.</Text>
      <Text>Streaming information provided by JustWatch.</Text>
    </Flex>
  )
}

export default Footer