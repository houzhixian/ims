import {increment} from '../redux/actions/demo';
import React from 'react'
import { connect } from 'react-redux';

export class ReduxDemo extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        this.props.dispatch(increment())
    }

    render() {
        return (
            <div>{this.props.number}<button onClick={()=>this.onClick()}>点击+1</button></div>
        )
    }
}

export default connect(
    state => ({
        number: state.number
    })
)(ReduxDemo);