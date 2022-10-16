import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus = (props: ProfileStatusType) => {
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)


    const activateEditMode = () => {
        setEditMode(true)
    }
    const disactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{props.status || '---'}</span>
                    </div>
                }
                {editMode &&
                    <div>
                        <input autoFocus={true}
                               onBlur={disactivateEditMode}
                               value={status}
                               onChange={onStatusChange}
                        />
                    </div>
                }
            </div>
    )
}


export default ProfileStatus;