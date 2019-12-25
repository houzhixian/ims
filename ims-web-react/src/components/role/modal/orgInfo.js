import React from "react";
import { Modal, Table, Button } from "antd";
import { modalWidthDefault, errMessage } from '../../../config/config';
import { orgInfo } from '../../../apis/api'


class PermissionModal extends React.Component {
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
            title: "组织ID",
            dataIndex: "pid",
            key: "pid",
            // width: 120,
            // ellipsis: true
        }, {
            title: "组织名称",
            dataIndex: "name",
            key: "name",
        }, {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
        }, {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
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
        orgInfo(params).then(data => {
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
                title="组织明细"
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

export default PermissionModal;
