// Global function called when select element is changed for dropdown1
function onCategoryChanged1() {
    var select = d3.select('#dropdown1').node();

    // Get current value of select element
    var category = select.options[select.selectedIndex].value;

    // Keep existing three plots
    updateChart2(cityKey2, sliderKey2)
    updateChart3(cityKey3, sliderKey3)
    updateChart4(cityKey4, sliderKey4)
    
    // Update chart with the select city
    updateChart1(category, sliderKey1)
}

// Global function called when select element is changed for dropdown2
function onCategoryChanged2() {
    var select = d3.select('#dropdown2').node();

    // Get current value of select element
    var category = select.options[select.selectedIndex].value;

    // Keep existing three plots
    updateChart1(cityKey1, sliderKey1)
    updateChart3(cityKey3, sliderKey3)
    updateChart4(cityKey4, sliderKey4)
    
    // Update chart with the select city
    updateChart2(category, sliderKey2)
}

// Global function called when select element is changed for dropdown3
function onCategoryChanged3() {
    var select = d3.select('#dropdown3').node();

    // Get current value of select element
    var category = select.options[select.selectedIndex].value;

    // Keep existing three plots
    updateChart1(cityKey1, sliderKey1)
    updateChart2(cityKey2, sliderKey2)
    updateChart4(cityKey4, sliderKey4)
    
    // Update chart with the select city
    updateChart3(category, sliderKey3)
}

// Global function called when select element is changed for dropdown4
function onCategoryChanged4() {
    var select = d3.select('#dropdown4').node();

    // Get current value of select element
    var category = select.options[select.selectedIndex].value;

    // Keep existing three plots
    //resetSliderValue()
    updateChart1(cityKey1, sliderKey1)
    updateChart2(cityKey2, sliderKey2)
    updateChart3(cityKey3, sliderKey3)
    
    // Update chart with the select city
    updateChart4(category, sliderKey4)
}

// Function that converts numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        city: row.city,
        date: row.date,
        actual_precipitation: +row.actual_precipitation,
        average_precipitation: +row.average_precipitation,
        record_precipitation: +row.record_precipitation
    };
}

// Selects plot1
var svg1 = d3.select('#plot1')

// Selects plot2
var svg2 = d3.select('#plot2')

// Selects plot3
var svg3 = d3.select('#plot3')

// Selects plot4
var svg4 = d3.select('#plot4')

// Hand code the svg dimensions, you can also use +svg.attr('width') or +svg.attr('height')
var svgWidth = +svg1.attr('width');
var svgHeight = +svg1.attr('height');

// Define a padding object to space out the trellis subplots
var padding = {t: 20, r: 20, b: 60, l: 60};

// Compute the dimensions of the trellis plots
trellisWidth = svgWidth - 90;
trellisHeight = svgHeight - 80;

// Create .background rects for the trellis plot1
svg1.selectAll('.background')
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

barBackground1 = svg1.selectAll('.xygrid')
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

// Create .background rects for the trellis plot2
svg2.selectAll('.background')
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

barBackground2 = svg2.selectAll('.xygrid')
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

// Create .background rects for the trellis plot3
svg3.selectAll('.background')
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

barBackground3 = svg3.selectAll('.xygrid')
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

// Create .background rects for the trellis plot4
svg4.selectAll('.background')
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

barBackground4 = svg4.selectAll('.xygrid')
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

