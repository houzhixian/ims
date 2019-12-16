import React, {Component} from 'react'
import {Modal, Form, Row, Col, Input} from 'antd';
import {menu_type, father_menu, sys_type} from '../../../config/const';
import {getSelect, getSelectSearchable} from '../../../util/commonUtil'


class SourceModal extends Component {

    componentDidMount() {
        this.props.onRef(this)
    }

    state = { visible: false };
  
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

      let save = () => {
          return;
      }
    
      const {getFieldDecorator} = this.props.form;
      const menuType = getSelect(menu_type)
      const fatherType = getSelectSearchable(father_menu)
      const sysType = getSelect(sys_type)

      return (
        <div>
          <Modal
            title="菜单信息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form layout="horizontal" onSubmit={save}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="菜单名称">
                    {getFieldDecorator('menuId', {
                      initialValue: this.props.data.menuId || '',
                    })(<Input placeholder="输入菜单Id"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="菜单名称">
                    {getFieldDecorator('menuType', {
                      initialValue: this.props.data.menuId || '',
                    })(<Input placeholder="输入菜单Id"/>)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
      );
    }
  }


const SourceModalForm = Form.create({ name: 'SourceModal' })(SourceModal);

export default SourceModalForm