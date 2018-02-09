const echartConfig = {
    line: [{
            title: '值轴/X',
            key: 'xAxis',
            dropItem: 1,
            type: 'string',
            length: 1,
            dec: 'x轴，数据类型为字符串！',
            items: []
        },
        {
            title: '值轴/Y',
            key: 'yAxis',
            dropItem: 2,
            type: 'value',
            length: 10,
            dec: 'y轴，数据类型为数字！',
            chartSelectOpt: [{
                name: '条形图',
                value: 'line'
            }, {
                name: '柱状图',
                value: 'bar'
            }],
            items: []
        }
    ],
    bar: [{
            title: '值轴/X',
            key: 'xAxis',
            dropItem: 1,
            dec: 'x轴，数据类型为字符串！',
            type: 'string',
            length: 1,
            items: []
        },
        {
            title: '值轴/Y',
            key: 'yAxis',
            dropItem: 2,
            type: 'value',
            dec: 'y轴，数据类型为字符串！',
            chartSelectOpt: [{
                name: '条形图',
                value: 'line'
            }, {
                name: '柱状图',
                value: 'bar'
            }],
            length: 10,
            items: []
        }
    ],
    pie: [{
        title: '数据项',
        key: 'series',
        dropItem: 1,
        dec: '数据类型为数字！',
        type: 'value',
        length: 10,
        items: []
    }]
}

export default echartConfig;