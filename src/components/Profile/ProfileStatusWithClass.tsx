import React, { ChangeEvent } from 'react';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

class ProfileStatusWithClass extends React.Component<ProfileStatusType> {
    state = {
        editMode: false, 
        status: this.props.status
    }

    activateEditMode = () =>{
     
        this.setState({
            editMode: true
        })
    }
    disactivateEditMode = () => {
    
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }
 
    render() {

        console.log(this.state.editMode)
        return (
            <>
                <div>
                    {!this.state.editMode&&
                        <div>  
                            <span onDoubleClick={this.activateEditMode}>{this.props.status || '---'}</span>
                        </div>
                    }
                    {this.state.editMode&&
                        <div>
                            <input autoFocus={true} onBlur ={this.disactivateEditMode}
                                     value={this.state.status} 
                                     onChange={this.onStatusChange}
                                     />
                        </div>
                    }
                    

                </div>
            </>
        )
    }
}


export default ProfileStatusWithClass;