import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';

export default function Footer() {
  return (
    <Paper sx={{ position: 'sticky', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
              <ScreenShareIcon sx={{mr: 1}} />
              <Typography color="black" variant="subtitle1">JSON Web Page Renderer</Typography>
            </div>  
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle2">
              {`© ${new Date().getFullYear()} Mesih Kılınç`}
            </Typography>
          </Grid>
        </Grid>
    </Paper>
  );
}
