import DialogItem from "./Dialogsitem/Dialogitem";
import React from 'react'
import s from './Dialogs.module.css';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Message from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer";

type DialogsPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(d => <DialogItem id={d.id} key={d.id} name={d.name} />)
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems} >
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>
            <AddMessageForm sendM={props.sendMessage}/>
        </div>
    )
}

type PropsType = {
    sendM:(newMessageBody: string) => void
}

const AddMessageForm: React.FC<PropsType> = (props) => {
    const validationSchema = Yup.object().shape({
        newMessageBody: Yup.string()
            .min(2, 'Must be longer than 2 characters !')
            .max(50, 'Must be shorter than 50 characters !')
            .required('Required!')
    })
    const addNewMessage = (values: string) => {
        props.sendM(values)
    }
    return (
        <Formik
            initialValues={{
                newMessageBody:''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                addNewMessage(values.newMessageBody)
                resetForm()}
            }>
            {({errors, touched}) => (
                <Form>
                    <Field
                        name={'newMessageBody'}
                        as={'textarea'}
                        placeholder={"Enter your message"}
                    />
                    {errors.newMessageBody && touched.newMessageBody ? (
                        <div className={s.error}>{errors.newMessageBody}</div>
                    ) : null}
                    <div>
                        <button type={'submit'}>Send</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Dialogs;