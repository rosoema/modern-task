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
            fontColor: "#186AA5",
            horizontalAlign: "left",
            verticalAlign: "center",
            markerMargin: 3
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

// - - - - - Function for the Ajax POST call - - - - - 

function AjaxPOST(){
    $.ajax({
        type: "POST",
        url: "https://api.demoleap.com/exercise",
        success: (response) => {

            Object.entries(response).forEach(([key, value]) => {
                for(let [key1, value1] of Object.entries(chart_data)){
                    if(key == key1){
                        Object.entries(value).forEach(([key3, value3]) => {
                            value1.forEach(item => {
                                if(item.label == key3 || item.name == key3){
                                    item.y = value3
                                }
                            })
                        })
                    }
                }
            })

            ChartRender();
        }
    });
}

// - - - - - On Load event - - - - - 

window.onload = () => {

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

    document.getElementById("rates1").style.visibility = "hidden";
    document.getElementById("rates1").style.height = "0";

};

// - - - - - Toggle the chart display and the button style on the button click - - - - -

function chartToggle(btn){
    if(btn.classList.contains("graph")){
        document.getElementById("rates2").style.visibility = "";
        document.getElementById("rates2").style.height = "";
        document.getElementById("rates1").style.visibility = "hidden";
        document.getElementById("rates1").style.height = "0";
        btn.style.cssText = "color: #2289FF; text-decoration: underline; font-weight: bold;";
        document.getElementById("pie-btn").style.cssText = "color: rgba(0, 0, 0, 0.79); text-decoration: none; font-weight: normal;";
    } else {
        document.getElementById("rates1").style.visibility = "";
        document.getElementById("rates1").style.height = "";
        document.getElementById("rates2").style.visibility = "hidden";
        document.getElementById("rates2").style.height = "0";
        btn.style.cssText = "color: #2289FF; text-decoration: underline; font-weight: bold;";
        document.getElementById("graph-btn").style.cssText = "color: rgba(0, 0, 0, 0.79); text-decoration: none; font-weight: normal;";
    }
};