// Create a group element for appending chart elements for plot1
var chartG1 = svg1.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Create a group element for appending chart elements for plot2
var chartG2 = svg2.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Create a group element for appending chart elements for plot3
var chartG3 = svg3.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Create a group element for appending chart elements for plot4
var chartG4 = svg4.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// Set date and precipitation domain
var parseDate = d3.timeParse('%b %Y');
var dateDomain = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
var precipDomain = [0, 16];

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

    // Filter data by city for plot1
    filteredCity1 = nested.filter(function(d) {
        return d.key === "CLT";
    })

    // Append trellis groupings for plot1
    trellisG1 = svg1.selectAll('.trellis')
        .data(filteredCity1)
        .enter()
        .append('g')
        .attr('class', 'trelis')
        .attr('transform', 'translate('+[padding.l, padding.t]+')');

    // Filter data by city for plot2
    filteredCity2 = nested.filter(function(d) {
        return d.key === "CQT";
    })

    // Append trellis groupings for plot2
    trellisG2 = svg2.selectAll('.trellis')
        .data(filteredCity2)
        .enter()
        .append('g')
        .attr('class', 'trelis')
        .attr('transform', 'translate('+[padding.l, padding.t]+')');

    // Filter data by city for plot3
    filteredCity3 = nested.filter(function(d) {
        return d.key === "MDW";
    })

    // Append trellis groupings for plot3
    trellisG3 = svg3.selectAll('.trellis')
        .data(filteredCity3)
        .enter()
        .append('g')
        .attr('class', 'trelis')
        .attr('transform', 'translate('+[padding.l, padding.t]+')');

    // Filter data by city for plot4
    filteredCity4 = nested.filter(function(d) {
        return d.key === "PHX";
    })

    // Append trellis groupings for plot4
    trellisG4 = svg4.selectAll('.trellis')
        .data(filteredCity4)
        .enter()
        .append('g')
        .attr('class', 'trelis')
        .attr('transform', 'translate('+[padding.l, padding.t]+')');

    // Create scales for our bar chart
    xScale = d3.scaleBand().domain(dateDomain).range([0,trellisWidth]);
    yScale = d3.scaleLinear().domain(precipDomain).range([trellisHeight,0]);

    // Add color
    colorScale = d3.scaleOrdinal(d3.schemePaired).domain(nested.map(function(d) {
        return d.key;
    }))

    // Create axis
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    
    trellisG1.append('g').call(xAxis).attr('class', 'x axis').attr('transform', 'translate(' + [0, trellisHeight] + ')')
    trellisG1.append('g').call(yAxis).attr('class', 'y axis')

    trellisG2.append('g').call(xAxis).attr('class', 'x axis').attr('transform', 'translate(' + [0, trellisHeight] + ')')
    trellisG2.append('g').call(yAxis).attr('class', 'y axis')

    trellisG3.append('g').call(xAxis).attr('class', 'x axis').attr('transform', 'translate(' + [0, trellisHeight] + ')')
    trellisG3.append('g').call(yAxis).attr('class', 'y axis')

    trellisG4.append('g').call(xAxis).attr('class', 'x axis').attr('transform', 'translate(' + [0, trellisHeight] + ')')
    trellisG4.append('g').call(yAxis).attr('class', 'y axis')

    // Add grids for plots
    var xGrid = d3.axisTop(xScale)
        .tickSize(-trellisHeight, 0, 0)
        .tickFormat('');

    barBackground1.append('g')
        .attr('class', 'x grid')
        .call(xGrid)

    barBackground2.append('g')
        .attr('class', 'x grid')
        .call(xGrid)

    barBackground3.append('g')
        .attr('class', 'x grid')
        .call(xGrid)

    barBackground4.append('g')
        .attr('class', 'x grid')
        .call(xGrid)

    var yGrid = d3.axisLeft(yScale)
        .tickSize(-trellisWidth, 0, 0)
        .tickFormat('')

    barBackground1.append('g')
        .attr('class', 'y grid')
        .call(yGrid)

    barBackground2.append('g')
        .attr('class', 'y grid')
        .call(yGrid)

    barBackground3.append('g')
        .attr('class', 'y grid')
        .call(yGrid)

    barBackground4.append('g')
        .attr('class', 'y grid')
        .call(yGrid)

    // Label the axes
    trellisG1.append('text')
        .attr('class', 'x axis-label')
        .attr('transform', "translate(" + (trellisWidth / 2) + "," + (trellisHeight + 34) + ")")
        .text("Date (by Month)")

    trellisG1.append('text')
        .attr('class', 'y axis-label')
        .attr('transform', "translate(" + (-30) + "," + (trellisHeight / 2) + ") rotate(270)")
        .text("Average Precipitation (in)")

    trellisG2.append('text')
        .attr('class', 'x axis-label')
        .attr('transform', "translate(" + (trellisWidth / 2) + "," + (trellisHeight + 34) + ")")
        .text("Date (by Month)")

    trellisG2.append('text')
        .attr('class', 'y axis-label')
        .attr('transform', "translate(" + (-30) + "," + (trellisHeight / 2) + ") rotate(270)")
        .text("Average Precipitation (in)")

    trellisG3.append('text')
        .attr('class', 'x axis-label')
        .attr('transform', "translate(" + (trellisWidth / 2) + "," + (trellisHeight + 34) + ")")
        .text("Date (by Month)")

    trellisG3.append('text')
        .attr('class', 'y axis-label')
        .attr('transform', "translate(" + (-30) + "," + (trellisHeight / 2) + ") rotate(270)")
        .text("Average Precipitation (in)")

    trellisG4.append('text')
        .attr('class', 'x axis-label')
        .attr('transform', "translate(" + (trellisWidth / 2) + "," + (trellisHeight + 34) + ")")
        .text("Date (by Month)")

    trellisG4.append('text')
        .attr('class', 'y axis-label')
        .attr('transform', "translate(" + (-30) + "," + (trellisHeight / 2) + ") rotate(270)")
        .text("Average Precipitation (in)")

    // Update the chart for all letters to initialize
    updateChart1("CLT", 0);
    updateChart2("CQT", 0);
    updateChart3("MDW", 0);
    updateChart4("PHX", 0);
})

