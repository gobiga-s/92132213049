import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import { isValidURL, isValidShortcode } from '../utils/validators';

const URLShortener = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  // Handle input change
  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  // Add another row (max 5)
  const handleAddUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  // Submit and shorten URLs
  const handleSubmit = () => {
    const newResults = urls.map((url) => {
      // Input validation
      if (!isValidURL(url.longUrl)) {
        return { error: 'Invalid URL format!' };
      }

      if (url.shortcode && !isValidShortcode(url.shortcode)) {
        return { error: 'Invalid shortcode! Must be alphanumeric and 4+ chars.' };
      }

      const short = url.shortcode || Math.random().toString(36).substring(2, 8);
      const createdAt = new Date();
      const validityMins = url.validity ? parseInt(url.validity, 10) : 30;
      const expiresAt = new Date(createdAt.getTime() + validityMins * 60000);

      return {
        longUrl: url.longUrl,
        shortUrl: `http://localhost:3000/${short}`,
        createdAt,
        expiresAt
      };
    });

    setResults(newResults);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>URL Shortener</Typography>

      {urls.map((url, i) => (
        <Paper key={i} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Long URL"
                value={url.longUrl}
                onChange={(e) => handleChange(i, 'longUrl', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Validity (mins)"
                type="number"
                value={url.validity}
                onChange={(e) => handleChange(i, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Preferred Shortcode"
                value={url.shortcode}
                onChange={(e) => handleChange(i, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="outlined" onClick={handleAddUrl} disabled={urls.length >= 5}>+ Add More</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten</Button>

      {/* Output Section */}
      <Box mt={4}>
        {results.length > 0 && (
          <Typography variant="h6" gutterBottom>Shortened URL Results</Typography>
        )}
        {results.map((res, i) => (
          res.error ? (
            <Typography color="error" key={i}>{res.error}</Typography>
          ) : (
            <Paper key={i} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography><strong>Original URL:</strong> {res.longUrl}</Typography>
              <Typography>
                <strong>Shortened URL:</strong>{' '}
                <a href={res.shortUrl} target="_blank" rel="noopener noreferrer">{res.shortUrl}</a>
              </Typography>
              <Typography><strong>Created At:</strong> {res.createdAt.toLocaleString()}</Typography>
              <Typography><strong>Expires At:</strong> {res.expiresAt.toLocaleString()}</Typography>
            </Paper>
          )
        ))}
      </Box>
    </Box>
  );
};

export default URLShortener;