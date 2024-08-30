"use client"
import React from 'react'
import { BsBank2 } from 'react-icons/bs'
import { IoStatsChartSharp } from 'react-icons/io5'

type Props = {}

const page = (props: Props) => {
  return (
    <div className="px-4 sm:px-16 py-12">
      <div>

        <div>
          <div>
            
            <div>
              <BsBank2 size={18} />
            </div>

            <div>
              <p>Steven Joseph</p>
            </div>
          </div>

          <div>
            
            <div>
              <p>
                Balance
              </p>
              <h2>
                12,455 ETH
              </h2>
            </div>

            <div>
              <IoStatsChartSharp size={24} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page