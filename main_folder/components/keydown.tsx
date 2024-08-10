"use client"
import { Input } from "@/components/ui/input"
import React, { ChangeEvent, KeyboardEvent, useState } from "react"

const Key: React.FC = () =>
{
  const [inputvalue, setInputvalue] = useState<string>('')
  //keymap
  const keyMap: { [key: string]: string } = {
    'q': 'a', 'w': 'b', 'e': 'c', 'r': 'd', 't': 'e', 'y': 'f',
    'u': 'g', 'i': 'h', 'o': 'i', 'p': 'j', 'a': 'k', 's': 'l',
    'd': 'm', 'f': 'n', 'g': 'o', 'h': 'p', 'j': 'q', 'k': 'r',
    'l': 's', 'z': 't', 'x': 'u', 'c': 'v', 'v': 'w', 'b': 'x',
    'n': 'y', 'm': 'z'
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {setInputvalue(event.target.value)}
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (keyMap.hasOwnProperty(event.key)){
      event.preventDefault()
      setInputvalue(preValue => preValue + keyMap[event.key])
    }
  }
  return(
  <div>
    Hello World
    <Input type="text"
    value={inputvalue}
    onChange={handleChange}
    onKeyDown={handleKeyDown}/>
  </div>
  )
};

export default Key