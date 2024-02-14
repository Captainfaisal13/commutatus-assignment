import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Toast = ({ message }) => {
  //   const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div>
      <Button
        onClick={handleClick({ vertical: "top", horizontal: "center" })}
        className="text-sm bg-black text-white rounded-lg p-2 w-full"
      >
        Add Team
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
};

export default Toast;

// import * as React from 'react';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';

// export default function PositionedSnackbar() {
//   const [state, setState] = React.useState({
//     open: false,
//     vertical: 'top',
//     horizontal: 'center',
//   });
//   const { vertical, horizontal, open } = state;

//   const handleClick = (newState) => () => {
//     setState({ ...newState, open: true });
//   };

//   const handleClose = () => {
//     setState({ ...state, open: false });
//   };

//   const buttons = (
//     <React.Fragment>
//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
//           Top-Center
//         </Button>
//       </Box>
//       <Grid container justifyContent="center">
//         <Grid item xs={6}>
//           <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>
//             Top-Left
//           </Button>
//         </Grid>
//         <Grid item xs={6} textAlign="right">
//           <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
//             Top-Right
//           </Button>
//         </Grid>
//         <Grid item xs={6}>
//           <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>
//             Bottom-Left
//           </Button>
//         </Grid>
//         <Grid item xs={6} textAlign="right">
//           <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
//             Bottom-Right
//           </Button>
//         </Grid>
//       </Grid>
//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
//           Bottom-Center
//         </Button>
//       </Box>
//     </React.Fragment>
//   );

//   return (
//     <Box sx={{ width: 500 }}>
//       {buttons}
//       <Snackbar
//         anchorOrigin={{ vertical, horizontal }}
//         open={open}
//         onClose={handleClose}
//         message="I love snacks"
//         key={vertical + horizontal}
//       />
//     </Box>
//   );
// }
