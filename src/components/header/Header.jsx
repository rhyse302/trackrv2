import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, HStack, Input, InputLeftElement, InputGroup, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { BsHouse } from 'react-icons/bs'

const Header = () => {

  const { colorMode, toggleColorMode } = useColorMode()
  const [query, setQuery] = useState("")
  const nav = useNavigate()

  //Weird workaround since colormode and localstorage aren't playing nice right now
  useEffect(() => {

    if (localStorage.getItem('chakra-ui-color-mode') !== colorMode) {
      setTimeout(() => toggleColorMode(), 0)
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {

    console.log(query)
    const enterEvent = (e) => {
      e.preventDefault()
      if (e.keyCode === 13) {
        nav(`/search/${query}`)
      }
    }

    document.addEventListener('keyup', enterEvent)

    return () => { document.removeEventListener('keyup', enterEvent) }

  }, [query, nav])

  return (
    <Box>
      <HStack m={4}>
        <Link to='/'><IconButton icon={<BsHouse />} shadow={useColorModeValue('md', 'dark-lg')} /></Link>
        <InputGroup shadow={useColorModeValue('md', 'dark-lg')}>
          <InputLeftElement children={<SearchIcon />} />
          <Input variant='filled' placeholder='Search here' onChange={(event) => setQuery(event.target.value)} />
        </InputGroup>
        <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />} shadow={useColorModeValue('md', 'dark-lg')} />
      </HStack>
    </Box>
  )
}

export default Header