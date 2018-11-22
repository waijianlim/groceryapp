import React from 'react'
import EditTextField from './editpageTable'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        paddingLeft: 15,
        padding: 15,
    }
});


class EditPage extends React.Component {
    render() {
    const { classes } = this.props;
    return <div className={classes.root}>
        <h2>Product</h2>
        <EditTextField id={this.props.match.params.id} />
    </div>
}
}

export default withStyles(styles)(EditPage);