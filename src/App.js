import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const changeHandler = e => {
    setCity(e.target.value);
  }

  const submitHandler = e => {
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp;
        const celcius = kelvin - 273.15;
        setResult(`Temperature in ${city}: ${Math.round(celcius)}°C`);
      })
      .catch(error => console.log(error));
    setCity("");
  }

  return (
    <Box
      sx={{
        backgroundImage: 'url(https://www.pixelstalk.net/wp-content/uploads/2016/07/HD-Weather-Image.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Weather App
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={changeHandler}
                margin="normal"
              />
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Get Temperature
              </Button>
            </form>
            {result && (
              <Typography variant="h6" component="h3" gutterBottom mt={2}>
                {result}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
