// Function to render the pie chart
function renderCalorieChart(totalCalories, consumedCalories) {
    const remainingCalories = totalCalories - consumedCalories;

    const ctx = document.getElementById('caloriePieChart').getContext('2d');
    const caloriePieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Consumed Calories', 'Remaining Calories'],
            datasets: [{
                data: [consumedCalories, remainingCalories],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw || 0;
                            return `${label}: ${value} calories (${((value / totalCalories) * 100).toFixed(2)}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Example usage
const totalCalories = 2000; // Total daily calorie goal
const consumedCalories = 1200; // Calories consumed so far
renderCalorieChart(totalCalories, consumedCalories);