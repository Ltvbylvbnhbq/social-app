import React from "react"
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../types/types";
import {Field, FieldArray, Form, Formik} from "formik";

let contactsJsx = (name: string) => {
    return (
        <div key={name} className={s.contact}>
            <div>
                <b>{name}</b>:
            </div>

            <div>
                <Field
                    name={`contacts.${name}`}
                    type={'text'}
                    id={name}
                    placeholder={name}
                />
            </div>
        </div>)
}
type PropsType = {
    profile: ProfileType
    handleSubmit: (formData: ProfileType, setStatus: any,
                   setSubmitting: any, goToViewMode: any) => void
    goToViewMode: any
}

const ProfileDataForm: React.FC<PropsType> = (props) => {

    let {profile, handleSubmit, goToViewMode} = props

    let objectFromApiCopy = JSON.parse(JSON.stringify(profile))

    const arrayWithNames = Object.keys(profile.contacts)

    arrayWithNames.forEach((item) => {
        let value = objectFromApiCopy.contacts[item]
        if (value === null) {
            objectFromApiCopy.contacts[item] = ''
        }
    })

    return (
        <Formik
            initialValues={objectFromApiCopy}
            onSubmit={(values, bagWithMethods) => {
                let {setStatus, setSubmitting} = bagWithMethods

                handleSubmit(values, setStatus, setSubmitting, goToViewMode)
            }}>
            {(propsF) => {

                let {status, isSubmitting} = propsF

                return (
                    <Form>

                        <div>
                            <Field
                                name={'fullName'}
                                type={'text'}
                                placeholder={'Full name'}
                            />
                        </div>
                        <div>
                            <b>Looking for a job</b>
                            <Field
                                name={'lookingForAJob'}
                                type={'checkbox'}
                                id='lookingForAJob'/>
                        </div>

                        <div>
                            <b>My professional skills:</b>
                            <Field
                                name={'lookingForAJobDescription'}
                                as={'textarea'}
                            />
                        </div>
                        <div>
                            <b>About me:</b>
                            <br/><Field
                                name={'aboutMe'}
                                as={'textarea'}
                            />
                        </div>
                        <div>
                            <b>Contacts</b>:
                        </div>
                        <FieldArray
                            name="friends"
                            render={() => (
                                <div>
                                    {arrayWithNames.map(name => contactsJsx(name))}
                                </div>
                            )}
                        />

                        <div>< br/></div>

                        {status &&
                            <div className={s.validationErrorMessage}>
                                <b> ..{status} - with setStatus </b>
                            </div>}

                        <button type={'submit'}
                                disabled={isSubmitting}
                        >{isSubmitting ? 'Saved' : 'Save'}
                        </button>

                        <button onClick={goToViewMode}
                                type={'button'}
                                className={s.buttonCancel}> Cancel
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ProfileDataForm