// Function to update plot1
function updateChart1(categoryKey, sliderValue) {

    // Global variables
    cityKey1 = categoryKey
    sliderKey1 = sliderValue

    // Remove old '.bar1 rect' elements
    d3.selectAll("svg .bar1").remove()

    // Remove old '.actual-bar rect' elements
    d3.selectAll("svg .actual-bar1").remove()

    // Remove old 'cityLabel' elements
    d3.selectAll('svg .city-label1').remove()

    // Append city labels
    var cityLabel = trellisG1.append('text')
        .attr('class', 'city-label1')
        .attr('transform', "translate(" + (trellisWidth-355) + "," + (trellisHeight+45) + ")")
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .text(categoryKey)

    var filteredCityData = nested.filter(function(d) {
        return d.key === categoryKey;
    })

    var filteredActual = filteredCityData[0].values.map(function(d) {
        return Object.assign({}, d, {
            actual_precipitation: d.actual_precipitation > sliderValue ? 0 : d.actual_precipitation
        });
    });

    var filteredWeather = [{key: categoryKey, values: filteredCityData[0].values, actual: filteredActual}]

    filteredActual = filteredCityData[0].values.slice();

    // Initialize tooltip
    var tip1a = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + "</span> in.</strong>";
        })

    var tip1b = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + 
            "</span> in.</strong> <br> Actual Rainfall: <strong><span>"
            + d.actual_precipitation + "</span> in.</strong>";
        })

    // Invoke the tip in the context of your visualization
    svg1.call(tip1a)
    svg1.call(tip1b)

    // Create the bar chart
    var bars = chartG1.selectAll('.bar1.rect')
        .data(filteredWeather[0].values, function(d) { //key function
            return d.date
        })

    // Append new bars
    var barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar1')

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
        .attr('fill', '#778899')
        .on('mouseover', tip1a.show)
        .on('mouseout', tip1a.hide)

    bars.exit().remove()

    // Create the bar chart for filteredActual data
    var actualBars = chartG1.selectAll('.actual-bar1')
        .data(filteredWeather[0].actual, function(d) { // key function
            return d.date;
        });

    // Append new bars
    var actualBarsEnter = actualBars.enter()
        .append('g')
        .attr('class', 'actual-bar1');

    actualBarsEnter.merge(actualBars)
        .attr('transform', function(d, i) {
            return 'translate(' + [(barBand + 10) * i + 5, 0] + ')';
        });

    actualBarsEnter.append('rect')
        .attr('x', function(d) {return xScale(d.date); })
        .attr('y', function(d) {return yScale(d.actual_precipitation); })
        .attr('width', barBand)
        .attr('height', function(d) { 
            return chartHeight - yScale(d.actual_precipitation); 
        })
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .on('mouseover', tip1b.show)
        .on('mouseout', tip1b.hide)

    actualBars.exit().remove();
}

