import React, { useEffect, useState } from 'react'
import { addListItem, isOnList, removeItem } from '../../scripts/ListManager'

import { IconButton, useToast } from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

const ListButton = (props) => {

  const [onList, setOnList] = useState(isOnList(props.item.id))

  const toast = useToast()

  //When the page is first rendered, see if the element is on the list
  useEffect(() => {

    setOnList(isOnList(props.item.id))

  }, [props.item.id])

  //Put on the watchlist and commit to local storage, otherwise remove from the watchlist and delete from local storage
  const listManage = () => {

    if (!onList) {
      toast({
        title: 'Item added',
        description: `${props.item.name || props.item.title} has been successfully added to your watchlist.`,
        status: 'success',
      })
      addListItem(props.item)
      //localStorage.setItem(JSON.stringify(props.item.id), JSON.stringify(props.item.name ? 'tv' : 'movie'))
    } else {
      toast({
        title: 'Item removed',
        description: `${props.item.name || props.item.title} has been successfully removed from your watchlist.`,
        status: 'error'
      })
      removeItem(props.item.id)
      //localStorage.removeItem(JSON.stringify(props.item.id))
    }

    setOnList(!onList)

  }

  return (
    <IconButton onClick={() => listManage()} icon={onList ? <BsBookmarkFill /> : <BsBookmark />} />
  )
}

export default ListButton