import React from 'react'
import EditTextField from './editpageTable'
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        margin: 15,
    },
});

class EditPage extends React.Component {
    render() {
        return (
            <Paper className={this.props.classes.root}>
                <EditTextField id={this.props.match.params.id} />
            </Paper>

        )
    }
}
export default withStyles(styles)(EditPage);