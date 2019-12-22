import React from 'react'
import {getOrgTree} from '../../apis/api'
import {Tree} from 'antd'
// import {randomString} from '../../util/commonUtil'

const { TreeNode } = Tree;

class orgTree extends React.Component {
    state = {
        treeData: [
          {}
        ],
    };

    componentDidMount() {
        
    }

    render() {


        return (
            <div>

                <Tree>

                </Tree>
            </div>
        )
    }


}

export default orgTree;