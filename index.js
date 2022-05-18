// - - - - - Data for apartments - - - - -

const apartment_data = [
    {
        distance: "1.2 km",
        sticker: "FOR RENT",
        location: "Knightsbridge",
        price: "$2,500",
        name: "Apartment London",
        description: "Beautiful huge 1 family house in heart of Westbury newly renovated with new furniture",
        bedrooms: 2,
        bathrooms: 2,
        squareFt: 1776,
        agent_profile: "./src/media/agents/christina-wocintechchat-com-SJvDxw0azqw-unsplash.jpg",
        apt_image: "src/media/apts/apt1.jpg"
    },
    {
        distance: "20 km",
        sticker: "FOR SELL",
        location: "Belmont Gardens, Chicago",
        price: "$30000",
        name: "Studio Apartment",
        description: "Beautiful huge 1 family house in heart of Westbury newly renovated with new furniture",
        bedrooms: 3,
        bathrooms: 2,
        squareFt: 2500,
        agent_profile: "./src/media/agents/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg",
        apt_image: "src/media/apts/apt2.jpg"
    },
    {
        distance: "5.6 km",
        sticker: "FOR RENT",
        location: "Timber Yard, Birmingham City Center, B5",
        price: "$379,000",
        name: "Galliard Homes Apartment",
        description: "This fabulous two bedroom duplex apartment will be close to some of the best local haunts and venues the city has to offer",
        bedrooms: 2,
        bathrooms: 1,
        squareFt: 1041,
        agent_profile: "./src/media/agents/clayton-mpDV4xaFP8c-unsplash.jpg",
        apt_image: "src/media/apts/apt3.jpg"
    }
];

// - - - - - Data for the chart - - - - - 

let chart_data = {

    bars: [
        { x: 1, y: 0, label: "Jan."},
        { x: 2, y: 0,  label: "Feb."},
        { x: 3, y: 0,  label: "Mar."},
        { x: 4, y: 0,  label: "Apr."},
        { x: 5, y: 0,  label: "May"},
        { x: 6, y: 0, label: "Jun."},
        { x: 7, y: 0,  label: "Jul."},
        { x: 8, y: 0,  label: "Aug."},
        { x: 9, y: 0,  label: "Sep."},
        { x: 10, y: 0,  label: "Oct."},
        { x: 11, y: 0,  label: "Nov."},
        { x: 12, y: 0,  label: "Dec."}
    ],
    pie: [
        {y: 0, name: "Data1"},
        {y: 0, name: "Data2"},
        {y: 0, name: "Data3"}
    ],
};

// - - - - - Function to render the charts - - - - - 

function ChartRender(){
    CanvasJS.addColorSet("blues", [
        "#186AA5",
        "#0FA8E2",
        "#98E3FE"
    ]);

    let chart1 = new CanvasJS.Chart("rates1",
	{
        colorSet: "blues",
        legend:{
            fontSize: 16,
            fontFamily: "Noto Sans KR",
            fontColor: "#186AA5",
            horizontalAlign: "left",
            verticalAlign: "center"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendMarkerType: "square",
            indexLabel: " ",
            legendText: "{name}",
            indexLabelPlacement: "inside",
            dataPoints: chart_data.pie
        }]
    });

	chart1.render();

    let chart2 = new CanvasJS.Chart("rates2",
	{
        axisY: {
            lineColor: "transparent",
            tickColor: "transparent",
            gridDashType: "dot",
            gridColor: "#186AA5",
            labelFontFamily: "Noto Sans KR",
            labelFontSize: 16,
            labelFontColor: "#186AA5"
        },
        axisX:{
            tickColor: "transparent",
            lineColor: "#186AA5",
            lineDashType: "dot",
            labelFontFamily: "Noto Sans KR",
            labelFontSize: 16,
            labelFontColor: "#186AA5"
        },
        dataPointMaxWidth: 20,
        data: [{
            color: "#186AA5",
            dataPoints: chart_data.bars,
            radius: 5
        }]
    });
	chart2.render();
};

// - - - - - Function to Randomize data locally - - - - - 

function Randomize(){
    Object.values(chart_data).forEach( value => {
        value.forEach( data =>  data.y = Math.floor(Math.random() * 51))
    });

    ChartRender();
};

