const map = L.map('map').setView([51.505, -0.09], 13);

const gmap_road = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const gmap_sat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const gmap_terrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const gmap_hybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const baseLayers = {
    "Google Road": gmap_road,
    "Google Satellite": gmap_sat,
    "Google Terrain": gmap_terrain,
    "Google Hybrid": gmap_hybrid.addTo(map)
};

const overlayMaps = {};

L.control.layers(baseLayers, overlayMaps).addTo(map);

var lc = L.control.locate().addTo(map);
lc.start();

const removeMarker = () => {
    map.eachLayer((layer) => {
        if (layer.options.name === 'marker') {
            map.removeLayer(layer);
        }
    });
}

const onLocationError = (e) => {
    alert(e.message);
}

async function openModal() {
    // document.getElementById('gid').value = gid;
    var myModal = new bootstrap.Modal(document.getElementById('inputModal'), {
        keyboard: false
    });
    myModal.show();
}

function openToast() {
    var toast = new bootstrap.Toast(document.getElementById('myToast'));
    toast.show();

    setTimeout(function () {
        toast.hide();
    }, 3000);
}

const onLocationFound = (e) => {
    removeMarker();
    L.marker(e.latlng, { name: 'marker' })
        .addTo(map)
        .bindPopup(`ตำแหน่งของท่าน
            <br>พิกัด: ${(e.latlng.lat).toFixed(4)}, ${(e.latlng.lng).toFixed(4)}
            <br><button class="btn btn-info" onclick="openModal()">เพิ่มข้อมูลให้ตำแหน่งนี้</button>`)
        .openPopup();
}

const onmapClick = (e) => {
    lc.stop();
    removeMarker();
    L.marker(e.latlng, { name: 'marker' })
        .addTo(map)
        .bindPopup(`ตำแหน่งที่เลือก
            <br>พิกัด: ${(e.latlng.lat).toFixed(4)}, ${(e.latlng.lng).toFixed(4)}
            <br><button class="btn btn-info" onclick="openModal()">เพิ่มข้อมูลให้ตำแหน่งนี้</button>`)
        .openPopup();;
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.on('click', onmapClick);

document.getElementById('checkDamForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('/api/submitform', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                openToast();
                this.reset();
            } else {
                alert('There was an error submitting the form: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
});

