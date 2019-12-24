import React, {Component} from 'react'
import { Input, Form, Row, Col, Button} from 'antd';
// import SourceModal from './modal/SourceModal';

class RoleSearch extends Component {
    handleReset = () => {
        this.props.form.resetFields();
        this.props.changeParam({}, false)
    };

    create = () => {
        this.source_modal_show();
    }

    onRef = (ref) => {
        this.source_modal = ref
    }

    source_modal_show(data) {
        this.source_modal.showModal()
    }

    rowData = {}

    render() {
        let search = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                let formParams = this.props.form.getFieldsValue();
                console.log("search area: " + JSON.stringify(formParams))
                this.props.changeParam(formParams, true)
            })
        };
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Form layout="horizontal" onSubmit={search}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="角色Id">
                                {getFieldDecorator('roleId', {
                                    initialValue: '',
                                })(<Input placeholder="输入角色Id" onPressEnter={search}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="角色名称">
                                {getFieldDecorator('roleName', {
                                    initialValue: '',
                                })(<Input placeholder="角色名称模糊查询" onPressEnter={search}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="角色CODE">
                                {getFieldDecorator('roleCode', {
                                    initialValue: '',
                                })(<Input placeholder="输入角色CODE" onPressEnter={search}/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="button" onClick={this.create}>
                                新增
                            </Button>
                            <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit" onClick={search}>
                                查询
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                重置
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

};

const RoleSearchForm = Form.create({ name: 'role_search' })(RoleSearch);

export default RoleSearchForm