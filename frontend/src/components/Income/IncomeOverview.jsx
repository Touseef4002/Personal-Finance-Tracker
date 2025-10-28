import React from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../charts/CustomBarChart'
import { useState } from 'react';
import { useEffect } from 'react';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className='card'>
            <div className='flex justify-between items-center'>
                <div className=''>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Track your income sources and amounts over time to get a better understanding of your financial situation.
                    </p>
                </div>

                <button className='add-btn' onClick={onAddIncome}>
                    <LuPlus className='text-lg' />
                    Add Income
                </button>
            </div>

            <div className='mt-10'>
                <CustomBarChart data={chartData} XAxiskey='uniqueId' />
            </div>
        </div>
    )
}

export default IncomeOverview