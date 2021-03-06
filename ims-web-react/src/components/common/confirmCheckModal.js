import React from 'react'
import {Button, Modal} from 'antd'
import {check_confirm_default} from '../../config/const'


class ConfirmCheck extends React.Component {

    componentDidMount() {
        this.props.onRef(this)
    }

    state = { 
      visible: false,
      temp: {}
    };
  
    showModal = (temp) => {
      // console.log(temp)
      this.setState({
        visible: true,
        temp: temp
      }, () => {
        // console.log(this.state)
      });
    };

    handleOk = () => {
        const { temp } = this.state
        this.setState({
            visible: false
        }, () => {
          // 回调父层原来的确定
          this.props.trueOk(temp);
        })
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
          temp: {}
        });
    };

    render() {

        const { visible } = this.state;

        let body = this.props.check_confirm == null ? check_confirm_default : this.props.check_confirm


        return (
            <div>
                <Modal
                    title="提示"
                    visible={visible}
                    footer={[
                        <Button key="ok" type="primary" onClick={this.handleOk}>
                          确定
                        </Button>,
                        <Button key="cancel" onClick={this.handleCancel}>
                          取消
                        </Button>,
                      ]}
                >
                    <div>
                        {body}
                    </div>
                </Modal>

            </div>
        )
    }
}


export default ConfirmCheck