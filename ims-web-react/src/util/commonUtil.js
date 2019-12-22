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


export function randomString(length) {
    if (length == null || length < 0) length = 16
    let source = 'abxdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    let source_length = source.length - 1
    for (let x = 0; length > x; x++) {
        result += source.charAt(randomGap(0, source_length))
    }
    return result
}

// [min, max]
export function randomGap(min, max) {
    return parseInt(Math.random()*(max-min+1)+min,10);
}