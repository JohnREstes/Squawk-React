import React from 'react';
import { useSelector } from 'react-redux'

export default function BuildProfilePicture(base64TextString) {
  const feed = useSelector(state => state.feed);
  const userImage = "data:image/png;base64," + base64TextString;
  console.log(userImage);
  const preview = document.getElementById('profile-pic');
  if(preview !== null){
    preview.src = userImage;
  }
}