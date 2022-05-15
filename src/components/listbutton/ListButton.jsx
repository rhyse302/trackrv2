import React, { useEffect, useState } from 'react'

import { IconButton, useToast } from '@chakra-ui/react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'

const ListButton = (props) => {

  const [onList, setOnList] = useState(localStorage.getItem(props.item.id) ? true : false)

  const toast = useToast()

  //When the page is first rendered, see if the element is on the list
  useEffect(() => {

    setOnList(localStorage.getItem(props.item.id) !== null)

  }, [props.item.id])

  //Put on the watchlist and commit to local storage, otherwise remove from the watchlist and delete from local storage
  const listManage = () => {

    if (!onList) {
      toast({
        title: 'Item added',
        description: `${props.item.name || props.item.title} has been successfully added to your watchlist.`,
        status: 'success',
      })
      localStorage.setItem(JSON.stringify(props.id), JSON.stringify(props.category))
    } else {
      toast({
        title: 'Item removed',
        description: `${props.item.name || props.item.title} has been successfully removed from your watchlist.`,
        status: 'error'
      })
      localStorage.removeItem(JSON.stringify(props.id))
    }

    setOnList(!onList)

  }

  return (
    <IconButton onClick={() => listManage()} icon={onList ? <BsBookmarkFill /> : <BsBookmark />} />
  )
}

export default ListButton