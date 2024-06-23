import React from 'react';
import { Box, CssBaseline, Grid, Typography } from '@mui/material';
import TopBox from './TopBox';


// It has been disabled temporarily  
const About = ({ data }) => {
  console.log(data)

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100%' }}>
            <TopBox
              title="Transactions"
              value={'Transactions'}
              description={`+10 from last week`}
              icon="📈"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100%' }}>
            <TopBox
              title="Transactions"
              value={'Transactions'}
              description={`+10 from last week`}
              icon="📈"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100%' }}>
            <TopBox
              title="Transactions"
              value={'Transactions'}
              description={`+10 from last week`}
              icon="📈"
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ height: '100%' }}>
            <TopBox
              title="Transactions"
              value={'Transactions'}
              description={`+10 from last week`}
              icon="📈"
            />
          </Box>
        </Grid>
      </Grid>
  )
}

export default About;
