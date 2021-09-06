mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaXNtYSIsImEiOiJja3Q3eTR6YTQweDNiMnZwZGM5cndqbHk1In0.fHYQU0xHlOwsbVH_lcFiIw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-19.9275366,-43.9561496], // starting position
        zoom:2.5 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
 
