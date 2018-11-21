import React from 'react'
import EditTextField from './editpageTable'

// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/core/styles';
// import DeleteIcon from '@material-ui/icons/Delete';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import KeyboardVoiceICon from '@material-ui/icons/KeyboardVoice';
// import Icon from '@material-ui/core/Icon';
// import SaveIcon from '@material-ui/icons/Save';

// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit,
//   },
//   leftIcon: {
//     marginRight: theme.spacing.unit,
//   },
//   rightIcon: {
//     marginLeft: theme.spacing.unit,
//   },
//   iconSmall: {
//     fontSize: 20,
//   },
// });

// class SaveBox extends React.Component{
// 	state = {userName: ''}

// 	handleSubmit = (event) => {
//   	event.preventDefault()
    
//   }

// 	render(){
//   	return(
//     	<form onSubmit={this.handleSubmit}>
//     	  <input type="text" 
//         	value={this.state.userName}
//           onChange={(event) => this.setState({ userName: event.target.value})}
//         	placeholder="Search products..." required />
//         <button type="submit">Go</button>
//     	</form>
//       )
//   }
// }

export default function EditPage(props) {
    return <div>
        <h2>Edit Item</h2>
        <EditTextField id={props.match.params.id} />
    </div>
}

