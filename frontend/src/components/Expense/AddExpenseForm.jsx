import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopup from '../EmojiPickerPopup'

const AddExpenseForm = ({ onAddExpense }) => {

    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: ''
    });

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    const handleSubmit = () => {
        const sanitizedExpense = {
            category: (expense.category || '').trim(),
            amount: (expense.amount || '').trim(),
            date: (expense.date || '').trim(),
            icon: (expense.icon || '').trim()
        };

        if (onAddExpense) {
            onAddExpense(sanitizedExpense);
        }
    };

    return (
        <div className=''>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => { handleChange('icon', selectedIcon) }}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange('category', target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc..."
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="Enter amount"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label="Date"
                placeholder="Enter date"
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={handleSubmit}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm