import React, { Component } from 'react'
import './dragElement.css'
import { Button } from 'antd'
import { DragSource } from 'react-dnd';

const ItemTypes = 'item';

const ItemSource = {
    beginDrag(props, monitor, component) {
        props.beginDrag(props.id)
        return {};
    },

    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }
        props.endDrag()
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export class DragElement extends Component {

    render() {
        const { connectDragSource, isDragging, item } = this.props;
        return connectDragSource(
            <div className='dragElement'
                style={{
                    opacity: isDragging ? 0.3 : 1
                }}
            >
                <span>{item.name}</span>
                <span className='type'>{item.type}</span>
            </div>
        )
    }
}

const DragItem = DragSource(ItemTypes, ItemSource, collect)(DragElement);

export default DragItem
