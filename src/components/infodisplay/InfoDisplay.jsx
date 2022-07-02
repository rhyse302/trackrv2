import React from 'react'
import { Box, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'

import Info from './Info'

const InfoDisplay = (props) => {
  return (
    <Box px={4}>
      <Tabs>
        <TabList>
          <Tab>Streaming</Tab>
          <Tab>Cast</Tab>
          <Tab>Info</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            Streaming info
          </TabPanel>
          <TabPanel>
            Cast info
          </TabPanel>
          <TabPanel>
            <Info item={props} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default InfoDisplay