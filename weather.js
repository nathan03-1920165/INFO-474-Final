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
    var select1 = d3.select('#dropdown1').node();
    // Get current value of select element
    var category1 = select1.options[select1.selectedIndex].value;
    // Get file of select element
    for (let i = 1; i < 10; i++) {
        if (category1 == cityOptions[i].value) {
            fileName = "'" + cityOptions[i].file + "'";
        }
    }
    // Update chart with the select city
    updateChart(category1, fileName);
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
var dateDomain = [new Date(2014, 0), new Date(2014, 11)];
//["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
var precipDomain = [0, 10];

// Load data
d3.csv("weather_sums.csv", dataPreprocessor).then(function(dataset) {

    // Define global variable to initialize chart
    weather = dataset;

    //// Nesting a Dataset

    // Parse the dates
    dataset.forEach(function(d) {
        d.date = parseDate(d.date);
    })

    // Nest the loaded dataset
    var nested = d3.nest()
        .key(function(c) {
            return c.city;
        })
        .entries(dataset);

    //// Grouping a Trellis Bar Chart

    // Append trellis groupings
    var trellisG = svg.selectAll('.trellis')
        .data(nested)
        .enter()
        .append('g')
        .attr('class', 'trelis')
        .attr('transform', function(d, i) {
            // Position based on the matrix array indices.
            // i = 1 for column 1, row 0)
            var tx = (i % 2) * (trellisWidth + padding.l + padding.r) + padding.l;
            var ty = Math.floor(i / 2) * (trellisHeight + padding.t + padding.b) + padding.t;
            return 'translate('+[tx, ty]+')';
        });

    // Create scales for our bar chart
    var xScale = d3.scaleTime().domain(dateDomain).range([0,trellisWidth])
    var yScale = d3.scaleLinear().domain(precipDomain).range([trellisHeight,0]);

    // Define a line interpolator
    var lineInterpolate = d3.line()
        .x(function(d) {return xScale(d.date)})
        .y(function(d) {return yScale(d.average_precipitation)})

    // Add color
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(nested.map(function(d) {
        return d.key;
    }))

    // Create axis for each subplot
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    trellisG.append('g').call(xAxis).attr('class', 'x axis').attr('transform', 'translate(' + [0, trellisHeight] + ')')
    trellisG.append('g').call(yAxis).attr('class', 'y axis')

    //// Finishing Touches

    // Add grids
    var xGrid = d3.axisTop(xScale)
        .tickSize(-trellisHeight, 0, 0)
        .tickFormat('');

    trellisG.append('g')
        .attr('class', 'x grid')
        .call(xGrid)

    var yGrid = d3.axisLeft(yScale)
        .tickSize(-trellisWidth, 0, 0)
        .tickFormat('')

    trellisG.append('g')
        .attr('class', 'y grid')
        .call(yGrid)

    // Append city labels
    var cityLabels = trellisG.append('text')
        .attr('class', 'city-label')
        .attr('transform', "translate(" + (trellisWidth / 2) + "," + (trellisHeight / 2) + ")")
        .attr('fill', function(d) {
            return colorScale(d.key)
        })
        .text(function(d) {
            return d.key;
        })

    // Label the axes
    var xaxisLabels = trellisG.append('text')
        .attr('class', 'x axis-label')
        .attr('transform', "translate(" + (trellisWidth / 2) + "," + (trellisHeight + 34) + ")")
        .text("Date (by Month)")

    var yaxisLabels = trellisG.append('text')
        .attr('class', 'y axis-label')
        .attr('transform', "translate(" + (-30) + "," + (trellisHeight / 2) + ") rotate(270)")
        .text("Average Precipitation (in)")

    // Update the chart for all data to initialize
    var select = d3.select('#dropdown1').node();
    var category = select.options[select.selectedIndex].value;
    updateChart(category, "Weather Sums/KSEAs.csv", false, 0.15);
});

function updateChart(categoryKey, file, sliderTF, sliderValue) {
    /* if (sliderTF == true) {
        // Create a filtered array of average precipitation based on sliderValue
        var filteredPrecip = []
        for (let i = 0; i < 12; i++) {
            if (weather[i].average_precipitation < sliderValue) {
                filteredPrecip.push(weather[i])
            }
        }
    } else {
        // Create a filtered array of letters based on the filterKey
        var filteredPrecip = weather.filter(function(d){
            return d.city === category;
            lettersMap[filterKey].indexOf(d.letter) >= 0
        });
    } */

    var filteredPrecip = weather.filter(function(d) {
        return d.city === categoryKey;
    })

    console.log(filteredPrecip)

    // Create the bar chart
    var bars = chartG.selectAll('.bar')
        .data(filteredPrecip, function(d) { //key function
            return d.city;
        })

    var barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar')

    barsEnter.merge(bars)
        .attr('transform', function(d, i) {
            return 'translate(' + [0, barBand*i + 4] + ')';
        })

    barsEnter.append('rect')
        .attr('width', function(d) {
            return xScale(d.average_precipitation);
        })
        .attr('height', barHeight)

    barsEnter.append('text')
        .text(function(d) {
            return d.city;
        })
        .attr('x', -20)
        .attr('dy', '0.9em')

    bars.exit().remove();
}

// Add slider functionality
d3.select("#mySlider").on("input", function() {
    selectedValue = this.value;
    updateChart('all-letters', true, selectedValue);

    // Update slider value text
    var sliderValueText = d3.select('#sliderValue');
    var percentText = selectedValue + ' %';
    sliderValueText.text('Frequency < ' + percentText);
})

// Remember code outside of the data callback function will run before the data loads