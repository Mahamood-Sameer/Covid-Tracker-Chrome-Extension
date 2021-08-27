fetch('https://disease.sh/v3/covid-19/all').then((responce) => {
    return responce.json()
}).then((data) => {
    console.log(data)
    var container = document.querySelector('.cards_container')
    container.innerHTML =
        `
    <div class="card">
    <h3>Cases</h3>
    <br>
    <p>${data.cases}</p>
    </div>
    <div class="card">
    <h3>Active</h3>
    <br>
    <p>${data.active}</p>
    </div>
    <div class="card">
    <h3>Deaths</h3>
    <br>
    <p>${data.deaths}</p>
    </div>
    <div class="card">
    <h3>Recovered</h3>
    <br>
    <p>${data.recovered}</p>
    </div>
    `

})


// For countries 

fetch('https://disease.sh/v3/covid-19/countries').then((responce) => {
    return responce.json()
}).then((countries) => {
    console.log(countries)

    // Map 

    mapboxgl.accessToken = 'pk.eyJ1IjoibXVubmEyMiIsImEiOiJja3NyNWgyOXMwamw3MnF0ZnBtcDZrdmdlIn0.BZi2LYUpNXfNzF84rF6-_g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [0, 0],
        zoom: 7
    });


    document.getElementById('Submit').addEventListener('click', (e) => {
        e.preventDefault()
        var Country = document.querySelector('select')
        var lat, long;
        countries.forEach((country) => {
            if (country.country === Country.value) {
                console.log(country.country)
                lat = country.countryInfo.lat
                long = country.countryInfo.long

                map.flyTo({
                    center: [long,lat],
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                    });
            }
        })
    })

    countries.forEach((country) => {

        document.getElementById("SearchCountry").innerHTML += `<option value=${country.country}>${country.country}</option>`

        var lat, long
        lat = country.countryInfo.lat
        long = country.countryInfo.long
        var color;
        color = (country.cases) / 5000
        var color_green
        if (color >= 30000) {
            color_green = 0
        }
        else {
            color_green = 40
        }


        //Table for each country

        var Table = document.querySelector("table")
        
        Table.innerHTML +=`
                    <tr>
                        <td>${country.country}</td>
                        <td>${country.cases}</td>
                        <td>${country.active}</td>
                        <td>${country.deaths}</td>
                        <td>${country.recovered}</td>
                    </tr>
        
        `
        
        

        // Popup on click


        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(

            `<div class="popups">
             <strong>Country : </strong>${country.country}
             <br>
             <strong>Cases : </strong>${country.cases}
             <br>
             <strong>Active : </strong>${country.active}
             <br>
             <strong>Deaths : </strong>${country.deaths}
             <br>
             <strong>Recovered : </strong>${country.recovered}
             </div>
            `
        );

        const marker = new mapboxgl.Marker({
            color: `rgb(${color},${color_green},15)`,
            draggable: false
        })
            .setLngLat([long, lat])
            .setPopup(popup)
            .addTo(map);
    });

})