// - - - - - General function to be used after receiving data from the API & the server - - - - - 

function receivedData(data){

    Object.entries(data)
          .forEach( ([data_key1, data_value1]) => {                                      // First we iterate over both objects -- received data first

        for ( let [chart_key1, chart_value1] of Object.entries(chart_data) ){            // then chart_data object
    
            if(data_key1 == chart_key1){                                                 // we make sure their keys match

                Object.entries(data_value1)
                      .forEach(([data_key2, data_value2]) => {                           // If match we go level deeper and iterate over both keys' values -- received data first

                    chart_value1.forEach( item => {                                      // then chart_data object

                        if(item.label == data_key2 || item.name == data_key2){           // We make sure their properties' match

                            item.y = data_value2                                         // If match, we assign the received data's values to chart_data values
                        }
                    })
                })
            }
        }
    })
}

// - - - - - Function for the Ajax POST call - - - - - 

function AjaxPOST(){

    $.post("https://cors-anywhere.herokuapp.com/https://api.demoleap.com/exercise", (response) => {
        receivedData(response);
        ChartRender();
    })
};

// - - - - - Function to get data from the Express server - - - - - 

function serverData(){
    $.get("http://localhost:3000/", (data) => {
        receivedData(data);
        ChartRender();
    })
}

// - - - - - On Load event - - - - - 

window.addEventListener("load", () => {

    // - - - - - Rendering the apartment tiles  - - - - - 

    let el = document.getElementById("apartments");

    el.innerHTML = apartment_data.map( apt => 
        `
        <div class="apt-tile">
            <div class="apt-background" style="background-image: url(${apt.apt_image})">
                <span class="distance">${apt.distance} away</span>
                <span class="sticker">${apt.sticker}</span>
                <div class="agent-profile" style="background-image: url(${apt.agent_profile})"></div>
            </div>

            <div class="apt-info">
                <p class="location"><img src="./src/media/icons/map-marker.svg" id="map-marker"/> ${apt.location}</p>
                <p class="price">${apt.price}</p>
                <h3>${apt.name}</h3>
                <p class="desc">${apt.description}</p>
            </div>

            <div class="bullet-points">
                <div class="main-points">

                    <div>
                        <p class="numbers"> ${apt.bedrooms} 
                            <img src="./src/media/icons/bed.svg" alt="bed-icon"/>
                        </p>
                        <p class="num-desc">Bedrooms</p>
                    </div>

                    <div>
                        <p class="numbers"> ${apt.bathrooms} 
                            <img src="./src/media/icons/bathtub.svg" alt="bath-icon"/>
                        </p>
                        <p class="num-desc">Bathrooms</p>
                    </div>

                    <div>
                        <p class="numbers"> ${apt.squareFt} 
                            <img src="./src/media/icons/squareft.svg" alt="ft-icon"/>
                        </p>
                        <p class="num-desc">Square Ft</p>
                    </div>

                </div>

                <div class="buttons">
                    <div class="button-icons">
                        <img src="./src/media/icons/fullscreen-exit.svg" alt="fullscreen-exit-icon"/>
                    </div>
                    <div class="button-icons special">
                        <img src="./src/media/icons/heart.svg" alt="fullscreen-exit-icon"/>
                    </div>
                    <div class="button-icons">
                        <img src="./src/media/icons/plus-circle.svg" alt="fullscreen-exit-icon"/>
                    </div>
                </div>
            </div>
        </div>
        `
    ).join("");

    // - - - - - Rendering the chart data - - - - - 

    Randomize();
});

// Adding the event listeners to buttons for the charts
    
        // First the Graph / Pie buttons + toggling classes
        $(".chart-btn").on("click", function(){

            if($(this).hasClass("graph")){
                $(this).addClass("chart-active");
                $(".pie").removeClass("chart-active");
                $("#rates2").removeClass("hidden");
                $("#rates1").addClass("hidden");
            } else {
                $(".graph").removeClass("chart-active");
                $(this).addClass("chart-active");
                $("#rates1").removeClass("hidden");
                $("#rates2").addClass("hidden");
            }

            ChartRender();
        })

        // Then the data buttons
        $("#randomize").on("click", Randomize);
        $("#ajaxpost").on("click", AjaxPOST);
        $("#serverdata").on("click", serverData);
