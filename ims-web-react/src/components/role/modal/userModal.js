import React from "react";
import { Modal, Table, Button } from "antd";
import { modalWidthDefault, errMessage } from '../../../config/config';
import { userList } from '../../../apis/api'


class UserModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    state = {
        visible: false,
        data: [],
        loading: false,
        pagination: {
            defaultCurrent: 1,
            current: 1,
            defaultPageSize: 10,
            pageSize: 10,
            pageSizeOptions: ["10", "25", "50", "100", "200"],
            showSizeChanger: true,
            total: 0,
            showTotal: (total, range) => `当前第${range[0]}-${range[1]}条 共计${total}条`,
        },
    };

    columns = [
        {
            title: "用户ID",
            dataIndex: "userId",
            key: "userId",
        }, {
            title: "用户账号",
            dataIndex: "userName",
            key: "userName",
        }, {
            title: "真实姓名",
            dataIndex: "trueName",
            key: "trueName",
        }, {
            title: "邮箱",
            dataIndex: "email",
            key: "email",
        }, {
            title: "状态",
            dataIndex: "active",
            key: "active",
        }, {
            title: "电话",
            dataIndex: "phone",
            key: "phone",
        }, {
            title: "域账号",
            dataIndex: "adAccount",
            key: "adAccount",
        }, {
            title: "员工号",
            dataIndex: "ehrAccount",
            key: "ehrAccount",
        }
    ]

    showModal = () => {
        this.setState({
            visible: true,
            loading: false
        }, () => {
            this.fetch();
        });
    };

    closeModal = () => {
        this.setState({
            visible: false,
            loading: false
        });
    };

    fetch = () => {
        this.setState({ loading: true });
        let roleId = this.props.roleId;
        let current = this.state.pagination.current
        let pageSize = this.state.pagination.pageSize
        let params = {
            roleId: roleId,
            start: current,
            length: pageSize
        }
        userList(params).then(data => {
            const pagination = { ...this.state.pagination };
            pagination.total = data.iTotalRecords;
            this.setState({
                loading: false,
                data: data.data,
                pagination,
            });
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    };

    onRef = (ref) => {
        this.ref = ref
    }

    handleCancel = () => {
        this.closeModal();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState(
          {
            pagination: pager
          },
          () => {
            this.fetch();
          }
        );
      };

    render() {
        const { visible, loading } = this.state;

        return (
            <Modal
                title="用户明细"
                width={modalWidthDefault}
                visible={visible}
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                centered={true}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        关闭
                    </Button>,
                ]}
            >
                <Table
                    columns={this.columns}
                    rowKey={record => record.permissionId}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    scroll={{ x: true }}
                    bordered
                />
            </Modal>
        );
    }
}

export default UserModal;
