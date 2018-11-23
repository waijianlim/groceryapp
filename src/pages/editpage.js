import React from 'react'
import EditTextField from './editpageTable'


export default class EditPage extends React.Component {
    render() {
        return (
            <EditTextField id={this.props.match.params.id} />

        )
    }
}