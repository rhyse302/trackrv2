import React, { useEffect, useState } from 'react'
import { Box, SimpleGrid, Heading } from '@chakra-ui/react'

import tmdbAPI from '../../api/tmdpApi'
import { isOnList } from '../../scripts/ListManager'
import EpisodeItem from '../episodeitem/EpisodeItem'

const Episodes = (props) => {

	const [season, setSeason] = useState({})
	const onList = useState(isOnList(props.id))

	useEffect(() => {
		const scrape = async () => {

			let response = await tmdbAPI.episodes(props.id, props.season)
			setSeason(response.data)

		}

		scrape()

	}, [props])

	return (
		<Box align='center' justifyContent='center' mx={4}>
			<Heading as='h2' mb={8} textDecoration='underline'>{season.name} | {season.episodes && season.episodes.length} Episodes</Heading>
			<SimpleGrid minChildWidth='500px' spacing={4} justifyItems='center'>
				{season.episodes && season.episodes.map((item, num) => (
					<EpisodeItem id={props.id} item={item} season={props.season} num={num} key={num} open={false} onList={onList} />
				))}
			</SimpleGrid>
		</Box>
	)
}

export default Episodes