import React, { useEffect, useState } from 'react'
import { Box, Grid, Heading } from '@chakra-ui/react'

import tmdbAPI from '../../api/tmdpApi'
import { isOnList } from '../../scripts/ListManager'
import EpisodeItem from '../episodeitem/EpisodeItem'

const Episodes = (props) => {

	/*
		FIXME
		Okay, so for some reason I absolute CANNOT pass 0 through as an argument. So, in the Details page, if the season is 0,
		I pass 100 through instead. Then, I change it BACK from 100 to 0 in here.
	*/

	console.log(props)
	const [season, setSeason] = useState({})
	const seasonNum = props.season === 100 ? 0 : props.season

	useEffect(() => {
		const scrape = async () => {

			let response = await tmdbAPI.episodes(props.id, seasonNum)
			setSeason(response.data)

		}

		scrape()

	}, [props])

	return (
		<Box align='center' justifyContent='center' mx={4}>
			<Heading as='h2' mb={4} textDecoration='underline'>{season.name} | {season.episodes && season.episodes.length} Episodes</Heading>
			<Grid templateColumns='repeat(4, 1fr)' gap={5}>
				{season.episodes && season.episodes.map((item, num) => (
					<EpisodeItem id={props.id} item={item} season={seasonNum} num={num} key={num} onList={isOnList(props.id)} />
				))}
			</Grid>
		</Box>
	)
}

export default Episodes