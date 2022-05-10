import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Heading, VStack, Progress } from '@chakra-ui/react'

import ListItem from '../components/listitem/ListItem'

const Watchlist = () => {

	const [items, setItems] = useState([])

	useEffect(() => {

		let entries = []

		for (let i = 0; i < localStorage.length; i++) {

			const key = localStorage.key(i)
			if (key !== 'chakra-ui-color-mode') {
				console.log(key, JSON.parse(localStorage.getItem(key)))
				entries.push({ id: key, category: JSON.parse(localStorage.getItem(key)) })
			}
		}

		setItems(entries)
		console.log(items)

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
					<ListItem id={item.id} category={item.category} key={key} />
				))}
			</VStack>
		</Box>
	)
}

export default Watchlist