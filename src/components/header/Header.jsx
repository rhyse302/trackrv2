import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, HStack, Input, InputLeftElement, InputGroup, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { BsHouse } from 'react-icons/bs'

const Header = () => {

  const { colorMode, toggleColorMode } = useColorMode()

  //Weird workaround since colormode and localstorage aren't playing nice right now
  useEffect(() => {

    if (localStorage.getItem('chakra-ui-color-mode') !== colorMode) {
      setTimeout(() => toggleColorMode(), 0)
    }

    // eslint-disable-next-line
  }, [])

  return (
    <Box>
      <HStack m={4}>
        <Link to='/'><IconButton icon={<BsHouse />} shadow={useColorModeValue('md', 'dark-lg')} /></Link>
        <InputGroup shadow={useColorModeValue('md', 'dark-lg')}>
          <InputLeftElement children={<SearchIcon />} />
          <Input placeholder='Search here' />
        </InputGroup>
        <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />} shadow={useColorModeValue('md', 'dark-lg')} />
      </HStack>
    </Box>
  )
}

export default Header