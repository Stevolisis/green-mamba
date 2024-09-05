import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from '@/redux/hooks';
import { selectChartByName } from '@/redux/slices/chart';


const HighChart = () => {
    const chart = useAppSelector(state => selectChartByName(state.charts, "dashboard"));
    const { months, years, currentMonth, currentYear} =useAppSelector(state => state.charts);
    const options2  = {
        title: {
            text: '',
        },
        chart:{
            type:'column',
            backgroundColor: 'transparent'
        },
        xAxis:{
            title:{
                text: "Weeks"
            },
            categories: chart?.columns,
            labels: {
                style: {
                    color: '#fff'
                }
            },
            gridLineColor: '#555'
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
            gridLineColor: '#555'
        },
        plotOptions:{
            column:{
                borderRadius: 100,
                color:"#00ff95",
                borderColor:"#00ff95"
            }
        },
        series: [
            {
                name:'Gifts',
                data: chart?.rows
            }
        ],
        legend: {
            itemStyle: {
              color: '#fff' // Color for the series text in the legend
            }
        },
        accessibility:{
            enabled:true
        },
        credits:false
    }

    const options = {
        title: {
          text: '',
        },
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        xAxis: {
          title: {
            text: "Weeks"
          },
          categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // X-axis categories
          labels: {
            style: {
              color: '#fff' // X-axis labels color
            }
          },
          gridLineColor: '#555'
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            style: {
              color: '#fff' // Y-axis labels color
            }
          },
          gridLineColor: '#555'
        },
        plotOptions: {
          column: {
            borderRadius: 100,
            dataLabels: {
              enabled: true,
              style: {
                color: '#fff' // Color of the labels on top of the columns
              }
            },
            grouping: true // Ensures columns are grouped
          }
        },
        series: [
          {
            name: 'Gifts', // First column for each category
            data: [30, 40, 50, 60], // Sample data for Type A
            color: '#00ff95' // Custom color for this series
          },
        //   {
        //     name: 'Gifts Type B', // Second column for each category
        //     data: [20, 30, 40, 50], // Sample data for Type B
        //     color: '#ff0095' // Custom color for this series
        //   },
          {
            name: 'No of Articles', // Third column for each category
            data: [10, 20, 30, 40], // Sample data for Type C
            color: '#0095ff' // Custom color for this series
          }
        ],
        legend: {
          itemStyle: {
            color: '#fff' // Color for the series text in the legend
          }
        },
        accessibility: {
          enabled: true
        },
        credits: false // Disable the Highcharts credits text
      };
      

  return (
    <div className='rounded-md my-7 glassMorphism border border-[#ffffff1a] p-5 sm:p-9'>
        <div className='flex justify-between items-center flex-wrap sm:flex-nowrap py-7 gap-y-4 gap-x-2'>
            <div>
                <h1 className='pl-2 text-2xl md:text-3xl font-[SatoshiBold]'>{ chart?.title }</h1>
            </div>

            <div className="flex flex-grow sm:flex-initial items-center gap-3 flex-wrap md:flex-nowrap">
                <select className='flex-1 justify-stretch focus:outline-bgSecondary focus:border-bgSecondary text-white glassMorphism py-2 px-4 rounded-full' defaultValue={currentMonth}>
                    {
                        months.map((month,i)=>(
                            <option key={i} className='bg-bgPrimary' value={i}>{month}</option>
                        ))
                    }
                </select>

                <select className='flex-1 justify-stretch focus:outline-bgSecondary focus:border-bgSecondary text-white glassMorphism py-2 px-4 rounded-full' defaultValue={currentYear}>
                    {
                        years.map((year,i)=>(
                            <option key={i} className='bg-bgPrimary' value={year}>{year}</option>
                        ))
                    }
                </select>
            </div>
        </div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </div>
  )
}

export default HighChart