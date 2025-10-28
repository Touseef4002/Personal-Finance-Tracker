import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'

const Expense = () => {
    useUserAuth();
    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'></div>

        </DashboardLayout>
    )
}



export default Expense