import {useDispatch, useSelector} from 'react-redux'

export const newPost = useSelector(state => state.posts);

export const dispatch = useDispatch();