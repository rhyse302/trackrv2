import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Badge, Box, Button, Heading, HStack, Menu, Image, MenuButton, MenuList, MenuItem, Text, VStack, Progress } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import tmdbAPI from '../api/tmdpApi'
import apiConfig from '../api/apiConfig'
import Episodes from '../components/episodes/Episodes'
import ListButton from '../components/listbutton/ListButton'
import InfoDisplay from '../components/infodisplay/InfoDisplay'
import { isOnList, getTimes } from '../scripts/ListManager'
import placeholder from '../res/NotFoundPoster.png'

const Details = () => {

	const { category, id } = useParams()

	const [details, setDetails] = useState({})
	const [seasonToList, setSeason] = useState(1)
	const [times, setTimes] = useState([])

	useEffect(() => {

		const scrape = async () => {

			const params = {}
			let response = await tmdbAPI.detail(category, id, { params })
			setDetails(response.data)

			if (isOnList(response.data.id) && category === 'tv') { setTimes(getTimes(response.data.id)) }
		}

		scrape()

	}, [category, id])

	return (
		<Box>
			<Helmet><title>{details.name || details.title}</title></Helmet>
			{category === 'tv' && isOnList(details.id) && <Progress mx={4} borderRadius={4} value={(times[0] / times[1]) * 100} hasStripe isAnimated />}
			<HStack align='flex-start'>
				<Image src={(details.poster_path !== null || details.poster_path !== null) ? apiConfig.w500Image(details.poster_path || details.poster_path) : placeholder} alt={details.name || details.title} my={4} ml={4} borderRadius='2xl' width='20%' />
				<VStack>
					<HStack justifyContent='space-between' width='100%' p={4}>
						<HStack>
							<Heading textDecoration='underline'>{details.name || details.title}</Heading>
							<Badge colorScheme='blue'>ID: {details.id}</Badge>
							<Badge>{details.status}</Badge>
						</HStack>
						<ListButton item={details} />
					</HStack>
					<HStack align='flex-start'>
						<Box px={4}>
							<Text fontSize='lg'>{details.overview}</Text>
							{category === 'tv' && <Text>{details.number_of_seasons} {details.number_of_seasons > 1 ? 'Seasons' : 'Season'} | {details.number_of_episodes} Episodes</Text>}
							{category === 'tv' && isOnList(details.id) && <Text>{times[0]} minutes watched | {times[1] - times[0]} minutes remaining</Text>}
						</Box>
						<InfoDisplay item={details} />
					</HStack>
				</VStack>
			</HStack>

			{/* Is this a show? If it is, render the season selector and episodes */}
			{category === 'tv' &&
				<Box>
					<Menu autoSelect={false}>
						<MenuButton ml={4} mb={4} as={Button} rightIcon={<ChevronDownIcon />}>Seasons</MenuButton>
						<MenuList>
							{details.seasons && details.seasons.map((season, num) => (
								season.season_number !== 0 && <MenuItem onClick={() => setSeason(season.season_number)} key={num}>{season.name}</MenuItem>
							))}
						</MenuList>
					</Menu>
					{seasonToList !== null && <Episodes id={id} season={seasonToList} />}
				</Box>
			}
		</Box>
	)
}

export default Details