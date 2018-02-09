import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export class DropConfigChart extends Component {

  getOption() {
    const { dropConfig, chartType } = this.props;
    let legendData = [];
    const xTarget = dropConfig.filter((item) => item.key === 'xAxis')[0].items[0];
    const xData = xTarget ? dropConfig.filter((item) => item.key === 'xAxis')[0].items[0].data : [];
    const yData = dropConfig.filter((item) => item.key === 'yAxis')[0].items.map((ist) => {
      legendData.push(ist.name || '')
      const vdata = { type: ist.chart, color: ist.color, data: ist.data, name: ist.name };
      return vdata
    }
    )

    const option = {
      xAxis: {
        type: 'category',
        data: xData
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        x: 'right',
        data: legendData
      },
      series: yData
    };
    return option
  }

  getPieOption() {
    const dropConfig = this.props.dropConfig;
    let legendData = [];
    const target = dropConfig.filter((item) => item.key === 'series')[0];
    const seriesData = target ? target.items.map((ist) => {
      legendData.push(ist.name || '')
      const vdata = { value: ist.value, name: ist.name };
      return vdata
    }
    ) : [];
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        x: 'right',
        data: legendData
      },
      series: [
        {
          type: 'pie',
          data: seriesData
        }
      ]
    };

    return option;
  }

  render() {
    const { chartType } = this.props
    return (
      <div>
        {chartType === 'line' || chartType === 'bar' ? < ReactEcharts option={this.getOption()} notMerge={true} lazyUpdate={true} /> : ''}
        {chartType === 'pie' ? <ReactEcharts option={this.getPieOption()} notMerge={true} lazyUpdate={true} /> : ''}
      </div>
    )
  }
}

export default DropConfigChart
