import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from '@mui/system/Unstable_Grid/Grid';
function DashBoard() {

  return (
    <Grid container rowSpacing={5} columnSpacing={{ xs: 5, sm: 10, md: 15 }} sx={{ paddingTop: '128px' }}>
      <Grid>
        <Box
          sx={{
            backgroundColor: "#F4D35E",
            width: "80%", // Increase this to make the box wider
            maxWidth: "800px", // You can adjust this as needed
            p: 4, // Padding inside the box for spacing
            display: "flex",
            flexDirection: "column",
            alignItems: "left", // Center children horizontally
            justifyContent: "center", // Center children vertically
            gap: 3, // Space between items
            borderRadius: "20px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // This adds a shadow to create the lifted tile effect
            // You can adjust the x-offset, y-offset, blur-radius, and spread-radius to get the desired effect
            transition: "box-shadow 0.3s", // Smooth transition for the shadow, can be omitted if not needed
            "&:hover": {
              boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)", // Optional: Change shadow on hover for an interactive effect
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#392A16",
              fontSize: "2.5rem", // Increase this to make the text larger
              textAlign: "center",
              mb: 4, // Increase bottom margin to add more space
            }}
          >
            Level: 1
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            backgroundColor: "#F4D35E",
            width: "80%", // Increase this to make the box wider
            maxWidth: "800px", // You can adjust this as needed
            p: 4, // Padding inside the box for spacing
            display: "flex",
            flexDirection: "column",
            alignItems: "left", // Center children horizontally
            justifyContent: "center", // Center children vertically
            gap: 3, // Space between items
            borderRadius: "20px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // This adds a shadow to create the lifted tile effect
            // You can adjust the x-offset, y-offset, blur-radius, and spread-radius to get the desired effect
            transition: "box-shadow 0.3s", // Smooth transition for the shadow, can be omitted if not needed
            "&:hover": {
              boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)", // Optional: Change shadow on hover for an interactive effect
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#392A16",
              fontSize: "2.5rem", // Increase this to make the text larger
              textAlign: "center",
              mb: 4, // Increase bottom margin to add more space
            }}
          >
            Level: 2
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            backgroundColor: "#F4D35E",
            width: "80%", // Increase this to make the box wider
            maxWidth: "800px", // You can adjust this as needed
            p: 4, // Padding inside the box for spacing
            display: "flex",
            flexDirection: "column",
            alignItems: "left", // Center children horizontally
            justifyContent: "center", // Center children vertically
            gap: 3, // Space between items
            borderRadius: "20px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // This adds a shadow to create the lifted tile effect
            // You can adjust the x-offset, y-offset, blur-radius, and spread-radius to get the desired effect
            transition: "box-shadow 0.3s", // Smooth transition for the shadow, can be omitted if not needed
            "&:hover": {
              boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)", // Optional: Change shadow on hover for an interactive effect
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#392A16",
              fontSize: "2.5rem", // Increase this to make the text larger
              textAlign: "center",
              mb: 4, // Increase bottom margin to add more space
            }}
          >
            Level: 3
          </Typography>
        </Box>
      </Grid>
      <Grid>
        <Box
          sx={{
            backgroundColor: "#F4D35E",
            width: "80%", // Increase this to make the box wider
            maxWidth: "800px", // You can adjust this as needed
            p: 4, // Padding inside the box for spacing
            display: "flex",
            flexDirection: "column",
            alignItems: "left", // Center children horizontally
            justifyContent: "center", // Center children vertically
            gap: 3, // Space between items
            borderRadius: "20px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", // This adds a shadow to create the lifted tile effect
            // You can adjust the x-offset, y-offset, blur-radius, and spread-radius to get the desired effect
            transition: "box-shadow 0.3s", // Smooth transition for the shadow, can be omitted if not needed
            "&:hover": {
              boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)", // Optional: Change shadow on hover for an interactive effect
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#392A16",
              fontSize: "2.5rem", // Increase this to make the text larger
              textAlign: "center",
              mb: 4, // Increase bottom margin to add more space
            }}
          >
            Level: 4
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default DashBoard;