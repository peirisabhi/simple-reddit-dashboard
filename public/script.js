let scoreChart, commentsChart;

function createCharts(data) {
    const ctx1 = document.getElementById('scoreChart').getContext('2d');
    const ctx2 = document.getElementById('commentsChart').getContext('2d');

    scoreChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: data.map(post => post.title.substring(0, 30) + '...'),
            datasets: [{
                label: 'Score',
                data: data.map(post => post.score),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    commentsChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: data.map(post => post.title.substring(0, 30) + '...'),
            datasets: [{
                label: 'Comments',
                data: data.map(post => post.comments),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateCharts(data) {
    scoreChart.data.labels = data.map(post => post.title.substring(0, 30) + '...');
    scoreChart.data.datasets[0].data = data.map(post => post.score);
    scoreChart.update();

    commentsChart.data.labels = data.map(post => post.title.substring(0, 30) + '...');
    commentsChart.data.datasets[0].data = data.map(post => post.comments);
    commentsChart.update();
}

async function fetchData() {
    try {
        const response = await fetch('/api/reddit');
        const data = await response.json();
        if (scoreChart && commentsChart) {
            updateCharts(data);
        } else {
            createCharts(data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
setInterval(fetchData, 60000); // Fetch data every minute
