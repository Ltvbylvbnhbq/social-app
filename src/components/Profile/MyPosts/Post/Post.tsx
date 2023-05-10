import React from "react";
import s from "../Post/Post.module.css";

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png" alt={"man"} />
            {props.message}
            <div>
                <span>Like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post