// Function to update plot2
function updateChart2(categoryKey, sliderValue) {

    // Global variables
    cityKey2 = categoryKey
    sliderKey2 = sliderValue

    // Remove old '.bar2 rect' elements
    d3.selectAll("svg .bar2").remove()

    // Remove old '.actual-bar rect' elements
    d3.selectAll("svg .actual-bar2").remove()

    // Remove old 'cityLabel' elements
    d3.selectAll('svg .city-label2').remove()

    // Append city labels
    var cityLabel = trellisG2.append('text')
        .attr('class', 'city-label2')
        .attr('transform', "translate(" + (trellisWidth-355) + "," + (trellisHeight+45) + ")")
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .text(categoryKey)

    var filteredCityData = nested.filter(function(d) {
        return d.key === categoryKey;
    })

    var filteredActual = filteredCityData[0].values.map(function(d) {
        return Object.assign({}, d, {
            actual_precipitation: d.actual_precipitation > sliderValue ? 0 : d.actual_precipitation
        });
    });

    var filteredWeather = [{key: categoryKey, values: filteredCityData[0].values, actual: filteredActual}]

    filteredActual = filteredCityData[0].values.slice();

    // Initialize tooltip
    var tip2a = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + "</span> in.</strong>";
        })

    var tip2b = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + 
            "</span> in.</strong> <br> Actual Rainfall: <strong><span>"
            + d.actual_precipitation + "</span> in.</strong>";
        })

    // Invoke the tip in the context of your visualization
    svg2.call(tip2a)
    svg2.call(tip2b)

    // Create the bar chart
    var bars = chartG2.selectAll('.bar2.rect')
        .data(filteredWeather[0].values, function(d) { //key function
            return d.date
        })

    // Append new bars
    var barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar2')

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
        .attr('fill', '#778899')
        .on('mouseover', tip2a.show)
        .on('mouseout', tip2a.hide)

    bars.exit().remove()

    // Create the bar chart for filteredActual data
    var actualBars = chartG2.selectAll('.actual-bar2')
        .data(filteredWeather[0].actual, function(d) { // key function
            return d.date;
        });

    // Append new bars
    var actualBarsEnter = actualBars.enter()
        .append('g')
        .attr('class', 'actual-bar2');

    actualBarsEnter.merge(actualBars)
        .attr('transform', function(d, i) {
            return 'translate(' + [(barBand + 10) * i + 5, 0] + ')';
        });

    actualBarsEnter.append('rect')
        .attr('x', function(d) {return xScale(d.date); })
        .attr('y', function(d) {return yScale(d.actual_precipitation); })
        .attr('width', barBand)
        .attr('height', function(d) { 
            return chartHeight - yScale(d.actual_precipitation); 
        })
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .on('mouseover', tip2b.show)
        .on('mouseout', tip2b.hide)

    actualBars.exit().remove();
}

// Function to update plot3
function updateChart3(categoryKey, sliderValue) {

    // Global variables
    cityKey3 = categoryKey
    sliderKey3 = sliderValue

    // Remove old '.bar3 rect' elements
    d3.selectAll("svg .bar3").remove()

    // Remove old '.actual-bar rect' elements
    d3.selectAll("svg .actual-bar3").remove()

    // Remove old 'cityLabel' elements
    d3.selectAll('svg .city-label3').remove()

    // Append city labels
    var cityLabel = trellisG3.append('text')
        .attr('class', 'city-label3')
        .attr('transform', "translate(" + (trellisWidth-355) + "," + (trellisHeight+45) + ")")
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .text(categoryKey)

    var filteredCityData = nested.filter(function(d) {
        return d.key === categoryKey;
    })

    var filteredActual = filteredCityData[0].values.map(function(d) {
        return Object.assign({}, d, {
            actual_precipitation: d.actual_precipitation > sliderValue ? 0 : d.actual_precipitation
        });
    });

    var filteredWeather = [{key: categoryKey, values: filteredCityData[0].values, actual: filteredActual}]

    filteredActual = filteredCityData[0].values.slice();

    // Initialize tooltip
    var tip3a = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + "</span> in.</strong>";
        })

    var tip3b = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + 
            "</span> in.</strong> <br> Actual Rainfall: <strong><span>"
            + d.actual_precipitation + "</span> in.</strong>";
        })

    // Invoke the tip in the context of your visualization
    svg1.call(tip3a)
    svg1.call(tip3b)

    // Create the bar chart
    var bars = chartG3.selectAll('.bar3.rect')
        .data(filteredWeather[0].values, function(d) { //key function
            return d.date
        })

    // Append new bars
    var barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar3')

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
        .attr('fill', '#778899')
        .on('mouseover', tip3a.show)
        .on('mouseout', tip3a.hide)

    bars.exit().remove()

    // Create the bar chart for filteredActual data
    var actualBars = chartG3.selectAll('.actual-bar3')
        .data(filteredWeather[0].actual, function(d) { // key function
            return d.date;
        });

    // Append new bars
    var actualBarsEnter = actualBars.enter()
        .append('g')
        .attr('class', 'actual-bar3');

    actualBarsEnter.merge(actualBars)
        .attr('transform', function(d, i) {
            return 'translate(' + [(barBand + 10) * i + 5, 0] + ')';
        });

    actualBarsEnter.append('rect')
        .attr('x', function(d) {return xScale(d.date); })
        .attr('y', function(d) {return yScale(d.actual_precipitation); })
        .attr('width', barBand)
        .attr('height', function(d) { 
            return chartHeight - yScale(d.actual_precipitation); 
        })
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .on('mouseover', tip3b.show)
        .on('mouseout', tip3b.hide)

    actualBars.exit().remove();
}

