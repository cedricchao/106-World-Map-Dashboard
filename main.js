// Global constants
const DEBUG = true;
const DINGUS_PRICE = 14.25;
const WIDGET_PRICE = 9.99;

// Some little helpers
const log = msg => (DEBUG ? console.log(msg) : '');
const select = id => document.getElementById(id);

var data123 = [
    ['eu', 0],
    ['oc', 0],
    ['af', 0],
    ['as', 0],
    ['na', 0],
    ['sa', 0]
];
var pieChart;
var colChart;

function plotMap() {

    Highcharts.mapChart('myMap', {
        chart: {
            map: 'custom/world-continents'
        },

        title: {
            text: ''
        },
        exporting: { enabled: false },

        plotOptions: {
            map: {
                color: '#DDDDDD',
            },
            series: {
                point: {
                    events: {
                        select: function() {
                            var text = this.name.toUpperCase().replace(/\s/g, "");
                            if (text == 'OCEANIA') {
                                text = 'AUSTRALIA';
                            }
                            plotPie(text);
                            plotColumn(text);
                            updateScoreCards(text);
                            // selectedPoints = pieChart.getSelectedPoints();
                            document.getElementById('aq').style.fill = '#BBBBBB';

                        },

                        mouseOver: function() {
                            if (this.selected) {
                                console.log('1111');

                                //this.fill = '#777777';
                            }
                        },
                    }
                },

            }
        },

        series: [{
            data: data123,
            allowPointSelect: true,
            name: '',
            showInLegend: false,
            states: {
                hover: {
                    brightness: -0.1, // darken
                    opacity: 1,

                },
                select: {
                    color: '#7CA82C',
                    borderColor: 'white',
                }
            },
            dataLabels: {
                enabled: true,
                // format: '{point.name}'
                formatter: function(e) {
                    let text = this.point.name.toUpperCase();
                    if (text == 'OCEANIA') {
                        text = 'AUSTRALIA';
                    }
                    return text;
                },
            },
            tooltip: {
                // pointFormat: '<b>{point.name}</b><br/>',
                // clusterFormat: '<b>{point.name}</b><br/>',
                headerFormat: '',
                pointFormat: '{point.name}',
                formatter: function() {
                    let text = this.point.name.toUpperCase();
                    if (text == 'OCEANIA') {
                        text = 'AUSTRALIA';
                    }
                    return text;
                },
                useHTML: true,

            },
        }]
    });

}


function plotSales(sales) {
    // Plot the world map
    plotMap();

    // Make sales data available globally
    data = sales;

}

function plotColumn(continent) {


    if (continent === 'ANTARCTICA' && colChart) {
        colChart.destroy();
        colChart = null;
        return;
    }

    let sales = data[continent];
    let dinguses = [],
        widgets = [];
    for (const datum of sales) {

        dinguses.push(datum['Dingus']);
        widgets.push(datum['Widget']);

        
    }

    var cat = ['January', 'February', 'March ']
	Highcharts.chart('salesPerMonthChart', {
		title: {
			text: 'Sales Amount for Dingus and Widget Daily'
		},
		xAxis: {
			categories: cat,
			title: {
				text: 'Dates'
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Sales Per Day'
			}
		},
		series: [{
			name: 'dingus sale daily',
			data: dinguses,
			// step: 'center'
		}, {
			name: 'widget sale daily',
			data: widgets,
			// step: 'center'
		}]
	});
    
    
    
}


