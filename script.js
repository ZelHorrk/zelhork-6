// Dark Mode 
const darkModeToggle = document.getElementById('darkMode');
darkModeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', darkModeToggle.checked ? 'dark' : 'light');
    localStorage.setItem('theme', darkModeToggle.checked ? 'dark' : 'light');
    
    revenueChart.update();
    expenseChart.update();
});

const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
darkModeToggle.checked = savedTheme === 'dark';

const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const mainContent = document.querySelector('.main-content');
    mainContent.style.maxWidth = sidebar.classList.contains('collapsed') 
        ? '100%' 
        : 'calc(100% - 280px)';
    
    if(sidebar.classList.contains('collapsed')) {
        sidebarToggle.style.position = 'fixed';
        sidebarToggle.style.left = '1rem';
        sidebarToggle.style.zIndex = '1000';
        sidebarToggle.style.background = 'var(--card-bg)';
        sidebarToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        sidebarToggle.innerHTML = '☰';
    } else {
        sidebarToggle.style.position = 'static';
        sidebarToggle.style.background = 'none';
        sidebarToggle.style.boxShadow = 'none';
    }
});

let revenueChart, expenseChart;

function initializeCharts() {
    const ctx1 = document.getElementById('revenueChart');
    const ctx2 = document.getElementById('expenseChart');
    
    if(revenueChart) revenueChart.destroy();
    if(expenseChart) expenseChart.destroy();

    const textColor = getComputedStyle(document.body).getPropertyValue('--text');
    const borderColor = getComputedStyle(document.body).getPropertyValue('--border');

    revenueChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: revenueData.labels,
            datasets: [{
                ...revenueData.datasets[0],
                borderColor: getComputedStyle(document.body).getPropertyValue('--primary'),
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Monthly Revenue Trends',
                    color: textColor,
                    font: { size: 16 }
                }
            },
            scales: {
                x: {
                    grid: { color: borderColor },
                    ticks: { color: textColor }
                },
                y: {
                    grid: { color: borderColor },
                    ticks: { color: textColor }
                }
            }
        }
    });

    expenseChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: expenseData.labels,
            datasets: [{
                ...expenseData.datasets[0],
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: textColor }
                },
                title: {
                    display: true,
                    text: 'Expense Breakdown',
                    color: textColor,
                    font: { size: 16 }
                }
            }
        }
    });
}

initializeCharts();
window.addEventListener('theme-change', initializeCharts);

document.querySelectorAll('th').forEach(header => {
    header.style.cursor = 'pointer';
    header.addEventListener('click', () => {
        const table = header.closest('table');
        const columnIndex = Array.from(header.parentElement.children).indexOf(header);
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const isAscending = !header.classList.contains('asc');
        
        table.querySelectorAll('th').forEach(th => th.classList.remove('asc', 'desc'));
        
        header.classList.add(isAscending ? 'asc' : 'desc');
        
        rows.sort((a, b) => {
            const aValue = a.children[columnIndex].textContent.replace(/\D/g, '');
            const bValue = b.children[columnIndex].textContent.replace(/\D/g, '');
            return isAscending ? aValue - bValue : bValue - aValue;
        });

        table.querySelector('tbody').append(...rows);
    });
});

document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('#transactionsTable tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

document.getElementById('dateRange').addEventListener('change', (e) => {
    const days = parseInt(e.target.value);

    console.log(`Filtering for last ${days} days`);
});