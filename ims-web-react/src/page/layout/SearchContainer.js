import React, {Component} from 'react'

import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

class SearchContainer extends Component {

    render() {
        return (
            <div>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="查询条件" key="1" showArrow={false}>
                        {this.props.children}
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default SearchContainer;