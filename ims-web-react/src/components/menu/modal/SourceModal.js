import React, {Component} from 'react'
import {Modal, Form, Row, Col, Input, Button, message} from 'antd';
import {menu_type, father_menu, sys_type} from '../../../config/const';
import {modalWidthDefault} from '../../../config/config';
import {getSelect, getSelectSearchable} from '../../../util/commonUtil'
import ConfirmCheck from '../../common/confirmCheckModal'


class SourceModal extends Component {

    componentDidMount() {
        this.props.onRef(this)
        this.trueOk = this.trueOk.bind(this)
    }

    state = { 
      visible: false,
      loading: false
    };
  
    showModal = () => {
      this.setState({
        visible: true,
        loading: false
      });
    };
  
    handleOk = e => {
      this.confirm_check_modal();
    };

    trueOk = () => {
      console.log("true ok")
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
        message.info("保存成功")
      }, 3000);
    }
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
        loading: false
      });
    };

    onRef = (ref) => {
      this.ref = ref
    }

    confirm_check_modal = () => {
      this.ref.showModal()
    }
    
    render() {

      const { visible, loading } = this.state;

      let save = () => {
          return;
      }
    
      const {getFieldDecorator} = this.props.form;
      const menuType = getSelect(menu_type)
      const fatherType = getSelectSearchable(father_menu)
      const sysType = getSelect(sys_type)

      return (
        <div>
          <ConfirmCheck onRef={this.onRef} trueOk={this.trueOk}/>

          <Modal
            title="菜单信息"
            width={modalWidthDefault}
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            destroyOnClose={true}
            centered={true}
            footer={[
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                保存
              </Button>,
              <Button key="back" onClick={this.handleCancel}>
                关闭
              </Button>,
            ]}
          >
            <Form layout="horizontal" onSubmit={save}>
              <Row gutter={24}>
                {/* 第一行 */}
                <Col span={12}>
                  <Form.Item label="菜单名称">
                    {getFieldDecorator('menuId', {
                      initialValue: this.props.data.menuId || '',
                    })(<Input placeholder="输入菜单Id"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="菜单类型">
                    {getFieldDecorator('menuType', {
                      initialValue: this.props.data.menuId || '',
                    })(menuType)}
                  </Form.Item>
                </Col>

                {/* 第二行 */}
                <Col span={12}>
                  <Form.Item label="url">
                    {getFieldDecorator('url', {
                      initialValue: this.props.data.url || '',
                    })(<Input placeholder="输入url"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="父菜单">
                    {getFieldDecorator('menuPid', {
                      initialValue: this.props.data.menuPid || '',
                    })(fatherType)}
                  </Form.Item>
                </Col>
                
                {/* 第三行 */}
                <Col span={12}>
                  <Form.Item label="菜单样式">
                    {getFieldDecorator('menuStyle', {
                      initialValue: this.props.data.menuStyle || '',
                    })(<Input placeholder="输入菜单样式"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="系统">
                    {getFieldDecorator('systemId', {
                      initialValue: this.props.data.systemId || '',
                    })(sysType)}
                  </Form.Item>
                </Col>

                {/* 第四行 */}
                <Col span={12}>
                  <Form.Item label="remark">
                    {getFieldDecorator('备注', {
                      initialValue: this.props.data.remark || '',
                    })(<Input placeholder="输入备注"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="sort">
                    {getFieldDecorator('排序', {
                      initialValue: this.props.data.sort || '',
                    })(<Input placeholder="输入排序"/>)}
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