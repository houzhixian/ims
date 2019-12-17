import React from 'react';
import {Select} from "antd"

const { Option } = Select;

export function getSelect(values) {
    if (values === null || values.size === 0) {
        return (
            <Select>
                <Option>没有数据</Option>
            </Select>
        )
    }

    return (
        <Select>
        {
          values.map((item, index) => {
            return (<Option key={item.value} value={item.value}>{item.name}</Option>)
          })
        }
        </Select>
    )
}

export function getSelectSearchable(values) {
    if (values === null || values.size === 0) {
        return (
            <Select>
                <Option>没有数据</Option>
            </Select>
        )
    }

    return (
        <Select 
            filterOption={ (input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
        {
          values.map((item, index) => {
            return (<Option key={item.value} value={item.value}>{item.name}</Option>)
          })
        }
        </Select>
    )
}
