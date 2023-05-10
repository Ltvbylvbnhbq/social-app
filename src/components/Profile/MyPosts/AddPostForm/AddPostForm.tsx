import React from 'react';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

type PropsType = {
    newText: (newPostText: string) => void
}

const AddPostForm: React.FC<PropsType> = (props) => {

    const validationSchema = Yup.object().shape({

        newPostText: Yup.string()
            .min(2, 'Must be longer than 2 characters !')
            .max(50, 'Must be shorter than 50 characters !')
            .required('Required!')
    })

    const OnNewText = (values: string) => {
        props.newText(values)
    }

    return (
        <Formik
            initialValues={{
                newPostText: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, {resetForm}) => {
                OnNewText(values.newPostText)
                resetForm()
            }}
        >
            {() => (
                <Form>
                    <div>
                        <Field
                            name={'newPostText'}
                            as={'textarea'}
                            placeholder={'Enter your message'}
                        />
                    </div>
                    <div>
                        <button type={'submit'}>Add Post</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default AddPostForm
