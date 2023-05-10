import {PostType} from "../../../types/types";
import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>)
return (
    <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddPostForm newText={props.addPost} />
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
)
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized