import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { noteActions } from '../_actions/note.actions';

const qs = require('query-string');

const styles = theme => ({
    container: {
        width: '100%',
        margin: theme.spacing.unit,
        alignItems: 'center',
        padding: 0,
    },
    paperContainer: {
        height: '100%',
        padding: theme.spacing.unit,
    },
    emptyPaperContainer: {
        height: '100%',
        padding: theme.spacing.unit,
    },
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'cover',  
    },
    inputHeader: {
        fontSize: 30
    },
    inputBody: {
        overflowY: 'hidden'
    }
});

const WAIT_INTERVAL = 300;

const ENTER_KEY = 13;

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            header: '',
            body: '',
            note: null
        }
        this.timer = null;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.triggerSave = this.triggerSave.bind(this);
    }

    componentDidMount(){
        const { location, notes } = this.props;
        const note_id = qs.parse(location.search).n;
        const note = notes.items.find((note) => note.id == note_id);
        if(note != undefined){
            this.setState({ id: note_id, header: note.title, body: note.body });
        }
    }

    handleInputChange(e) {
        clearTimeout(this.timer);
        
        this.setState({
            [e.target.name]: e.target.value
        });
        this.timer = setTimeout(this.triggerSave, WAIT_INTERVAL);
    }

    triggerSave() {
        const { header, body } = this.state;
        const { dispatch } = this.props;
        const notebook_id = qs.parse(this.props.location.search).nb;
        const id = qs.parse(this.props.location.search).n;
        //const note = { ...this.state.note, header: header, body: body };
        console.log(header + ' ' + body);
        dispatch(noteActions.updateNote(id, header, body, notebook_id));
    }

    render() {
        const { classes, notes } = this.props;
        const note_id = qs.parse(location.search).n;
        const note = notes.items.find((note) => note.id == note_id);
        if(note === undefined){
            return (
                <Paper className={classes.emptyPaperContainer}>
                    <Typography gutterBottom variant="h5" component="h2">Select note to view it</Typography>
                </Paper>
            )
        }
        if(note.id !== this.state.id){
            this.setState({ id: note.id, header: note.title, body: note.body });
        }
        return (
            <div className={classes.container}>
                <Paper className={classes.paperContainer}>
                    <Typography gutterBottom variant="h5" component="h2">
                        <InputBase 
                            classes={{
                                input: classes.inputHeader
                            }}
                            name='header'
                            value={this.state.header}
                            placeholder='Untitled'
                            fullWidth={true}
                            onChange={this.handleInputChange}
                        />
                    </Typography>
                    <InputBase 
                        classes={{
                            input: classes.inputBody
                        }}
                        name='body'
                        placeholder='Start typing here...'
                        value={this.state.body}
                        fullWidth={true}
                        multiline={true}
                        onChange={this.handleInputChange}
                    />
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { notes } = state;

    return {
        notes
    };
}

const connectedNote = withStyles(styles)(withRouter(connect(mapStateToProps)(Note)));
export { connectedNote as Note };