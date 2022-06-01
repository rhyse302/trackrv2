import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Badge, Box, Button, Heading, HStack, Menu, Image, MenuButton, MenuList, MenuItem, Text, VStack, Progress } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import tmdbAPI from '../api/tmdpApi'
import apiConfig from '../api/apiConfig'
import Episodes from '../components/episodes/Episodes'
import ListButton from '../components/listbutton/ListButton'
import { isOnList, getTimes } from '../scripts/ListManager'

import './details.scss'

const Details = () => {

	const { category, id } = useParams()

	const [details, setDetails] = useState({})
	const [seasonToList, setSeason] = useState()
	const [times, setTimes] = useState([])

	useEffect(() => {

		const scrape = async () => {

			const params = {}
			let response = await tmdbAPI.detail(category, id, { params })
			console.log(response.data.seasons)
			setDetails(response.data)
			console.log(await tmdbAPI.episodes(id, 0))

			if (isOnList(response.data.id)) { setTimes(getTimes(response.data.id)) }

		}

		scrape()

	}, [category, id])

	const setSeasonToList = (num) => {
		console.log(num)
		setSeason(num === 0 ? 100 : num)
	}

	return (
		<Box>
			<Helmet><title>{details.name || details.title}</title></Helmet>
			{category === 'tv' && isOnList(details.id) && <Progress mx={4} borderRadius={4} value={(times[0] / times[1]) * 100} hasStripe={true} />}
			<div className="detailitem">
				<Image src={apiConfig.w500Image(details.poster_path || details.background_path)} alt={details.name || details.title} m={4} borderRadius={16} width='30%' />
				<VStack>
					<HStack justifyContent='space-between' width='100%' p={4}>
						<HStack>
							<Heading textDecoration='underline'>{details.name || details.title}</Heading>
							<Badge colorScheme='blue'>ID: {details.id}</Badge>
							<Badge>{details.status}</Badge>
						</HStack>
						<ListButton item={details} />
					</HStack>
					<Box px={4}>
						<Text>{details.overview}</Text>
						{category === 'tv' && <Text>{details.number_of_seasons} {details.number_of_seasons > 1 ? 'Seasons' : 'Season'} | {details.number_of_episodes} Episodes</Text>}
						{category === 'tv' && isOnList(details.id) && <Text>{times[0]} minutes watched | {times[1] - times[0]} minutes remaining</Text>}
					</Box>
				</VStack>
			</div>

			{/* Is this a show? If it is, render the season selector and episodes */}
			{category === 'tv' &&
				<Box>
					<Menu autoSelect={false}>
						<MenuButton ml={4} mb={4} as={Button} rightIcon={<ChevronDownIcon />}>Seasons</MenuButton>
						<MenuList>
							{details.seasons && details.seasons.map((season, num) => (
								/*season.season_number !== 0 && */<MenuItem onClick={() => setSeasonToList(num)} key={num}>{season.name}</MenuItem>
							))}
						</MenuList>
					</Menu>
					{seasonToList && <Episodes id={id} season={seasonToList} />}
				</Box>
			}
		</Box>
	)
}

export default Details