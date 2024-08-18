const updateProfile = (params) => {
    console.log(params);
}

liff.init({
    liffId: "2006072569-DYNRWJaX",
    withLoginOnExternalBrowser: true,
}).then(() => {
    liff.getProfile().then(profile => {
        const userId = profile.userId;
        const displayName = profile.displayName;
        const pictureUrl = profile.pictureUrl;
        document.getElementById('login').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('pictureUrl').src = pictureUrl;
        document.getElementById('userid').value = userId;

        fetch('/checkdam/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: userId,
                username: displayName
            })
        }).then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('ok');
                } else {
                    console.error('Error:', data.error);
                }
            }).catch(
                err => console.error(err)
            );
    }).catch(
        err => console.error(err)
    );
});

document.getElementById('login').style.display = 'block';
document.getElementById('logout').style.display = 'none';

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

const openModal = async () => {
    var myModal = new bootstrap.Modal(document.getElementById('inputModal'), {
        keyboard: false
    });
    myModal.show();
}

const openToast = () => {
    var toast = new bootstrap.Toast(document.getElementById('myToast'));
    toast.show();

    setTimeout(function () {
        toast.hide();
    }, 3000);
}

const onLocationFound = (e) => {
    removeMarker();
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lng').value = e.latlng.lng;
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
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lng').value = e.latlng.lng;
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('checkDamForm');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const lat = document.getElementById('lat').value;
        const lng = document.getElementById('lng').value;
        formData.append('lat', lat);
        formData.append('lng', lng);

        try {
            const response = await fetch('/checkdam/api/submitform', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            var modal = bootstrap.Modal.getInstance(document.getElementById('inputModal'));
            modal.hide();
            form.reset();
            openToast();
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

document.getElementById('search').addEventListener('input', function () {
    const searchText = this.value.trim().toLowerCase();
    const searchDropdown = document.getElementById('searchDropdown');

    if (searchText) {
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(searchText)}&format=json`)
            .then(response => response.json())
            .then(data => {
                searchDropdown.innerHTML = '';

                if (data.length > 0) {
                    data.forEach(result => {
                        const a = document.createElement('a');
                        a.classList.add('dropdown-item');
                        a.href = "#";
                        a.innerText = result.display_name;
                        a.addEventListener('click', function (e) {
                            e.preventDefault();
                            const latlng = L.latLng(result.lat, result.lon);
                            map.setView(latlng, 14);
                            searchDropdown.style.display = 'none';

                            lc.stop();
                            removeMarker();
                            document.getElementById('lat').value = latlng.lat;
                            document.getElementById('lng').value = latlng.lng;
                            L.marker(latlng, { name: 'marker' })
                                .addTo(map)
                                .bindPopup(`ตำแหน่งที่ค้นหา
                                            <br>พิกัด: ${(latlng.lat).toFixed(4)}, ${(latlng.lng).toFixed(4)}
                                            <br><button class="btn btn-info" onclick="openModal()">เพิ่มข้อมูลให้ตำแหน่งนี้</button>`)
                                .openPopup();;
                        });
                        searchDropdown.appendChild(a);
                    });
                    searchDropdown.style.display = 'block';
                } else {
                    searchDropdown.innerHTML = '<a class="dropdown-item">ไม่พบข้อมูล</a>';
                    searchDropdown.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    } else {
        searchDropdown.innerHTML = '';
        searchDropdown.style.display = 'none';
    }
});

document.getElementById('clearSearch').addEventListener('click', function () {
    document.getElementById('search').value = '';
    const searchDropdown = document.getElementById('searchDropdown');
    searchDropdown.innerHTML = '';
    searchDropdown.style.display = 'none';
});

document.getElementById('cddate').valueAsDate = new Date();
