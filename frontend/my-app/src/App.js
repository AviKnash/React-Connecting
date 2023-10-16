import DisplayData from "./DisplayData";
import { useLazyQuery,useQuery, gql, useSubscription, useMutation } from '@apollo/client';
import { isRequiredInputField } from 'graphql';
import { useState } from 'react';
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import { Box, createTheme, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from '@mui/material/';

function App(){

  const [mode, setMode] = useState("light");
  
  const darkTheme = createTheme({
     palette:{
      mode:mode,
  
    },
    });
  
  return(
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
        <Box>
            <Navbar/>
            <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode}/>
            <Feed/>
            <Rightbar/>
            </Stack>
      </Box>
    </ThemeProvider>
  )

}

export default App;

