import {increase} from '../redux/actions/demo';
import React from 'react'
import { connect } from 'react-redux';

class ReduxDemo extends React.Component {
    componentDidMount() {
        console.log(this.props)
    }

    // constructor(props) {
    //     super(props);
    // }

    onClick() {
        this.props.dispatch(increase())
    }

    render() {
        const { PayIncrease, PayDecrease } = this.props;
        return (
            <div>
                <h2>当月工资为{this.props.tiger}</h2>
                <button onClick={PayIncrease}>升职加薪</button>
                <button onClick={PayDecrease}>迟到罚款</button>
            </div>
        )
    }
}

//需要渲染什么数据
function mapStateToProps(state) {
    return {
        tiger: state
    }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
    return {
        PayIncrease: () => dispatch({ type: '涨工资' }),
        PayDecrease: () => dispatch({ type: '扣工资' })
    }
}

//连接组件
export default ReduxDemo = connect(mapStateToProps, mapDispatchToProps)(ReduxDemo)
