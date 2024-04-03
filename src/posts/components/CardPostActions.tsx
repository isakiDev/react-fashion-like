import { useState } from 'react'

export const CardPostActions = () => {
  const [showMenuActions, setShowMenuActions] = useState(false)

  return (
    <div className='flex flex-col ml-auto relative'>
      <button
        className='realtive z-10 px-2 py-1 rounded-full hover:bg-gray-200 font-bold text-gray-600'
        onClick={() => setShowMenuActions(!showMenuActions)}
      >...</button>

      {showMenuActions && (
        <div
          className='fixed inset-0'
          onClick={() => setShowMenuActions(false)}
        ></div>
      )}

      <div className={`absolute ${!showMenuActions && 'hidden'} top-10 right-[1px] w-[100px] rounded-md bg-white shadow-lg py-1`}>
        <button className='w-full hover:bg-gray-100 font-semibold text-gray-600'>Edit</button>
      </div>
    </div>
  )
}
