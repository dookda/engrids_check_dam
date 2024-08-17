
const map = L.map('map').setView([19.01056856174532, 99.0359886593147], 13);

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

let checkdamData = [];
fetch('/checkdam/api/getcheckdam')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            checkdamData = data.data;
            displayMarkers(checkdamData); // Initially display all markers
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(err => console.error(err));

const displayMarkers = (data) => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    data.forEach(item => {
        const marker = L.marker([item.lat, item.lng]).addTo(map);
        marker.on('click', () => {
            document.getElementById('modal-cdname').textContent = `ชื่อฝาย-สถานที่: ${item.cdname}`;
            document.getElementById('modal-cdcreator').textContent = `ผู้สร้าง-ผู้ดูแล: ${item.cdcreator}`;
            document.getElementById('modal-cddetail').textContent = `รายละเอียด: ${item.cddetail}`;

            const thaiDate = new Date(item.cddate);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const thaiDateString = thaiDate.toLocaleDateString('th-TH', options);
            const buddhistYear = thaiDate.getFullYear() + 543;
            const formattedThaiDate = thaiDateString.replace(thaiDate.getFullYear(), buddhistYear);

            document.getElementById('modal-cddate').textContent = `วันที่สร้าง: ${formattedThaiDate}`;
            document.getElementById('modal-cdcoords').textContent = `พิกัด: ${(item.lat).toFixed(4)}, ${(item.lng).toFixed(4)}`;

            const cdimageElement = document.getElementById('modal-cdimage');
            if (item.cdimage) {
                cdimageElement.src = `/checkdam/${item.cdimage}`;
                cdimageElement.style.display = 'block'; // Show the image
            } else {
                cdimageElement.style.display = 'none'; // Hide the image element if there's no image
            }

            const checkdamModal = new bootstrap.Modal(document.getElementById('checkdamModal'));
            checkdamModal.show();
        });
    });
};

document.getElementById('search').addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    const filteredData = checkdamData.filter(item =>
        item.cdname.toLowerCase().includes(searchText) ||
        item.cdcreator.toLowerCase().includes(searchText) ||
        item.cddetail.toLowerCase().includes(searchText)
    );

    displayMarkers(filteredData);
});

