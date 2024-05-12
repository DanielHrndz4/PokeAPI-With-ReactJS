import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'; 

export default function Pagination({ page }) {
  return (
    <Stack spacing={9} className='m-auto'>
      <Typography>Page: {page}</Typography>
      <Pagination count={1} page={page} component="div" 
        renderItem={(item) => (
          <Pagination.Item
            component={Link}
            to={`/page/${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