function plotPie(continent) {
    if (continent === 'ANTARCTICA' && pieChart) {
        pieChart.destroy();
        pieChart = null;
        return;
    }

    let sales = data[continent];
    let dinguses = 0,
        widgets = 0;
    for (const datum of sales) {
        dinguses += datum['Dingus'];
        widgets += datum['Widget'];
    }


    pieChart = Highcharts.chart('totalSalesChart', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Total Sales',
            style: { fontWeight: "bold", fontSize: 18 }

        },
        legend: {
            reversed: true
        },
        plotOptions: {
            pie: {
                animation: true,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f}%',
                    distance: -60,
                    color: '#ffffff',
                    style: {
                        fontSize: 17,
                        fontWeight: 'bold',
                    }
                },
                startAngle: 90,
                states: {
                    inactive: {
                        opacity: 1
                    },
                    hover: {
                        brightness: -0.1 // darken
                    }
                },
                showInLegend: true,
                colors: ['#29A2CC', '#0a0a0a'],
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 4,
            floating: true,
            backgroundColor: 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false,
            squareSymbol: false,
            symbolRadius: 0,
            symbolWidth: 12,
            layout: 'vertical',
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '{point.y}',
            formatter: function() {
                return '<div style="background-color:' + this.series.color + '!important; font-weight:bold;color:#fff;  class="tooltip"> ' + this.y + '</div>';
            },
            followPointer: true,
            shared: false,
            useHTML: true,
            style: {
                opacity: 0,
            }
        },
        series: [{
            name: 'Sale',
            colorByPoint: true,
            data: [{
                name: 'Dinguses',
                sliced: true,
                selected: true,
                y: dinguses
            }, {
                name: 'Widgets',
                y: widgets
            }]
        }]
    });
}


function plotStocks(stocks) {
    let prices = [];
    for (datum of stocks) {
        log(datum);
        prices.push([datum['Date'], datum['Adj Close']]);
    }

    Highcharts.chart('stockChart', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Dynamic Growth'
        },
        subtitle: {
            text: 'Stock Prices of D&W Corp. from 2015-Present'
        },
        xAxis: {
            type: 'datetime',
            crosshair: true,
            title: {
                text: 'Date'
            },
            lineColor: '#888888',
            lineWidth: 1,
        },
        yAxis: {
            crosshair: true,
            title: {
                text: 'Adj Close Stock Price'
            },
            lineColor: '#888888',
            lineWidth: 1,
        },
        legend: {
            enabled: false
        },

        tooltip: {
            pointFormat: '$<b>{point.y:.2f}</b><br/>',
            shared: true
        },
        plotOptions: {
            area: {
                color: '#CEE8F2',
                marker: {
                    radius: 2,
                    fillColor: 'white',
                    lineColor: '#29A2CC'
                },
                lineColor: '#29A2CC',

                lineWidth: 3,
                states: {
                    hover: {
                        lineWidth: 2
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Adj Close',
            data: prices
        }]
    });
}

function updateScoreCards(continent) {
    let sales = data[continent];
    let dinguses = 0,
        widgets = 0;
    for (const datum of sales) {
        dinguses += datum['Dingus'];
        widgets += datum['Widget'];
    }
    let revenue = DINGUS_PRICE * dinguses + WIDGET_PRICE * widgets;
    select('dingusSold').innerHTML = dinguses;
    select('widgetSold').innerHTML = widgets;
    select('totalSales').innerHTML = revenue.toFixed(2);
}
async function loadJSON(path) {
    let response = await fetch(path);
    let dataset = await response.json(); // Now available in global scope
    return dataset;
}

function init() {
    
    document.getElementById("antarctic").addEventListener("click", clickArc);
    

    salesPromise = loadJSON('sales.json');
    stocksPromise = loadJSON('stocks.json');
    salesPromise.then(function(sales) {
        //plotMap(mapJson);
        plotSales(sales);
    });
    stocksPromise.then(function(stocks) {
        plotStocks(stocks);
    });

}
document.addEventListener('DOMContentLoaded', init, false);


function clickArc() {
    
    document.getElementById('aq').style.fill = '#7CA82C';
    // }
    if (pieChart) {
        selectedPoints = pieChart.getSelectedPoints();
        if (selectedPoints) {
            console.log(selectedPoints[0]);

            selectedPoints[0].select(false, false);
        }
        plotPie('ANTARCTICA');
        plotColumn('ANTARCTICA');
    }


}