// Function to update plot4
function updateChart4(categoryKey, sliderValue) {

    // Global variables
    cityKey4 = categoryKey
    sliderKey4 = sliderValue

    // Remove old '.bar4 rect' elements
    d3.selectAll("svg .bar4").remove()

    // Remove old '.actual-bar rect' elements
    d3.selectAll("svg .actual-bar4").remove()

    // Remove old 'cityLabel' elements
    d3.selectAll('svg .city-label4').remove()

    // Append city labels
    var cityLabel = trellisG4.append('text')
        .attr('class', 'city-label4')
        .attr('transform', "translate(" + (trellisWidth-355) + "," + (trellisHeight+45) + ")")
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .text(categoryKey)

    var filteredCityData = nested.filter(function(d) {
        return d.key === categoryKey;
    })

    var filteredActual = filteredCityData[0].values.map(function(d) {
        return Object.assign({}, d, {
            actual_precipitation: d.actual_precipitation > sliderValue ? 0 : d.actual_precipitation
        });
    });

    var filteredWeather = [{key: categoryKey, values: filteredCityData[0].values, actual: filteredActual}]

    filteredActual = filteredCityData[0].values.slice();

    // Initialize tooltip
    var tip4a = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + "</span> in.</strong>";
        })

    var tip4b = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "Record Rainfall: <strong><span>" + d.average_precipitation + 
            "</span> in.</strong> <br> Actual Rainfall: <strong><span>"
            + d.actual_precipitation + "</span> in.</strong>";
        })

    // Invoke the tip in the context of your visualization
    svg4.call(tip4a)
    svg4.call(tip4b)

    // Create the bar chart
    var bars = chartG4.selectAll('.bar4.rect')
        .data(filteredWeather[0].values, function(d) { //key function
            return d.date
        })

    // Append new bars
    var barsEnter = bars.enter()
        .append('g')
        .attr('class', 'bar4')

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
        .attr('fill', '#778899')
        .on('mouseover', tip4a.show)
        .on('mouseout', tip4a.hide)

    bars.exit().remove()

    // Create the bar chart for filteredActual data
    var actualBars = chartG4.selectAll('.actual-bar4')
        .data(filteredWeather[0].actual, function(d) { // key function
            return d.date;
        });

    // Append new bars
    var actualBarsEnter = actualBars.enter()
        .append('g')
        .attr('class', 'actual-bar4');

    actualBarsEnter.merge(actualBars)
        .attr('transform', function(d, i) {
            return 'translate(' + [(barBand + 10) * i + 5, 0] + ')';
        });

    actualBarsEnter.append('rect')
        .attr('x', function(d) {return xScale(d.date); })
        .attr('y', function(d) {return yScale(d.actual_precipitation); })
        .attr('width', barBand)
        .attr('height', function(d) { 
            return chartHeight - yScale(d.actual_precipitation); 
        })
        .attr('fill', function(d) {
            return colorScale(categoryKey)
        })
        .on('mouseover', tip4b.show)
        .on('mouseout', tip4b.hide)

    actualBars.exit().remove();
}

// Add slider functionality
d3.select("#mySlider").on("input", function() {
    selectedValue = this.value;
    
    updateChart1(cityKey1, selectedValue);
    updateChart2(cityKey2, selectedValue);
    updateChart3(cityKey3, selectedValue);
    updateChart4(cityKey4, selectedValue);

    // Update slider value text
    var sliderValueText = d3.select('#sliderValue');
    var percentText = selectedValue;
    sliderValueText.text('Actual Precipitation < ' + percentText + " in.");
})

// Remember code outside of the data callback function will run before the data loads