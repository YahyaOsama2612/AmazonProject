import { CircularProgress } from '@mui/material';
import { Box } from '@mui/material';

function Spinner() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={24} thickness={4} />
    </Box>
  );
}
export default Spinner;