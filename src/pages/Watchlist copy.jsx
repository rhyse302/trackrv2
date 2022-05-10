import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Heading, VStack } from '@chakra-ui/react'

import ListItem from '../components/listitem/ListItem'
import tmdbAPI, { tvType } from '../api/tmdpApi'



const Watchlist = () => {

    const [items, setItems] = useState([])
    const itemNumber = localStorage.length

    for (let i = 0; i < itemNumber; i++) {
        let key = localStorage.key(i)

        if (key !== 'chakra-ui-color-mode') {
            console.log(key, JSON.parse(localStorage.getItem(key)))
        }

    }

    useEffect(() => {

        const getShows = async () => {

            //TODO: Instead of getting the popular shows, pull from a list of IDs on the user's watchlist
            let response = null
            const params = {}
            response = await tmdbAPI.getTvList(tvType.popular, { params })
            setItems(response.data.results)
            console.log(response.data.results)

        }

        getShows()

    }, [])


    return (
        <Box>
            <Helmet>
                <title>My Watchlist</title>
            </Helmet>
            {items.length === 0 &&

                <Heading size='[2xl, lg, md]'>Looks like you don't have anything on your watchlist. Use the search bar to get started</Heading>

            }

            {/* In case I want to add the divider back divider={<StackDivider alignSelf='center' borderWidth={1} stroke={4} width='50%'/>} */}
            <VStack gap={4}>
                <Heading mt={4} alignSelf='center'>My Watchlist</Heading>
                {items && items.map((item, key) => (
                    <ListItem id={item.id} category='tv' key={key} />
                ))}
            </VStack>
        </Box>
    )

}

export default Watchlist