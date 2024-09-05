import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';

type Props = {}

const HighChart = (props: Props) => {
    const options  = {
        title: {
          text: 'Gift Reports',
          style: {
            color: '#fff',
            textAlign: "left"
        }
        },
        chart:{
            type:'column',
            backgroundColor: 'transparent'
        },
        xAxis:{
            categories:['Week 1','Week 2','Week 3','Week 4','Week 5'],
            labels: {
                style: {
                    color: '#fff'
                }
            },
            gridLineColor: '#555' // Light grey grid lines
        },
        yAxis:{
            title:{
                text:''
            },
            labels: {
                style: {
                    color: '#fff'
                }
            },
            gridLineColor: '#555' // Light grey grid lines
        },
        plotOptions:{
            column:{
                borderRadius: 100
            }
        },
        series: [
            {
                name:'Views',
                data: [3,4,8,20]
            }
        ],
        accessibility:{
            enabled:false
        },
        credits:false
      }
  return (
    <div className='my-7 glassMorphism p-5 sm:p-9'>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
  )
}

export default HighChart