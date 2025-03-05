import React, { createContext, useState } from 'react'
let x = createContext()
const ContextApi = ({props}) => {
let [cart ,setCart] = useState([])
  return (
    <div>
      <x.Provider value={{cart,setCart}}>
        {props}
      </x.Provider>
    </div>
  )
}

export default ContextApi