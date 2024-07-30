import { Box } from "@mui/material";

const items = ['potatoe', 'peppers', 'water bottle', 'apple', 'toilet paper']

export default function Home() {
  return <Box 
    width="100vw" 
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
  >
    <Stack width="800px"height="600px"spacing={2}>
    </Stack>
  </Box>
}