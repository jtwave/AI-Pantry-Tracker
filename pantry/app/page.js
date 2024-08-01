'use client'
import { Box, Typography, Stack, Button, Modal, TextField } from "@mui/material"
import { firestore } from "@/firebase"
import { collection, getDocs, query, setDoc, doc, deleteDoc, getDoc } from "firebase/firestore"
import { useEffect, useState } from 'react'
import * as React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [itemName, setItemName] = useState('');
  const [open, setOpen] = useState(false);
  const [pantry, setPantry] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = docs.docs.map(doc => ({ name: doc.id, ...doc.data() }));
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 }, { merge: true });
    } else {
      await setDoc(docRef, { count: 1 });
    }

    updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item.toLowerCase());
    await deleteDoc(docRef);
    updatePantry();
  };

  return (
    <Box
      width="100vw"
      height="150vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Button variant="outlined" onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ADD NEW ITEM
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              ADD
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box width="800px" height="100px" bgcolor="#739BD0" display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h2" color="#333" textAlign="center">
          Pantry Items
        </Typography>
      </Box>
      <Stack width="800px" height="200px" spacing={2} overflow="auto">
        {pantry.map(({ name, count }) => (
          <Stack
            key={name}
            width="100%"
            height="500px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#f0f0f0"
            gap={5}
            direction="row"
          >
            <Typography variant="h3" color="#333" textAlign="center" width="100%">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography width="100%" variant="h3" color="#333">
              quantity: {count}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => removeItem(name)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
