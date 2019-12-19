import React, {Component} from 'react'
import { Input, Form, Row, Col, Button} from 'antd';
import SourceModal from './modal/SourceModal';

class MenuSearch extends Component {
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
                <SourceModal onRef={this.onRef} data={this.rowData} type="create"/>
                <Form layout="horizontal" onSubmit={search}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="菜单Id">
                                {getFieldDecorator('menuId', {
                                    initialValue: '',
                                })(<Input placeholder="输入菜单Id" onPressEnter={search}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="菜单名称">
                                {getFieldDecorator('menuName', {
                                    initialValue: '',
                                })(<Input placeholder="菜单名称模糊查询" onPressEnter={search}/>)}
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

const MenuSearchForm = Form.create({ name: 'menu_search' })(MenuSearch);

export default MenuSearchForm