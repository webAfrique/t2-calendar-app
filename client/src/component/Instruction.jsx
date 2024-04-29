import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const instructions = [
  {
    icon: <HowToRegIcon />,
    title: 'Register or Login',
    description:
      'Register or Login to start designing your digital advent calendar.',
  },
  {
    icon: <EditCalendarIcon />,
    title: 'Customize Your Calendar',
    description:
      'Personalize the calendar by adding your own images, video urls and messages to each day.',
  },
  {
    icon: <RemoveRedEyeOutlinedIcon />,
    title: 'Preview Your Calendar',
    description:
      'Preview your customized calendar to see how it looks before finalizing it.',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Generate Your Calendar',
    description:
      'Click on "Create" to generate your digital advent calendar and share it with others.',
  },
];

const Instruction = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };


  return (

    
      <Box
        sx={{
          margin: 0,
          minHeight: "100vh",
          backgroundImage: "url(/hero_image.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: '40px', md: '0 50px' },
          textAlign: "center",
        }}>
          <Container id="instruction" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <div>
            <Typography component="h1"
            variant="h2"
            gutterBottom  
            sx={{
            fontFamily: "Inter",
            fontSize: { xs: "36px", md: "64px" },
            fontWeight: "bold",
            color: "#00A8CD",
            textAlign: "center",
          }}>
              How to Use Our Platform
            </Typography>
            <Typography
              component="h2"
              variant="h4"
              gutterBottom
              sx={{
            fontFamily: "Inter",
            fontSize: { xs: "18px", md: "24px" },
            fontWeight: "bold",
            color: "#476C92",
            textAlign: "center",
            marginBottom: "30px",
          }}
            >
              Follow these simple steps to design your digital advent calendar:
            </Typography>
          </div>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%' }}
          >
            {instructions.map(({ icon, title, description }, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  borderColor: selectedItemIndex === index ? '#476C92' : 'white',
                  backgroundColor: selectedItemIndex === index ?  '#476C92': 'white',
                  color: selectedItemIndex === index ?   'white' : '#476C92',
                  textTransform: 'none',
                   "&:hover": selectedItemIndex === index ?{
                  backgroundColor: "#476C92",
                   } :{
                  backgroundColor: "white",
                  color: "#476C92",
                  borderColor: "#476C92",
                  boxShadow: "none",
                  border: "1px solid",
                },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box sx={{ color: selectedItemIndex === index ? 'white' : '#476C92' }}>
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none',
                  color: selectedItemIndex === index ? 'white' : '#476C92'
                 }}>
                    <Typography 
                    
                    variant="body2" 
                    fontWeight="bold" >
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ my: 0.5 }}>
                      {description}
                    </Typography>
                  </Box>
                </Box>
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
};

export default Instruction;
