import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectChartByName, setCurrentMonth, setCurrentYear } from '@/redux/slices/chart';

interface IProps{
  name:string
}
const HighChart = (props:IProps) => {
  const chart = useAppSelector(state => selectChartByName(state.charts, props.name));
  const chart2 = props.name === "Gifts" && useAppSelector(state => selectChartByName(state.charts, "Gifters"));
  const { months, years, currentMonth, currentYear} =useAppSelector(state => state.charts);
  const dispatch = useAppDispatch();

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
        categories: chart?.columns,
        labels: {
          style: {
            color: '#fff'
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
            color: '#fff'
          }
        },
        gridLineColor: '#555'
      },
      plotOptions: {
        column: {
          borderRadius: 100,
          // dataLabels: {
          //   enabled: true,
          //   style: {
          //     color: '#fff'
          //   }
          // },
          grouping: true
        }
      },
      series: [
        {
          name: chart?.name,
          data: chart?.rows,
          color: '#00ff95'
        },
        {
          name: chart2 && chart2.name,
          data: chart2 && chart2.rows,
          color: '#0095ff'
        }
      ],
      legend: {
        itemStyle: {
          color: '#fff'
        }
      },
      accessibility: {
        enabled: true
      },
      credits: false 
  };


  return (
    <div className='rounded-md my-7 glassMorphism border border-[#ffffff1a] p-5 sm:p-9'>
        <div className='flex justify-between items-center flex-wrap sm:flex-nowrap py-7 gap-y-4 gap-x-2'>
            <div>
                <h1 className='pl-2 text-2xl md:text-3xl font-[SatoshiBold]'>{ chart?.title }</h1>
            </div>

            <div className="flex flex-grow sm:flex-initial items-center gap-3 flex-wrap md:flex-nowrap">
                <select onChange={(e)=> dispatch(setCurrentMonth(parseInt(e.target.value)))} className='flex-1 justify-stretch focus:outline-bgSecondary focus:border-bgSecondary text-white glassMorphism py-2 px-4 rounded-full' defaultValue={currentMonth}>
                    {
                        months.map((month,i)=>(
                            <option key={i} className='bg-bgPrimary' value={i}>{month}</option>
                        ))
                    }
                </select>

                <select onChange={(e)=> dispatch(setCurrentYear(parseInt(e.target.value)))} className='flex-1 justify-stretch focus:outline-bgSecondary focus:border-bgSecondary text-white glassMorphism py-2 px-4 rounded-full' defaultValue={currentYear}>
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