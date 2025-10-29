import moment from 'moment';

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export const getInitials = (name) => {
    if(!name) return "?";

    const words = name.trim().split(/\s+/); // Use regex to handle multiple spaces
    let initials = "";

    for(let i = 0; i < Math.min(words.length, 2); i++) {
        // Add safety check for empty words
        if (words[i] && words[i].length > 0) {
            initials += words[i][0];
        }
    }
    return initials.toUpperCase() || "?"; // Fallback if no initials found
}

export const addThousandsSeparator = (num) => {  
    if(num == null || isNaN(num)) return " ";

    const [integerPart, decimalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    if (!data || !Array.isArray(data)) {
        // console.warn('prepareExpenseBarChartData: Expected array, got:', data);
        return [];
    } 

    try{
        const chartData = data.map(item => ({
            category: item?.category || 'Others',
            amount: item?.amount || 0,
        }));

        return chartData;
    }
    catch (error) {
        console.error('Error in prepareExpenseBarChartData:', error);
        return [];
    }
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item, index) => ({
        uniqueId: `${moment(item?.date).format('DD MMM')}_${index}`,
        month: moment(item?.date).format('DD MMM'),
        fullDate: moment(item?.date).format('DD MMM YYYY'),
        amount: item?.amount,
        source: item?.source,
    }));

    return chartData;
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item, index) => ({
        uniqueId: `${moment(item?.date).format('DD MMM')}_${index}`,
        month: moment(item?.date).format('DD MMM'),
        fullDate: moment(item?.date).format('DD MMM YYYY'),
        amount: item?.amount,
        category: item?.category,
    }));

    return chartData;
}