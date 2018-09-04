import React, { Component } from 'react';
import { Row, Col, Select, Icon } from 'antd'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DropConfigChart from './DropConfigChart';
import DropElement from './DropElement';
import update from 'immutability-helper';
import echartConfig from './echartConfig';
import './chartSettingBoard.css'

import ConfigDropBox from './ConfigDropBox'
import DragElement from './DragElement'

const Option = Select.Option;
const dragItem = 'item';
const colorSet = ['#9CC5B0', '#C9856B', '#6F9FA7', '#334553', '#B34038', '#7D9D85', '#C1883A']

const lineData = [
    { name: '年销量', type: 'string', value: 'year', id: 0, data: ['2013', '2014', '2015', '2016', '2017', '2018'], color: '#9CC5B0', chart: 'line' },
    { name: '华北', type: 'value', value: 'h', id: 1, data: [40, 80, 20, 120, 140, 50], color: '#C9856B', chart: 'line' },
    { name: '华东', type: 'value', value: 'd', id: 2, data: [140, 180, 120, 40, 50, 150], color: '#6F9FA7', chart: 'line' },
    { name: '华南', type: 'value', value: 'n', id: 3, data: [110, 143, 68, 90, 120, 130], color: '#334553', chart: 'line' }
];
const pieData = [
    { value: 335, name: '京东', type: 'value', id: 0, color: '#9CC5B0' },
    { value: 310, name: '菜鸟', type: 'value', id: 1, color: '#C9856B' },
    { value: 234, name: '总部', type: 'value', id: 2, color: '#6F9FA7' },
    { value: 135, name: '小电商', type: 'value', id: 3, color: '#334553' },
    { value: 1548, name: '大电商', type: 'value', id: 4, color: '#B34038' }
]
const chartType = [
    { value: 'line', name: '折线图' },
    { value: 'bar', name: '柱状图' },
    { value: 'pie', name: '饼图' }
]

export class ChartSettingBoard extends Component {

    constructor(props) {
        super(props);
        this.dragEleMove = this.dragEleMove.bind(this);
        this.beginDrag = this.beginDrag.bind(this)
        this.canDrop = this.canDrop.bind(this)
        this.endDrag = this.endDrag.bind(this)
        this.delItem = this.delItem.bind(this)
        this.changeItem = this.changeItem.bind(this)
        this.onSelectChartType = this.onSelectChartType.bind(this)
    }

    state = {
        activeId: '',
        activeDropId: '',
        itemList: lineData,
        chartType: 'line',
        dropConfig: echartConfig['line']
    }

    dragEleMove(id) {
        this.setState({ activeDropId: id })
    }

    beginDrag(id) {
        this.setState({ activeId: id })
    }

    canDrop(id) {
        const { itemList, activeId, dropConfig } = this.state;
        if (itemList[activeId].type != dropConfig[id].type) {
            return false;
        }
        return true
    }

    endDrag() {
        const { itemList, activeId, dropConfig, activeDropId } = this.state;
        const ilist = update(itemList, { $splice: [[activeId, 1]] })
        const dlist = update(dropConfig, { [activeDropId]: { items: { $push: [itemList[activeId]] } } })
        this.setState({ itemList: ilist, dropConfig: dlist })
    }

    delItem(item, pitem, pid) {
        const { itemList, dropConfig } = this.state;
        for (let i = 0; i < pitem.items.length; i++) {
            if (pitem.items[i].id === item.id) {
                pitem.items.splice(i, 1);
                break;
            }
        }
        const nlist = update(itemList, { $push: [item] })
        const dropList = update(dropConfig, { [pid]: { $set: pitem } })
        this.setState({ itemList: nlist, dropConfig: dropList })
    }

    onSelectChartType(type) {
        if (type === 'pie') {
            this.setState({ itemList: pieData, dropConfig: echartConfig[type], chartType: type })
        } else {
            const nlist = [...lineData];
            for (let i = 0; i < nlist.length; i++) {
                nlist[i].chart = type;
            }
            this.setState({ itemList: nlist, dropConfig: echartConfig[type], chartType: type })
        }
    }

    changeItem(value, key, id, pid) {
        const { dropConfig } = this.state;
        const nitem = { ...dropConfig[pid].items[id] }
        nitem[key] = value;
        const dropList = update(dropConfig, { [pid]: { items: { [id]: { $set: nitem } } } })
        this.setState({ dropConfig: dropList })
    }

    render() {
        const { itemList, dropConfig } = this.state
        const leftItems = itemList.map((item, idx) => {
            return (
                <div key={idx}>
                    <DragElement item={item} beginDrag={this.beginDrag} id={idx} endDrag={this.endDrag} />
                </div>
            )
        })

        const dropList = dropConfig.map((item, idx) => {
            const items = item.items.map((sitem, sid) => {
                return (
                    <div key={sid}>
                        <DropElement item={sitem} pitem={item} pid={idx} delItem={this.delItem} changeItem={(value, key) => this.changeItem(value, key, sid, idx)} />
                    </div>
                )
            })

            return (
                <Col sm={10} key={idx} className={dropConfig.length > 3 ? 'shortBox' : 'longBox'}>
                    <ConfigDropBox move={this.dragEleMove} item={item} id={idx} canDrop={this.canDrop}>
                        {items}
                    </ConfigDropBox>
                </Col>
            )
        })
        return (
            <div className='chartSettingBoard'>
                <h3>可视化</h3>
                <Row gutter={10}>
                    <Col sm={6}>
                        <div style={{ height: '50px' }}>
                            <Select
                                className='chartTypeSelect'
                                defaultValue={chartType[0].value}
                                onChange={(e) => this.onSelectChartType(e)}
                                style={{ width: '100%' }}>{
                                    chartType.map((item, idx) => <Option key={idx} value={item.value}>
                                        <div>
                                            {item.name}
                                            <p style={{ color: '#999', display: 'none' }}>描述...</p>
                                            <div className='charIconBox' style={{ display: 'none' }}>
                                                {item.value === 'line' ? <Icon className='charIcon' type="line-chart" /> : ''}
                                                {item.value === 'bar' ? <Icon className='charIcon' type="bar-chart" /> : ''}
                                                {item.value === 'pie' ? <Icon className='charIcon' type="pie-chart" /> : ''}
                                            </div>
                                        </div>
                                    </Option>)
                                }
                            </Select>
                        </div>
                        <div className='leftBox'>
                            {leftItems}
                        </div>
                    </Col>
                    <Col sm={18}>
                        <Row gutter={10}>
                            {dropList}
                        </Row>
                    </Col>
                </Row>
                <DropConfigChart dropConfig={this.state.dropConfig} chartType={this.state.chartType} />
            </div>
        )
    }
}


export default DragDropContext(HTML5Backend)(ChartSettingBoard);