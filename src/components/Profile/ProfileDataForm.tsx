import React from "react";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {saveProfile} from "../../redux/profile-reducer";
import FormControl from "@mui/material/FormControl";
import {Checkbox, FormGroup} from "@mui/material";
import {ProfileType} from "./ProfileContainer";

type ProfileDataFormType = {
    setEditMode: (editMode: boolean) => void
    profile: ProfileType
}
const ProfileDataForm = (props: ProfileDataFormType) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            aboutMe: props.profile.aboutMe,
            lookingForAJob: props.profile.lookingForAJob,
            lookingForAJobDescription: props.profile.lookingForAJobDescription,
            fullName: props.profile.fullName,
            userId: props.profile.userId,
            contacts: {
                facebook: '',
                website: '',
                vk: '',
                twitter: '',
                instagram: '',
                youtube: '',
                github: '',
                mainLink: '',
            },
            photos: {
                small: '',
                large: ''
            }
        },
        onSubmit: values => {
             dispatch(saveProfile(values))
            props.setEditMode(false)
            formik.resetForm()
        },

    })
    return <div>
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormGroup>
                    <div><Button type={'submit'} variant={'contained'} color={'primary'}>Save</Button></div>
                    <div>
                        <b>Full name: </b><TextField label="Fill name"
                                                     margin="normal"
                                                     {...formik.getFieldProps('fullName')}
                    />
                    </div>
                    <div>
                        <b>About me: </b><TextField label="About me"
                                                    margin="normal"
                                                    {...formik.getFieldProps('aboutMe')}
                    />
                    </div>
                    <div>
                        <b>Looking for a job: </b><Checkbox  {...formik.getFieldProps('lookingForAJob')}
                    />
                    </div>
                    <div>
                        <b>My profissional skills: </b> <TextField label="My skills' description"
                                                                   margin="normal"
                                                                   {...formik.getFieldProps('lookingForAJobDescription')}
                    />
                    </div>
                    <div>
                        <b>Contacts: </b>{Object.keys(props.profile.contacts).map(key => {
                        return <TextField key={key}
                                          label={key}
                                          margin="normal"
                                          {...formik.getFieldProps('contacts.' + key)}/>
                    })}
                    </div>
                </FormGroup>
            </FormControl>
        </form>
    </div>

}
export default ProfileDataForm