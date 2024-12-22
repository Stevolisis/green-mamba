"use client"
import HighChart from '@/components/HighChart'
import { dummy_data, dummy_gifts } from '@/dummy_data';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addChart } from '@/redux/slices/chart';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react'
import HighchartsStock from 'highcharts/modules/stock';


const page = () => {
    if (typeof Highcharts === 'object') {
        HighchartsStock(Highcharts);
    }
//   const options = {
//     title:{
//         text: "Milk Production Chart",
//         style: {
//             color: '#fff'
//         },
//     },
//     chart: {
//         type: 'candlestick',
//         backgroundColor: "transparent"
//     },
//     xAxis:{
//         title:"Monthly Reports",
//         categories: ["Week1", "Week2", "Week3", "Week4"],
//         labels:{
//             style:{
//                 color:"#fff"
//             }
//         }
//     },
//     yAxis:{
//         title:"Litres of milk",
//         gridLineColor:"#555",
//         labels:{
//             style:{
//                 color:"#fff"
//             }
//         }
//     },
//     series: [
//         {
//             name: "Litres",
//             data: [
//                 { name: 'Chrome', y: 31.41 },
//                 { name: 'Internet Explorer', y: 11.84 },
//                 { name: 'Firefox', y: 10.85 },
//                 { name: 'Edge', y: 41.67 },
//                 { name: 'Safari', y: 4.18 },
//                 { name: 'Other', y: 27.05 },
//             ]
//         },
//         {
//             name: "Gallons",
//             data: [
//                 { name: 'Brave', y: 61.41 },
//                 { name: 'Duck Duck Go', y: 11.84 },
//                 { name: 'Lenar', y: 10.85 },
//                 { name: 'Cursor', y: 4.67 },
//                 { name: 'Viscodium', y: 4.18 },
//                 { name: 'Lemar', y: 7.05 },
//             ]
//         },
//     ],
//     plotOptions: {
//         column: {
//           borderRadius: 100,
//           dataLabels: {
//             enabled: true,
//             style: {
//               color: '#fff'
//             }
//           },
//         }
//     },
//     legend: {
//         itemStyle: {
//           color: '#fff'
//         }
//     },
//     credits: false 
//   };

const options = {
    chart: {
        type: 'candlestick',
        backgroundColor: 'transparent',
    },
    title: {
        text: 'Stock Price Movement',
        style: {
            color: '#ffffff',
            fontSize: '18px',
        },
    },
    xAxis: {
        type: 'datetime',
        labels: {
            style: {
                color: '#ffffff', // X-axis label color
            },
        },
    },
    yAxis: {
        title: {
            text: 'Price',
            style: {
                color: '#ffffff', // Y-axis title color
            },
        },
        labels: {
            style: {
                color: '#ffffff', // Y-axis label color
            },
        },
    },
    tooltip: {
        split: true,
    },
    series: [
        {
            name: 'AAPL',
            data: [
                [1672531200000, 150, 155, 145, 152], // Day 1
                [1672617600000, 152, 158, 149, 155], // Day 2
                [1672704000000, 155, 160, 150, 158], // Day 3
                [1672790400000, 158, 162, 153, 160], // Day 4
                [1672876800000, 160, 165, 158, 163], // Day 5
                [1672963200000, 163, 168, 160, 164], // Day 6
                [1673049600000, 164, 170, 161, 169], // Day 7
                [1673136000000, 169, 175, 165, 170], // Day 8
                [1673222400000, 170, 172, 160, 162], // Day 9 (red candle)
                [1673308800000, 162, 166, 158, 159], // Day 10 (red candle)
                [1673395200000, 159, 162, 150, 155], // Day 11 (red candle)
                [1673481600000, 155, 158, 149, 152], // Day 12
                [1673568000000, 152, 154, 150, 153], // Day 13
                [1673654400000, 153, 157, 152, 155], // Day 14
                [1673740800000, 155, 158, 150, 152], // Day 15 (red candle)
                [1673827200000, 152, 157, 151, 155], // Day 16
                [1673913600000, 155, 160, 153, 159], // Day 17
                [1674000000000, 159, 164, 155, 161], // Day 18
                [1674086400000, 161, 165, 160, 163], // Day 19
                [1674172800000, 163, 170, 162, 167], // Day 20
            ],
            type: 'candlestick',
            color: '#d32f2f', // Red color for downward candlesticks
            upColor: '#388e3c', // Green color for upward candlesticks
        },
    ],
    credits: false, // Disable Highcharts watermark
};



  return (
    <div className="px-4 sm:px-16 py-12 font-[SatoshiRegular]">
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
        />
    </div>
  )
}

export default page;