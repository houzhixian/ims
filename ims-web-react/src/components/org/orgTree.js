import React from "react";
import { getOrgTree } from "../../apis/api";
import { Tree, Icon, Row, Col, Button, Layout } from "antd";
// import {randomString} from '../../util/commonUtil'
// const { Header, Footer, Sider, Content } = Layout;
import CreateOrg from './modal/create'


const { Header, Footer, Sider, Content } = Layout;
const { TreeNode } = Tree;

class orgTree extends React.Component {
  state = {
    treeData: [
      //   { title: "Expand to load", key: "0" },
      //   { title: "Expand to load", key: "1" },
      //   { title: "Tree Node", key: "2", isLeaf: true }
    ]
  };

  componentDidMount() {
    //   this.onloadData()
    console.log("tree init");
    this.onLoadData();
  }

  fresh = () => {
    this.setState(
      {
        treeData: []
      },
      () => {
        this.onLoadData();
      }
    );
  };

  onLoadData = treeNode =>
    new Promise(resolve => {
      if (treeNode != null && treeNode.children != null) {
        resolve();
        return;
      }
      let pid = treeNode == null ? 0 : treeNode.id;
      getOrgTree(pid).then(data => {
        // 初始化
        if (treeNode == null) {
          this.setState({
            treeData: data.result
          })
        }

        // 非初始化
        if (treeNode != null) {
          treeNode.props.dataRef.children = data.result;
          this.setState({
            treeData: [...this.state.treeData]
          });
        }

        resolve();

      }).catch(err => {
        console.log(err)
      })

    });


  refresh = () => {
    this.setState({
      treeData: []
    }, () => {
      this.onLoadData()
    })
  }

  create = () => {
    this.openCreateModal();
  }

  onCreateRef = (ref) => {
    this.create_modal = ref
  }

  openCreateModal = () => {
    this.create_modal.showModal();
  }


  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode icon={({ expanded }) => <Icon type={expanded ? 'folder-open' : 'folder'} />} title={item.text} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode icon={({ expanded }) => <Icon type={expanded ? 'folder-open' : 'folder'} />} title={item.text} key={item.id} dataRef={item} />;
    });

  render() {
    return (
      <div>
        <CreateOrg
          onRef={this.onCreateRef}
        />
        <Layout>
          <Header style={{ position: "fixed", width: "100%", height: "auto", zIndex: 1, padding: 0 }}>
            <div className="tree-container">
              <h4 className="tree-title">组织架构</h4>
              <div className="header-button-area">
                <Button ghost onClick={this.refresh}>刷新</Button>
                <Button ghost onClick={this.create}>新增</Button>
              </div>
            </div>
          </Header>

          <Content className="tree-content">
            <Tree
              showIcon
              showLine
              loadData={this.onLoadData}>
              {this.renderTreeNodes(this.state.treeData)}
            </Tree>
          </Content>
        </Layout>


      </div>
    );
  }
}

export default orgTree;
