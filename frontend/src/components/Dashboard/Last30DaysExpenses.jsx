import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../charts/CustomBarChart';

const Last30DaysExpenses = ({ data }) => {

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        try {
            setLoading(true);
            const result = prepareExpenseBarChartData(data);
            setChartData(result);
        }
        catch (error) {
            console.error('❌ Error in Last30DaysExpenses:', error);
            setChartData([]);
        } finally {
            setLoading(false);
        }
    }, [data]);

    if (loading) {
        return (
            <div className='card col-span-1'>
                <div className='flex items-center justify-between'>
                    <h5 className='text-lg'>Last 30 Days Expenses</h5>
                </div>
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Loading chart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={chartData} />
        </div>
    )
}

export default Last30DaysExpenses