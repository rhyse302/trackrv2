import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Badge, Box, Button, Heading, HStack, Menu, Image, MenuButton, MenuList, MenuItem, Text, VStack, Progress } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import tmdbAPI from '../api/tmdpApi'
import apiConfig from '../api/apiConfig'
import Episodes from '../components/episodes/Episodes'
import ListButton from '../components/listbutton/ListButton'

import './details.scss'

const Details = () => {

	const { category, id } = useParams()

	const [details, setDetails] = useState([])
	const [seasonToList, setSeasonToList] = useState(0)

	useEffect(() => {

		const scrape = async () => {

			let response = null;
			const params = {}
			response = await tmdbAPI.detail(category, id, { params })
			setDetails(response.data)

		}

		scrape()

	}, [category, id])

	return (
		<Box>
			<Helmet><title>{details.name || details.title}</title></Helmet>
			{category === 'tv' && <Progress mx={4} borderRadius={4} value={56} hasStripe={true} />}
			<div className="detailitem">
				<Image src={apiConfig.w500Image(details.poster_path || details.background_path)} alt={details.name || details.title} m={4} borderRadius={16} width='30%' />
				<VStack>
					<HStack justifyContent='space-between' width='100%' p={4}>
						<Heading textDecoration='underline'>{details.name || details.title} <Badge colorScheme='blue'>ID: {details.id}</Badge></Heading>
						<ListButton id={details.id} name={details.name || details.title} category={category} />
					</HStack>
					<Box px={4}>
						<Text>{details.overview}</Text>
						{category === 'tv' && <Text>{details.number_of_seasons} {details.number_of_seasons > 1 ? 'Seasons' : 'Season'} | {details.number_of_episodes} Episodes</Text>}
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
								<MenuItem onClick={() => setSeasonToList(num)} key={num}>{season.name}</MenuItem>
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