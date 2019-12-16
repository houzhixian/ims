import React, {Component} from 'react'
import {Modal} from 'antd';

export class SourceModal extends Component {

    componentDidMount() {
        this.props.onRef(this)
    }

    state = { visible: false};
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };
  
    render() {
      return (
        <div>
          <Modal
            title="权限信息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            
          </Modal>
        </div>
      );
    }
  }
  