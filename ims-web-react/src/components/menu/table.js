import React, {Component} from 'react'
import {Table, Button} from 'antd';
import {getMenuList} from '../../apis/api'
import {pageDefault} from '../../config/config'
import SourceModal from './modal/SourceModal'

class MenuTable extends Component {

    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
        this.props.onRef(this)
        this.fetch();
    }


    columns = [
        {
            title: '菜单id',
            fixed: 'left',
            dataIndex: 'menuId',
            key: 'menuId',
            width: 120,
            // render: text => <span>{text}</span>,
        }, {
            title: '权限id',
            dataIndex: 'permissionId',
            key: 'permissionId',
            width: 120,
        }, {
            title: '菜单名称',
            dataIndex: 'menuName',
            key: 'menuName',
            width: 120,
        }, {
            title: 'url',
            dataIndex: 'url',
            key: 'url',
            width: 200,
            ellipsis: true,
        }, {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            width: 120,
        }, {
            title: '父菜单id',
            dataIndex: 'menuPid',
            key: 'menuPid',
            width: 120,
        }, {
            title: '父菜单名称',
            dataIndex: 'menuPName',
            key: 'menuPName',
            width: 120,
        }, {
            title: '菜单类型',
            dataIndex: 'menuType',
            key: 'menuType',
            width: 120,
            ellipsis: true,
        }, {
            title: '菜单样式',
            dataIndex: 'menuStyle',
            key: 'menuStyle',
            width: 120,
        }, {
            title: '系统',
            dataIndex: 'systemId',
            key: 'systemId',
            width: 120,
        }, {
            title: '排序',
            dataIndex: 'sort',
            key: 'sort',
            width: 120,
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: 200,
        }, {
            title: '操作',
            // dataIndex: 'menuPName',
            // key: 'menuPName',
            width: 200,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => this.edit(record)}>编辑</Button>
                    <Button type="link" onClick={() => this.remove(record)}>删除</Button>
                </span>
            )
        },
    ];

    state = {
        data: [],
        pagination: {},
        loading: false,
    };

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
            pagination.total = data.iTotalRecords;
            // pagination.total = 200;
            this.setState({
                loading: false,
                data: data.data,
                pagination,
            });
        });
    };

    param_change_search = (search_params) => {
        this.back_to_page_one();
        this.fetch(search_params)
    }

    back_to_page_one = () => {
        const pagination = { ...this.state.pagination };
        let default_pageNo = pageDefault.pageNo == null ? 1 : pageDefault.pageNo
        let default_pageSize = pageDefault.pageSize == null ? 10 : pageDefault.pageSize
        pagination.current = default_pageNo
        pagination.pageSize = default_pageSize
    }


    edit(record) {
        console.log("edit" + record)
        this.source_modal_show(record)
    }

    remove(record) {
        console.log("remove" + record)
    }

    onRef = (ref) => {
        this.source_modal = ref
    }

    source_modal_show(data) {
        this.source_modal.showModal()
    }

    rowData = {}

    render() {
        return (
            <div className="">
                <Table
                    columns={this.columns}
                    rowKey={record => record.menuId}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                    scroll={{ x: true }}
                    bordered
                />
                <SourceModal onRef = {this.onRef} data={this.rowData} />
            </div>
        )
    }
}

export default MenuTable;


