import React, { useEffect, useState } from 'react'
import { Box, Grid, Heading } from '@chakra-ui/react'

import tmdbAPI from '../../api/tmdpApi'
import { isOnList } from '../../scripts/ListManager'
import EpisodeItem from '../episodeitem/EpisodeItem'

const Episodes = (props) => {

	const [season, setSeason] = useState({})

	useEffect(() => {

		const scrape = async () => {

			let response = await tmdbAPI.episodes(props.id, props.season)
			setSeason(response.data)

		}

		scrape()

	}, [props])

	return (
		<Box align='center' justifyContent='center' mx={4}>
			<Heading as='h2' mb={4} textDecoration='underline'>{season.name} | {season.episodes && season.episodes.length} Episodes</Heading>
			<Grid templateColumns='repeat(4, 1fr)' gap={5}>
				{season.episodes && season.episodes.map((item, num) => (
					<EpisodeItem id={props.id} item={item} season={props.season} num={num} key={num} onList={isOnList(props.id)} />
				))}
			</Grid>
		</Box>
	)
}

export default Episodes