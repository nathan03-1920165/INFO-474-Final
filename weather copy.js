// Array of cities
const cityOptions = [
    {value: "charlotte", label: 'Charlotte, North Carolina', file: 'Weather Sums/CLTs.csv'},
    {value: "losangeles", label: 'Los Angeles, California', file: 'Weather Sums/CQTs.csv'},
    {value: "indianapolis", label: 'Indianapolis, Indiana', file: 'Weather Sums/INDs.csv'},
    {value: "jacksonville", label: 'Jacksonville, Florida', file: 'Weather Sums/JAXs.csv'},
    {value: "chicago", label: 'Chicago, Illinois', file: 'Weather Sums/MDWs.csv'},
    {value: "philadelphia", label: 'Philadelphia, Pennsylvania', file: 'Weather Sums/PHLs.csv'},
    {value: "phoenix", label: 'Phoenix, Arizona', file: 'Weather Sums/PHXs.csv'},
    {value: "houston", label: 'Houston, Texas', file: 'Weather Sums/KHOUs.csv'},
    {value: "newyork", label: 'New York, New York', file: 'Weather Sums/KNYCs.csv'},
    {value: "seattle", label: 'Seattle, Washington', file: 'Weather Sums/KSEAs.csv'}
]

// Declare global variable for fileName
var fileName = "";

// Global function called when select element is changed
function onCategoryChanged() {
    var select = d3.select('#dropdown1').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;

    // Get file of select element
    /* for (let i = 0; i < 10; i++) {
        if (category == cityOptions[i].value) {
            fileName = "\"" + cityOptions[i].file + "\"";
        }
    } */
    
    // Update chart with the select city
    updateChart(category, true, 4)
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        city: row.city,
        date: row.date,
        actual_precipitation: +row.actual_precipitation,
        average_precipitation: +row.average_precipitation,
        record_precipitation: +row.record_precipitation
    };
}

var svg = d3.select('#plot1')

// Hand code the svg dimensions, you can also use +svg.attr('width') or +svg.attr('height')
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

// Define a padding object to space out the trellis subplots
var padding = {t: 20, r: 20, b: 60, l: 60};

// Compute the dimensions of the trellis plots
trellisWidth = svgWidth - 90;
trellisHeight = svgHeight - 80;

// As an example for how to layout elements with our variables
// Create .background rects for the trellis plot
svg.selectAll('.background')
    .data(['A']) // dummy data
    .enter()
    .append('rect') // Append a rectangle
    .attr('class', 'background')
    .attr('width', trellisWidth) // Use our trellis dimensions
    .attr('height', trellisHeight)
    .attr('transform', function(d, i) {
        // Position based on the matrix array indices.
        // i = 1 for column 1, row 0)
        var tx = (i % 3) * (trellisWidth + padding.l + padding.r) + padding.l;
        var ty = Math.floor(i / 2) * (trellisHeight + padding.t + padding.b) + padding.t;
        return 'translate('+[tx, ty]+')';
    });

barBackground = svg.selectAll('.xygrid')
    .data(['A'])
    .enter()
    .append("rect")
    .attr('class', 'xygrid')
    .attr('width', trellisWidth) // Use our trellis dimensions
    .attr('height', trellisHeight)
    .attr('transform', function(d, i) {
        // Position based on the matrix array indices.
        // i = 1 for column 1, row 0)
        var tx = (i % 3) * (trellisWidth + padding.l + padding.r) + padding.l;
        var ty = Math.floor(i / 2) * (trellisHeight + padding.t + padding.b) + padding.t;
        return 'translate('+[tx, ty]+')';
    });

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Compute the spacing for bar bands
var barBand = chartHeight / 12;
var barHeight = barBand * 0.7;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Set date and precipitation domain
var parseDate = d3.timeParse('%b %Y');
var dateDomain = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
var precipDomain = [0, 10];

