import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import Tooltip from '@mui/material/Tooltip';

export default function Footer() {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 50}} elevation={3}>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
              <ScreenShareIcon sx={{mr: 1}} />
              <Tooltip title="Click to open JSONWP Article">
                <Typography color="black" variant="subtitle1"
                  onClick={()=>{window.open("https://doi.org/10.1093/bioadv/vbad154", '_blank', 'noreferrer');}}
                  >JSON Web Page Renderer</Typography>
              </Tooltip>
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
