import React, { useEffect, useState } from 'react'
import { Box, Grid, Heading, Image, Text, useColorModeValue } from '@chakra-ui/react'

import tmdbAPI from '../../api/tmdpApi'
import apiConfig from '../../api/apiConfig'

const Episodes = (props) => {

	const [season, setSeason] = useState({})
	const color = useColorModeValue('white', 'gray.600')

	useEffect(() => {

		const scrape = async () => {

			let response = await tmdbAPI.episodes(props.id, props.season)
			console.log(response.data)
			setSeason(response.data)

		}

		scrape()

	}, [props])

	return (
		<Box align='center' justifyContent='center' mx={4}>
			<Heading as='h2' mb={4} textDecoration='underline'>{season.name} | {season.episodes && season.episodes.length} Episodes</Heading>
			<Grid templateColumns='repeat(4, 1fr)' gap={5}>
				{season.episodes && season.episodes.map((item, num) => (
					<Box w='500px' borderRadius={4} bg={color} borderWidth={4} borderColor='black' key={num}>
						<Image src={apiConfig.w500Image(item.still_path)} alt={item.name} bgClip='border-box' />
						<Text>{item.episode_number}: {item.name}</Text>
						<Text>{item.runtime} minutes</Text>
					</Box>
				))}
			</Grid>
		</Box>
	)
}

export default Episodes