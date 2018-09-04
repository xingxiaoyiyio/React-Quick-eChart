import React, { Component } from 'react'
import { Icon, Row, Col, Select, Popover } from 'antd'
import { SketchPicker } from 'react-color';
import './dropElement.css'

const Option = Select.Option;

const XItem = ({ item, delItem, pitem, pid }) => {
    return (
        <div className='xItem'>
            <span>{item.name}</span>
            <Icon type="close" className='icon' onClick={() => delItem(item, pitem, pid)} />
            <span className='type'>{item.type}</span>
        </div>
    )
}

const YItem = ({ item, delItem, pitem, pid, changeItem }) => {
    const content = (<SketchPicker color={item.color} onChange={(color) => changeItem(color.hex, 'color')} />)
    return (
        <div className='yItem' style={{ borderColor: item.color }}>
            <Row>
                <Col span={7}> {item.name} </Col>
                <Col span={8} style={{ marginTop: '-1px' }}>
                    <Select
                        className='typeSelect'
                        style={{ borderLeft: `1px solid ${item.color}`, borderRight: `1px solid ${item.color}` }}
                        onChange={(e) => changeItem(e, 'chart')}
                        defaultValue={item.chart}
                    >
                        {pitem.chartSelectOpt.map((sitem, idx) => {
                            return <Option key={idx} value={sitem.value}>{sitem.name}</Option>
                        })}
                    </Select>
                </Col>
                <Col span={9}>
                    <Popover placement="bottom" content={content} trigger="click">
                        <span style={{ position: 'relative', paddingLeft: '20px' }}>  <span className='colorLabel' style={{ background: item.color }}></span>  颜色</span>
                    </Popover>
                    <Icon type="close" className='icon' onClick={() => delItem(item, pitem, pid)} />
                </Col>
            </Row>
        </div>
    )
}

export class DropElement extends Component {

    render() {
        const dropItem = this.props.pitem.dropItem;
        return (
            <div className='dropElement'>
                {dropItem === 1 ? <XItem {...this.props} /> : null}
                {dropItem === 2 ? <YItem {...this.props} /> : null}
            </div>
        )
    }
}

export default DropElement
