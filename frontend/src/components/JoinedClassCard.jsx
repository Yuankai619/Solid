import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Card, CardActions, CardContent, Button, IconButton, Typography,
  Menu, MenuItem, CardHeader
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ThemeProvider } from '@mui/material/styles';
import { useClassDataContext } from '../context/ClassDataContext';
import JoinedClassCardTheme from "../themes/JoinedClassCardTheme";
import PropTypes from 'prop-types';
function JoinedClassCard({ data }) {
  const { title, state, _id, ownerId } = data;
  const shortId = _id.slice(-6);
  const { handleDeleteJoinedClass } = useClassDataContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const ownerName = ownerId.userName;
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setAllowNavigate(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    handleClose();
    handleDeleteJoinedClass(_id);
  };
  const [allowNavigate, setAllowNavigate] = useState(true);
  const handleClose = () => {
    setAnchorEl(null);
    setAllowNavigate(true);
  };


  return (
    <ThemeProvider theme={JoinedClassCardTheme}>
      <Box sx={{ minWidth: 275 }} >
        <Card variant="outlined" sx={{ cursor: 'pointer' }} >
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/conversation/${_id}`} onClick={(e) => {
            if (!allowNavigate) {
              e.preventDefault();
            }
          }}>
            <CardHeader
              action={
                <IconButton
                  aria-label="class setting menu"
                  onClick={handleClickMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={title}
            />
            <Menu
              id="long-menu"
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: '#222222',
                  color: 'white',
                },
              }}
            >

              <MenuItem onClick={handleDelete} sx={{ color: "#CC0000" }}>Delete</MenuItem>
            </Menu>
            <CardContent >
              <Typography sx={{ fontSize: 15, fontWeight: 600, marginTop: '12px' }} color="#999" component="div">
                owner: {ownerName}
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 600, }} color="#000" >
                Room ID: {shortId}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </Box>
    </ThemeProvider>
  )
}
JoinedClassCard.propTypes = {
  data: PropTypes.shape({
    ownerId: PropTypes.string,
    title: PropTypes.string,
    state: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired
};
export default JoinedClassCard;