// Load data
d3.csv("weather_sums.csv", dataPreprocessor).then(function(dataset) {

    // Define global variable to initialize chart
    weather = dataset;

    // Parse the dates
    dataset.forEach(function(d) {
        d.date = parseDate(d.date);
    })

    // Nest the loaded dataset
    nested = d3.nest()
        .key(function(c) {
            return c.city;
        })
        .entries(weather);

    // Filter data by city
    filteredCity = nested.filter(function(d) {
        return d.key === "CLT";
    })

    // Append trellis groupings
    trellisG = svg.selectAll('.trellis')
        .data(filteredCity)
        .enter()
        .append('g')
        .attr('class', 'trelis')
        .attr('transform', 'translate('+[padding.l, padding.t]+')');

    // Create scales for our bar chart
    xScale = d3.scaleBand().domain(dateDomain).range([0,trellisWidth]);
    yScale = d3.scaleLinear().domain(precipDomain).range([trellisHeight,0]);

    // Define a line interpolator
    var lineInterpolate = d3.line()
        .x(function(d) {return xScale(d.date)})
        .y(function(d) {return yScale(d.average_precipitation)})

    // Add color
    colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(nested.map(function(d) {
        return d.key;
    }))

    // Create axis
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    trellisG.append('g').call(xAxis).attr('class', 'x axis').attr('transform', 'translate(' + [0, trellisHeight] + ')')
    trellisG.append('g').call(yAxis).attr('class', 'y axis')

    // Add grids
    var xGrid = d3.axisTop(xScale)
        .tickSize(-trellisHeight, 0, 0)
        .tickFormat('');

    barBackground.append('g')
        .attr('class', 'x grid')
        .call(xGrid)

    var yGrid = d3.axisLeft(yScale)
        .tickSize(-trellisWidth, 0, 0)
        .tickFormat('')

    barBackground.append('g')
        .attr('class', 'y grid')
        .call(yGrid)

    // Label the axes
    var xaxisLabels = trellisG.append('text')
        .attr('class', 'x axis-label')
        .attr('transform', "translate(" + (trellisWidth / 2) + "," + (trellisHeight + 34) + ")")
        .text("Date (by Month)")

    var yaxisLabels = trellisG.append('text')
        .attr('class', 'y axis-label')
        .attr('transform', "translate(" + (-30) + "," + (trellisHeight / 2) + ") rotate(270)")
        .text("Average Precipitation (in)")

    // Update the chart for all letters to initialize
    updateChart("CLT", false, 4);
})

function updateChart(categoryKey, sliderTF, sliderValue) {

    // Global variable cityKey
    cityKey = categoryKey

    // Removes old 'rect' elements
    d3.selectAll("svg .bar").remove()

    // Removes old 'cityLabel' elements
    d3.selectAll('svg .city-label').remove()

    // Append city labels
    var cityLabel = trellisG.append('text')
        .attr('class', 'city-label')
        .attr('transform', "translate(" + (trellisWidth-355) + "," + (trellisHeight+45) + ")")
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .text(categoryKey)

    let precipitationData = filteredCity.map(function(group) {
        return {
            key: group.key,
            date: group.values.map(function(d) {
                return d.date;
            }),
            precipitationValues: group.values.map(function(d) {
                return d.average_precipitation;
            })
        };
    });

    if (sliderTF == true) {
        // Filter data by city
        filteredCity = nested.filter(function(d) {
            return d.key === categoryKey;
        })

        // Create a filtered array of weather data based on sliderValue
        var filteredData = []
        for (let i = 0; i < filteredCity[0].values.length; i++) {
            if (filteredCity[0].values[i].average_precipitation < sliderValue) {
                filteredData.push(filteredCity[0].values[i])
            }
        }
        var filteredWeather = [{key: categoryKey, values: filteredData}]
    } else {
        // Create a filtered array of weather data based on the categoryKey
        var filteredWeather = nested.filter(function(d){
            return d.key === categoryKey;
        });
    }

    console.log(nested)
    console.log(precipitationData)
    console.log(filteredWeather)

    // Create the bar chart
    var bars = chartG.selectAll('.bar.rect')
        .data(filteredWeather[0].values, function(d) { //key function
            return d.date
        })

    // Append new bars
    var barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar')

    barsEnter.merge(bars)
        .attr('transform', function(d, i) {
            return 'translate(' + [(barBand+10)*i + 5, 0] + ')';
        })

    barsEnter.append("rect")
        .attr('x', function(d) {return xScale(d.date)})
        .attr('y', function(d) {return yScale(d.average_precipitation)})
        .attr('width', barBand)
        .attr('height', function(d) {
            return chartHeight - yScale(d.average_precipitation)
        })
        /* .attr("fill", d3.scaleOrdinal(d3.schemeCategory10).domain(nested.map(function(d) {
            return d.key;
        }))) */
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })

    bars.exit().remove()
}

// Add slider functionality
d3.select("#mySlider").on("input", function() {
    selectedValue = this.value;
    updateChart(cityKey, true, selectedValue);

    // Update slider value text
    var sliderValueText = d3.select('#sliderValue');
    var percentText = selectedValue;
    sliderValueText.text('Precipitation < ' + percentText + " in.");
})

// Remember code outside of the data callback function will run before the data loads