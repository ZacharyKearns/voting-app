import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';

class PieChart extends Component {
  render() {
    const { poll } = this.props;
    const type = 'Pie';
    const arr = poll.options.filter(option => option.votes > 0);
    const labels = arr.map(option => option.option);
    const series = arr.map(option => option.votes);
    const data = {
        labels,
        series
    };
    const options = {
        width: 300,
        height: 300
    };

    return (
      <div className="text-center">
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    )
  }
}

export default PieChart;