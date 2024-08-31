document.addEventListener('DOMContentLoaded', () => {
    // Gráfico de Fluxo de Caixa Diário
    const ctx1 = document.getElementById('myChart1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
            datasets: [{
                label: 'Fluxo de Caixa Diário',
                data: [1.5, 2.3, 0.5, 1.2, 0.8, 1.0, 1.3],
                backgroundColor: '#799C58',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            const hours = Math.floor(value);
                            const minutes = Math.round((value - hours) * 60);
                            return `${hours}h ${minutes}m`;
                        }
                    },
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1,
                    }
                },
                x: {
                    ticks: {
                        autoSkip: true
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            const value = tooltipItem.raw;
                            const hours = Math.floor(value);
                            const minutes = Math.round((value - hours) * 60);
                            return `${hours}h ${minutes}m`;
                        }
                    }
                }
            }
        }
    });

    // Gráfico de Faturamento Mensal
    const ctx2 = document.getElementById('myChart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Faturamento Mensal',
                data: [5000, 6000, 5500, 7000, 8000, 7500, 9000, 8500, 9000, 9500, 10000, 11000],
                backgroundColor: '#385725',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value;
                        }
                    },
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1,
                    }
                },
                x: {
                    ticks: {
                        autoSkip: true
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return 'R$ ' + tooltipItem.raw;
                        }
                    }
                }
            }
        }
    });
});

function loadContent(section) {
    const url = `/Painel/content/${section}/${section}.html`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;

            const script = document.createElement('script');
            script.src = `/Painel/content/${section}/script.js`;
            script.onload = () => {
                console.log(`Script in the path: ${script.src}`);
            };
            script.onerror = (error) => console.error(`Erro ao carregar ${section} script:`, error);
            document.body.appendChild(script);
        })
        .catch(error => console.error('Erro ao carregar conteúdo:', error));
}
