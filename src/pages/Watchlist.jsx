import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Heading, VStack, Progress } from '@chakra-ui/react'

import ListItem from '../components/listitem/ListItem'
import { getWatchList } from '../scripts/ListManager'

const Watchlist = () => {

	const [items, setItems] = useState([])

	useEffect(() => {

		let entries = []

		//For every item in the list, push an array of the id and category so that we can map those to our ListItems
		for (const [key, value] of Object.entries(getWatchList())) { entries.push([key, value.category]) }

		setItems(entries)

		// eslint-disable-next-line
	}, [items.length])

	return (
		<Box>
			<Helmet>
				<title>My Watchlist</title>
			</Helmet>
			<Progress value={80} mx={4} borderRadius={4} hasStripe={true} />
			<VStack gap={4}>
				<Heading mt={4} alignSelf='center'>My Watchlist</Heading>
				{items.length === 0 &&
					<Heading alignSelf='center' size='md'>Looks like you don't have anything on your watchlist. Use the search bar to get started</Heading>
				}
				{items && items.map((item, key) => (
					<ListItem id={item[0]} category={item[1]} key={key} />
				))}
			</VStack>
		</Box>
	)
}

export default Watchlist