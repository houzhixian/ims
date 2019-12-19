import React, {Component} from 'react'
import {Table, Button} from 'antd';
import {getMenuList, menu_doDelete} from '../../apis/api'
import {pageDefault} from '../../config/config'
import SourceModal from './modal/SourceModal'
import ConfirmCheck from '../common/confirmCheckModal'
import {delete_confirm_default} from '../../config/const'

class MenuTable extends Component {

    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
        this.props.onRef(this)
        this.fetch();
        this.refresh = this.refresh.bind(this)
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
        loading: false,
        search_object: {},
        remove_object: {},
        rowData: {},
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        }, () => {
            this.fetch();
        });
    };

    fetch = () => {
        this.setState({ loading: true });
        let search_object = this.state.search_object;
        let current = this.state.pagination.current
        let pageSize = this.state.pagination.pageSize
        let params = {
            ...search_object, 
            start: current,
            length: pageSize
        }
        console.log(this.state)
        console.log('params:', params);
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

    param_change_search = (search_params, search_flag) => {
        this.back_to_page_one();
        this.setState({
            search_object: search_params
        }, () => {
            if (search_flag) {
                this.fetch()
            }
        })
    }

    back_to_page_one = () => {
        const pagination = { ...this.state.pagination };
        let default_pageNo = pageDefault.pageNo == null ? 1 : pageDefault.pageNo
        let default_pageSize = pageDefault.pageSize == null ? 10 : pageDefault.pageSize
        pagination.current = default_pageNo
        pagination.pageSize = default_pageSize
        this.setState({
            pagination
        })
    }

    refresh = () => {
        this.back_to_page_one()
        this.fetch()
    }


    edit(record) {
        this.setState({
            rowData: record,
        }, () => {this.source_modal_show()})
    }

    remove(record) {
        this.setState = ({
            remove_object : {
                menuId : record.menuId
            }
        }, () => {this.checkRef.showModal(record)})
        
    }

    onRef = (ref) => {
        this.source_modal = ref
    }

    source_modal_show() {
        this.source_modal.showModal()
    }

    onCheckRef = (ref) => {
        this.checkRef = ref
    }

    trueOk = (record) => {
        console.log("table delete");
        let menuIdToDelete = record.menuId
        let req_param = {
            menuId: menuIdToDelete
        }
        let _this = this
        menu_doDelete(req_param).then(data => {
            this.delete_row_in_table(menuIdToDelete, _this)
        })
    }

    delete_row_in_table(menuId, _this) {
        const { data } = this.state;
        const newData = data;
        const index = newData.findIndex((record) => menuId === record.menuId);
        newData.splice(index, 1);
        _this.setState({ data: newData });
    }

    rowData = {}

    render() {
        

        return (
            <div className="">
                <ConfirmCheck 
                    onRef={this.onCheckRef} 
                    trueOk={this.trueOk} 
                    check_confirm={delete_confirm_default} 
                />
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
                <SourceModal 
                    onRef={this.onRef} 
                    data={this.state.rowData} 
                    refresh={this.refresh}
                    type="modify"
                />
            </div>
        )
    }
}

export default MenuTable;


