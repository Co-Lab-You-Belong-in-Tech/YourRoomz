import * as React from 'react'
import { useHistory } from 'react-router-dom'
import Loader from 'react-ts-loaders'
import { useDispatch, useSelector } from 'react-redux'
import { QueryClient } from 'react-query'
import { setRoomId } from '../../lib/redux/roomSlice'
import RoomRow from './RoomRow'
import { formatRoomObj } from '../../lib/helpers/formatRoomObj'
import { useRoomsById } from '../../lib/react-query/roomQueries'
// import { queryCache } from

const Rooms = ({ userId }) => {
  const queryClient = new QueryClient()
  const dispatch = useDispatch()
  const { data, error, isFetching } = useRoomsById(userId)
  queryClient.refetchQueries({ stale: true })

  const history = useHistory()

  const handleEditRoom = async e => {
    const formattedRoom = formatRoomObj(data.find(x => x.id === e.target.id))
    await dispatch(setRoomId(formattedRoom))
    history.push('/add-room')
  }

  if (isFetching) {
    return <Loader size={50} color="" />
  }
  if (error) {
    return <div>There was a problem fetching the room list</div>
  }

  return (
    <>
      <div>
        <div className="rooms title">
          <div>Room</div>
          <div>Wall Color</div>
          <div>Floor Color</div>
          <div>Furniture</div>
          <div>Cart Items</div>
          <div></div>
        </div>
        {data?.map(room => {
          return (
            <RoomRow
              key={room.id}
              room={room}
              handleEditRoom={handleEditRoom}
            />
          )
        })}
      </div>
    </>
  )
}

export default Rooms
