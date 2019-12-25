import React, { Component } from "react";
import { Table, Button } from "antd";
import { getRoleList, deleteRole } from "../../apis/api";
import { pageDefault } from "../../config/config";
// import SourceModal from './modal/SourceModal'
import ConfirmCheck from "../common/confirmCheckModal";
import { delete_confirm_default } from "../../config/const";
import PermissionModal from './modal/permissionModal'
import UserModal from './modal/userModal'
import OrgInfo from './modal/orgInfo'

class RoleTable extends Component {
    constructor(props) {
        super(props);
        this.trueOk = this.trueOk.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
        this.fetch();
        this.refresh = this.refresh.bind(this);
    }

    columns = [
        {
            title: "角色id",
            //   fixed: "left",
            dataIndex: "roleId",
            key: "roleId",
            width: 120
            // render: text => <span>{text}</span>,
        },
        {
            title: "角色名称",
            dataIndex: "roleName",
            key: "menuName",
            //   width: 120
        },
        {
            title: "角色code",
            dataIndex: "roleCode",
            key: "roleCode",
            //   width: 120,
            ellipsis: true
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            //   width: 120
        },
        {
            title: "权限",
            // dataIndex: 'roleId',
            // key: 'permissionIds',
            //   width: 120,
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => this.open_permission(record)}>
                        查看明细
          </Button>
                </span>
            )
        },
        {
            title: "用户",
            // dataIndex: 'roleId',
            // key: 'user',
            //   width: 120,
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => this.open_user(record)}>
                        查看明细
          </Button>
                </span>
            )
        },
        {
            title: "组织",
            // dataIndex: 'roleId',
            // key: 'org',
            //   width: 120,
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => this.open_org(record)}>
                        查看明细
          </Button>
                </span>
            )
        },
        {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
            //   width: 200
        },
        {
            title: "操作",
            // dataIndex: 'menuPName',
            // key: 'menuPName',
            //   width: 200,
            //   fixed: "right",
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => this.edit(record)}>
                        编辑
          </Button>
                    <Button type="link" onClick={() => this.delete(record)}>
                        删除
          </Button>
                </span>
            )
        }
    ];

    state = {
        data: [],
        pagination: {
            defaultCurrent: 1,
            current: 1,
            defaultPageSize: 10,
            pageSize: 10,
            pageSizeOptions: ["10", "25", "50", "100", "200"],
            showSizeChanger: true,
            total: 0,
            showTotal: (total, range) =>
                `当前第${range[0]}-${range[1]}条 共计${total}条`
        },
        loading: false,
        search_object: {},
        remove_object: {},
        rowData: {},
        roleId: null,
        orgId: null
    };

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

    fetch = () => {
        this.setState({ loading: true });
        let search_object = this.state.search_object;
        let current = this.state.pagination.current;
        let pageSize = this.state.pagination.pageSize;
        let params = {
            ...search_object,
            start: current,
            length: pageSize
        };
        console.log(this.state);
        console.log("params:", params);
        getRoleList(params).then(data => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            pagination.total = data.iTotalRecords;
            // pagination.total = 200;
            this.setState({
                loading: false,
                data: data.data,
                pagination
            });
        });
    };

    param_change_search = (search_params, search_flag) => {
        this.back_to_page_one();
        this.setState(
            {
                search_object: search_params
            },
            () => {
                if (search_flag) {
                    this.fetch();
                }
            }
        );
    };

    back_to_page_one = next => {
        const pagination = { ...this.state.pagination };
        let default_pageNo = pageDefault.pageNo == null ? 1 : pageDefault.pageNo;
        let default_pageSize =
            pageDefault.pageSize == null ? 10 : pageDefault.pageSize;
        pagination.current = default_pageNo;
        pagination.pageSize = default_pageSize;
        this.setState(
            {
                pagination
            },
            () => {
                if (next != null) {
                    next();
                }
            }
        );
    };

    refresh = () => {
        this.back_to_page_one(this.fetch);
    };



    

    open_permission = record => {
        this.setState({
            roleId: record.roleId
        }, () => {
            this.openPermissionModal();
      })
    };

    open_user = record => { 
        this.setState({
            roleId: record.roleId
        }, () => {
            this.openUserModal();
      })
    };

    open_org = record => { 
        this.setState({
            orgId: record.orgId
        }, () => {
            this.openOrgModal();
      })
    };

    edit(record) {
        console.log("edit");
        this.setState({
            rowData: record
        });
        console.log("source open");
        this.source_modal.showModal();
    }

    delete(record) {
        console.log("remove");
        this.setState({
            remove_object: record
        });
        console.log("remove confirm open ");
        this.checkRef.showModal(record);
    }

    onPermissionRef = ref => {
        this.permission_modal = ref;
    };

    onUserRef = ref => {
        this.user_modal = ref;
    }

    onOrgRef = ref => {
        this.org_modal = ref;
    }

    openPermissionModal = () => {
        this.permission_modal.showModal();
    }

    openUserModal = () => {
        this.user_modal.showModal();
    }

    openOrgModal = () => {
        this.org_modal.showModal();
    }

    onCheckRef = ref => {
        this.checkRef = ref;
    };

    trueOk = record => {
        console.log("table delete");
        let menuIdToDelete = record.menuId;
        let req_param = {
            menuId: menuIdToDelete
        };
        deleteRole(req_param).then(data => {
            this.fetch()
        })
    };

    render() {
        return (
            <div className="">
                <ConfirmCheck
                    onRef={this.onCheckRef.bind(this)}
                    trueOk={this.trueOk.bind(this)}
                    check_confirm={delete_confirm_default}
                />
                <PermissionModal 
                    onRef={this.onPermissionRef} 
                    roleId={this.state.roleId} 
                />
                <UserModal 
                    onRef={this.onUserRef} 
                    roleId={this.state.roleId} 
                />
                <OrgInfo 
                    onRef={this.onOrgRef} 
                    roleId={this.state.orgId} 
                />
                <Table
                    columns={this.columns}
                    rowKey={record => record.roleId}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    scroll={{ x: true }}
                    bordered
                />
            </div>
        );
    }
}

export default RoleTable;
