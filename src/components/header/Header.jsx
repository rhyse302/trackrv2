import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, HStack, Input, InputLeftElement, InputGroup, IconButton, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { BsHouse, BsHouseFill } from 'react-icons/bs'

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
        <Tooltip label='Return to your watchlist' placement='auto' openDelay={750} closeDelay={250} hasArrow>
          <Link to='/'><IconButton icon={useColorModeValue(<BsHouse />, <BsHouseFill />)} shadow={useColorModeValue('md', 'dark-lg')} /></Link>
        </Tooltip>
        <InputGroup shadow={useColorModeValue('md', 'dark-lg')}>
          <InputLeftElement children={<SearchIcon />} />
          <Input variant='filled' placeholder='Search here' onChange={(event) => setQuery(event.target.value)} />
        </InputGroup>
        <Tooltip label={useColorModeValue('Toggle dark mode', 'Toggle light mode')} placement='auto' openDelay={750} closeDelay={250} hasArrow>
          <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />} shadow={useColorModeValue('md', 'dark-lg')} />
        </Tooltip>
      </HStack>
    </Box>
  )
}

export default Header