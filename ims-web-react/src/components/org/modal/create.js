import React from 'react';
import { Modal, Form, Row, Col, Button, Input, message } from 'antd';
import { modalWidthDefault } from '../../../config/config'
import { success_create_message } from '../../../config/const'
import ConfirmCheck from '../../common/confirmCheckModal';
import { orgSelectList, createOrg } from '../../../apis/api'
import { getSelect } from '../../../util/commonUtil'



class CreateOrg extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.onRef(this)
        this.getOrgList()
    }

    getOrgList = () => {
        orgSelectList().then(data => {
            this.setState({
                btnDisable: false,
                orgListForSelect: data.result,
            })
        }).catch(err => {
            this.setState({
                btnDisable: true,
                orgListForSelect: [],
            })
            message.error("获取上级组织失败")
        })
    }

    state = {
        visible: false,
        loading: false,
        btnDisable: false,
        orgListForSelect: []
    }

    showModal = () => {
        this.setState({
            visible: true,
            loading: false
        })
    }


    handleCancel = () => {
        this.setState({
            visible: false,
            loading: false
        })
    }

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (err == null || err.length < 1) {
                this.openCheckRef();
            }
        })
    }

    trueOk = () => {
        this.setState({
            loading: true,
        })
        let formParams = this.props.form.getFieldsValue();
        createOrg(formParams).then(data => {
            message.success(success_create_message)
            this.handleCancel();
        }).catch(err => {
            this.setState({loading:false})
        })
    }

    onCheckRef = (ref) => {
        this.checkRef = ref
    }

    openCheckRef = () => {
        this.checkRef.showModal()
    }


    render() {
        const { visible, loading } = this.state;
        // const { getFieldDecorator } = this.props.form;
        const { form: { getFieldDecorator } } = this.props;

        const orgList = getSelect(this.state.orgListForSelect)

        return (
            <div>
                <ConfirmCheck
                    onRef={this.onCheckRef}
                    trueOk={this.trueOk}
                />
                <Modal
                    title="新增组织节点"
                    width={modalWidthDefault}
                    visible={visible}
                    // onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                    centered={true}
                    maskClosable={false}
                    footer={[
                        <Button key="submit" type="primary" disabled={this.state.btnDisable} loading={loading} onClick={this.handleOk}>
                            保存
                        </Button>,
                        <Button key="back" onClick={this.handleCancel}>
                            关闭
                        </Button>,
                    ]}
                >
                    <Form layout="horizontal">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="组织节点名称">
                                    {getFieldDecorator('name', {
                                        initialValue: '',
                                        rules: [{
                                            required: true,
                                            message: "必填"
                                        }]
                                    })(<Input placeholder="" onPressEnter={this.handleOk} />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="上级组织">
                                    {getFieldDecorator('pid', {
                                        initialValue: '',
                                        rules: [{
                                            required: true,
                                            message: "必填"
                                        }]
                                    })(orgList)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="备注">
                                    {getFieldDecorator('remark', {
                                        initialValue: '',
                                    })(<Input placeholder="菜单名称模糊查询" onPressEnter={this.handleOk} />)}
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>
        )
    }
}

const CreateOrgForm = Form.create({ name: 'org_form' })(CreateOrg);

export default CreateOrgForm

// export default connect(mapStateToProps)(Form.create()(CreateOrg));