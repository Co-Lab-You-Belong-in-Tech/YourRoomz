import * as React from 'react'

const RoomContext = React.createContext()

const RoomProvider = props => {
  const [roomInfo, setRoomInfo] = React.useState(null)
  const [newFurniture, setNewFurniture] = React.useState()

  const updateRoomInfo = room => {
    setRoomInfo(room)
  }

  const updateNewFurniture = furniture => {
    setNewFurniture(furniture)
  }

  const contextValue = {
    roomInfo,
    updateRoomInfo,
    newFurniture,
    updateNewFurniture,
  }

  return (
    <>
      <RoomContext.Provider value={contextValue} {...props} />
    </>
  )
}

const useRoomContext = () => {
  const context = React.useContext(RoomContext)
  if (!context) {
    throw new Error('useAuth must be used within a RoomProvider')
  }
  return context
}

export { RoomProvider, useRoomContext }
