import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import CustommPieChart from '../charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA23C7", "#FF6900", "#4F39F6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map(item => ({
            name: item?.source,
            amount: item?.amount
        }));

        setChartData(dataArr);
    }

    useEffect(() => {
        prepareChartData();

        return () => { };
    }, [data]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            <CustommPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart