'use client'
import { Box, Typography, Stack } from "@mui/material"
import { firestore } from "@/firebase"
import { collection, getDocs, query } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { async } from "@firebase/util"

export default function Home() {
  const [pantry, setPantry] = useState([])
  useEffect( () => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'))
    const docs =  await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(doc.id)
    })
    setPantry(pantryList)
    }
    updatePantry()
  }, [])
  return (
  <Box 
    width="100vw" 
    height="150vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
  >
    <Box width="800px" height="100px" bgcolor={'#739BD0'}display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
        Pantry Items
      </Typography>
    </Box>
      <Stack width="800px"height="200px"spacing={2} overflow={'auto'}>

        {pantry.map((i) => (
          <Box
            key = {i}
            width="100%"
            height="500px"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={"#f0f0f0"}
          >
            <Typography
              variant={'h3'}
              color={'#333'}
              textAlign={'center'}
            >
              {
              i.charAt(0).toUpperCase() + i.slice(1)
              }
            </Typography>
          </Box>
        ))}
      </Stack>
  </Box>
  )
}