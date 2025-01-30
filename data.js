// Chart
const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Revenue',
        data: [50000, 60000, 70000, 80000, 90000, 100000],
        borderColor: '#4caf50',
        fill: false
    }]
};

const expenseData = {
    labels: ['Marketing', 'Operations', 'R&D', 'Salaries'],
    datasets: [{
        label: 'Expenses',
        data: [20000, 15000, 10000, 5000],
        backgroundColor: ['#ff4081', '#00bcd4', '#ff9800', '#9c27b0']
    }]
};

// Mock Data
const transactions = [
    { date: '2023-10-01', category: 'Marketing', amount: '$5,000', status: 'Completed' },
    { date: '2023-10-05', category: 'Operations', amount: '$3,000', status: 'Pending' },
    { date: '2023-10-10', category: 'R&D', amount: '$2,500', status: 'Completed' }
];


const tableBody = document.querySelector('#transactionsTable tbody');
transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.status}</td>
    `;
    tableBody.appendChild(row);
});