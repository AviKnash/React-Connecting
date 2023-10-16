import { Box, Button, ButtonGroup, ScopedCssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Switch, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { styled } from "@mui/system";
import PetsIcon from '@mui/icons-material/Pets';
import { gql, useMutation } from "@apollo/client";

const StyledModal=styled(Modal)({
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
})

function Sidebar({mode,setMode}){

  const[CreatePost]=useMutation(CREATE_POST,{
                  onCompleted(data){
                    setTag('');
                    setTitle('');
                    setOpen(false);
                  },
                  refetchQueries:[
                    {
                      query:QUERY_USER,
                    },
                  ]
                });


  const addNewPost=()=>{
    CreatePost({variables:{tag:tag,title:title}});
  }

  const [tag,setTag]=useState("");

  const [title,setTitle]=useState("");

  const [open,setOpen]=useState(false)


    return(
        
        <Box flex={1} p={2} sx={{display:{xs:"none",sm:"block"} }}>
                    <Box position="fixed">
                          <List>
                              <ListItem disablePadding>
                                <ListItemButton component="a" href='#home'>
                                  <ListItemIcon onClick={(e)=>setOpen(true)}>
                                    <HomeIcon/>  
                                  </ListItemIcon>
                                  <ListItemText primary="CREATE" onClick={(e)=>setOpen(true)} />
                                  <StyledModal
                              open={open}
                              onClose={(e)=>setOpen(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <ScopedCssBaseline>
                              <Box bgcolor={"palette.background.default"} width={400} height={350} p={3} borderRadius={5}>
                                <Typography variant="h6" color="gray" textAlign="center">Create Entry</Typography>
                                <TextField  value={tag} onChange={(e)=>setTag(e.target.value)} id="filled-basic" label="Tag for today!" variant="filled" />
                                <TextField
                                    sx={{width:"100%"}}
                                    id="standard-multiline-static"
                                    label="Entry"
                                    multiline
                                    rows={6}
                                    placeholder="How was your day?"
                                    variant="standard"
                                    onChange={(e)=>setTitle(e.target.value)}
                                    value={title}
                              />
                            <ButtonGroup  variant="contained" aria-label="outlined primary button group">
                              <Button onClick={addNewPost} disabled={!tag | !title} sx={{width:"350px"}}><PetsIcon/></Button>
                            </ButtonGroup>
                              </Box>
                              </ScopedCssBaseline>
                            </StyledModal>
                                </ListItemButton>
                              </ListItem>
                              <ListItem disablePadding>
                                <ListItemButton component="a" href='#try'>
                                  <ListItemIcon>
                                      <Brightness4Icon/>
                                  </ListItemIcon>
                                  <Switch onChange={e=>setMode(mode==="light" ? "dark" : "light")}/>
                                </ListItemButton>
                              </ListItem>
                    </List>
              </Box>
        </Box>
    
        );

};

const CREATE_POST=gql`
mutation CreatePost($tag:String!,$title:String!){
  createPost(tag:$tag,title:$title){
   id
   tag
   title
   
 }
}
`
const QUERY_USER=gql`

{
  posts{
    id
    tag
    title
    date
    user{
      username
    }
  }

}
`

export default Sidebar;