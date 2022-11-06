import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../../redux/Users-reducer";
import {useAppSelector} from "../../../redux/redux-store";

type PropsType = {
    onFilterChanged:  (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: FriendFormType
}
type FriendFormType = 'true' | 'false' | 'null'

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) =>{

    const filter = useAppSelector(state => state.usersPage.filter)

    const submit = (values: FormType, { setSubmitting}:{setSubmitting: (isSubmitting: boolean)=> void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
                validate={values => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field  name="friend" as='select' >
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>

    )
})