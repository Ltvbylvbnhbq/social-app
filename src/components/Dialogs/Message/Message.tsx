import React from 'react'
import s from './../Dialogs.module.css'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props) => {
    return <div className={s.dialogs}>{props.message}</div>
}

export default Message