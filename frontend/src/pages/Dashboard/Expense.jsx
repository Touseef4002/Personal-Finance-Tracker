import React from 'react'
import { useState } from 'react'
import IncomeOverview from '../../components/Income/IncomeOverview';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useEffect } from 'react';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';

const Expense = () => {
    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    //Get all expense details
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSES}`);

            if (response.data) {
                setExpenseData(response.data);
            }
        }
        catch (error) {
            console.error("Error fetching expense details:", error);
        }
        finally {
            setLoading(false);
        }
    };

    //Handle add expense
    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;

        //Validation
        if (!category.trim()) {
            toast.error("Category is required");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Enter valid amount.");
            return;
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }

        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon });

            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully.");
            fetchExpenseDetails();
        }
        catch (error) {
            console.error("Error adding expense:", error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        fetchExpenseDetails();

        return () => { };
    }, []);



    //Delete expense
    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully.");
            fetchIncomeDetails();
        }
        catch (error) {
            console.error("Error deleting income:", error.response?.data?.message || error.message);
        }
    }

    //Handle download income details
    const handleDownloadIncomeDetails = async () => {

    }


    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModal(true)}
                        />
                    </div>
                </div>
            </div>

        </DashboardLayout>
    )
}



export default Expense