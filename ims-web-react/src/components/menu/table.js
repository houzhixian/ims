import React, {Component} from 'react'
import {Table, Button} from 'antd';
import {getMenuList} from '../../apis/api'

const columns = [
    {
        title: '菜单id',
        dataIndex: 'menuId',
        key: 'menuId',
        // render: text => <span>{text}</span>,
    }, {
        title: '权限id',
        dataIndex: 'permissionId',
        key: 'permissionId',
    }, {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName',
    }, {
        title: 'url',
        dataIndex: 'url',
        key: 'url',
    }, {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
    }, {
        title: '父菜单id',
        dataIndex: 'menuPid',
        key: 'menuPid',
    }, {
        title: '父菜单名称',
        dataIndex: 'menuPName',
        key: 'menuPName',
    }, {
        title: '菜单类型',
        dataIndex: 'menuType',
        key: 'menuType',
    }, {
        title: '菜单样式',
        dataIndex: 'menuStyle',
        key: 'menuStyle',
    }, {
        title: '系统',
        dataIndex: 'systemId',
        key: 'systemId',
    }, {
        title: '父菜单名称',
        dataIndex: 'menuPName',
        key: 'menuPName',
    }, {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
    }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
    }, {
        title: '操作',
        dataIndex: 'menuPName',
        key: 'menuPName',
        render: (text, record) => (
            <span>
                <button onClick={this.edit}>编辑</button>
                <button onClick={this.remove}>删除</button>
            </span>
        )
    },
];


class MenuTable extends Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    };

    componentDidMount() {
        this.fetch();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        getMenuList(params).then(data => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    };


    edit() {
        console.log("edit")
    }

    remove() {
        console.log("remove")
    }

    render() {
        return (
            <div>
                <Table
                    columns={columns}
                    rowKey={record => record.uuid}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default MenuTable;


