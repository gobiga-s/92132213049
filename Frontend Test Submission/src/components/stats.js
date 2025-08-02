// src/components/Stats.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Stats = () => {
  const mockData = [
    {
      shortUrl: 'http://localhost:3000/abc123',
      clicks: 4,
      details: [
        { timestamp: '2025-08-01 14:00', source: 'Chrome', location: 'India' },
        { timestamp: '2025-08-01 15:00', source: 'Firefox', location: 'USA' }
      ]
    }
  ];

  return (
    <Box p={3}>
      <Typography variant="h5">Short URL Stats</Typography>
      {mockData.map((url, idx) => (
        <Paper key={idx} sx={{ padding: 2, marginTop: 2 }}>
          <Typography><strong>Short URL:</strong> {url.shortUrl}</Typography>
          <Typography><strong>Total Clicks:</strong> {url.clicks}</Typography>
          <Typography><strong>Details:</strong></Typography>
          <ul>
            {url.details.map((click, i) => (
              <li key={i}>
                {click.timestamp} - {click.source} - {click.location}
              </li>
            ))}
          </ul>
        </Paper>
      ))}
    </Box>
  );
};

export default Stats;
