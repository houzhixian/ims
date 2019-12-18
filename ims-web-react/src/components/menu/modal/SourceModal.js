import React, {Component} from 'react'
import {Modal, Form, Row, Col, Input, InputNumber, Button, message} from 'antd';
import {menu_type, father_menu, sys_type} from '../../../config/const';
import {modalWidthDefault, errMessage} from '../../../config/config';
import {getSelect, getSelectSearchable} from '../../../util/commonUtil'
import ConfirmCheck from '../../common/confirmCheckModal'
import {menu_doAdd, menu_doUpdate} from '../../../apis/api'


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

    closeModal = () => {
      this.setState({
        visible: false,
        loading: false
      });
    }
  
    handleOk = e => {
      this.props.form.validateFields((err, values) => {
        // let formParams = this.props.form.getFieldsValue();
        // console.log(formParams)
        // console.log(err)
        // console.log(values)
        if (err == null || err.length < 1) {
          this.confirm_check_modal();
        }
    })
      
    };

    trueOk = () => {
      this.setState({ loading: true });

      console.log("true ok")
      console.log(this.props.type)
    
      
      let formParams = this.props.form.getFieldsValue();
      let req_body = {
         "menuInfo.menuName" : formParams.menuName,
         "menuInfo.menuType" : formParams.menuType,
         "menuInfo.url" : formParams.url,
         "menuInfo.menuPid" : formParams.menuPid,
         "menuInfo.menuStyle" : formParams.menuStyle,
         "menuInfo.remark" : formParams.remark,
         "menuInfo.sort" : formParams.sort,
         "menuInfo.menuId" : this.props.data.menuId,
         "menuInfo.permissionId" : this.props.data.permissionId,
      }

      let method = null;
      let type = this.props.type
      if (type === "create") {
        method = menu_doAdd(req_body, this.callback_success, this.callback_error)
      }

      if (type === "modify") {
        method = menu_doUpdate(req_body, this.callback_success, this.callback_error);
      }

    }

    callback_success = (data) => {
      if (data.code === 0) {
        this.closeModal();
        message.info("保存成功")
        return;
      }

      let errorMessage = data.message == null ? errMessage.sys_common_err : data.message
      message.error(errorMessage)
      this.setState({ loading: false });
    }

    callback_error = (err) => {
      this.setState({ loading: false });
    }

    handleCancel = e => {
      this.closeModal();
    };

    

    onRef = (ref) => {
      this.ref = ref
    }

    confirm_check_modal = () => {
      this.ref.showModal()
    }
   

    render() {

      const { visible, loading } = this.state;
    
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
            <Form layout="horizontal">
              <Row gutter={24}>
                {/* 第一行 */}
                <Col span={12}>
                  <Form.Item label="菜单名称">
                    {getFieldDecorator('menuName', {
                      initialValue: this.props.data.menuName || '',
                      rules: [{
                        required: true,
                        message: "必填"
                      }]
                    })(<Input placeholder="输入菜单名称"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="菜单类型">
                    {getFieldDecorator('menuType', {
                      initialValue: this.props.data.menuType || '',
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
                  <Form.Item label="备注">
                    {getFieldDecorator('remark', {
                      initialValue: this.props.data.remark || '',
                    })(<Input placeholder="输入备注"/>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="排序">
                    {getFieldDecorator('sort', {
                      initialValue: this.props.data.sort || '',
                      rules: [{
                        type: 'number',
                        message: "请填写数字",
                        required: false
                      }]
                    })(<InputNumber style={{ width: '100%' }} size="default" placeholder="输入排序"/>)}
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