import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import { Chip } from '@mui/material';
import { Avatar } from '@material-ui/core';
import SingleComment from './SingleComment';


function ViewComment() {
  return (
      <>
        <SingleComment name="Admin" date="21/1/22" comment_msg="Yooooo"/>
      </>
  );
}

export default ViewComment