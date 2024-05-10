import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Pagination() {
  return (
    <Stack spacing={9} className='m-auto'>
      <Typography>Page: {page}</Typography>
      <Pagination count={1} page={page} onChange={handleChange} />
    </Stack>
  );
}