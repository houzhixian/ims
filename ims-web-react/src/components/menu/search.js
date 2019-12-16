import React, {Component} from 'react'
import { Input, Form, Row, Col, Button} from 'antd';

class MenuSearch extends Component {
    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        let search = (e) => {
            e.preventDefault();
            console.log("menu search")
            this.props.form.validateFields((err, values) => {
                let formParams = this.props.form.getFieldsValue();
                console.log("search area: " + JSON.stringify(formParams))
                this.props.changeParam(formParams)
            })
        };
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
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
                            <Button type="primary" htmlType="submit" onClick={search}>
                                Search
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Clear
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