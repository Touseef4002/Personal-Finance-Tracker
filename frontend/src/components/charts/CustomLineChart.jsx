import React from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts'
const CustomLineChart = ({ data, dataKey = 'month' }) => {

    const CustomTooltip = ({ active, payload, dataKey }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-900'>₹{payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    }

    const formatXAxisTick = (value) => {
        return value.split('_')[0];
    }

    return (
        <div className='bg-white'>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id='incomeGradient' x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#875CF5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#875CF5" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke='none' />
                    <XAxis dataKey={dataKey} tick={{ fontSize: 12, fill: '#555' }} stroke='none' tickFormatter={formatXAxisTick} />
                    <YAxis stroke='none' tick={{ fontSize: 12, fill: '#555' }} />
                    <Tooltip content={<CustomTooltip />} />

                    <Area type="monotone" dataKey="amount" stroke="#875CF5" fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill: '#ab8df8' }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomLineChart