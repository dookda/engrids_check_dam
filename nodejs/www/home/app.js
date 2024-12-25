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
    "แผนที่ถนน": gmap_road,
    "แผนที่ภาพดาวเทียม": gmap_sat,
    "แผนที่ภาพดาวเทียมผสม": gmap_hybrid.addTo(map),
    "แผนที่ภูมิประเทศ": gmap_terrain
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

const redIcon = L.icon({
    iconUrl: './../assets/pin_red.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const onLocationFound = (e) => {
    removeMarker();
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lng').value = e.latlng.lng;
    L.marker(e.latlng, { name: 'marker', icon: redIcon })
        .addTo(map)
        .bindPopup(`ตำแหน่งของท่าน
            <br>พิกัด: ${(e.latlng.lat).toFixed(4)}, ${(e.latlng.lng).toFixed(4)}
            <br><button class="btn btn-info" onclick="openModal()">เพิ่มข้อมูลให้ตำแหน่งนี้</button>`)
        .openPopup();
}

const onMapClick = (e) => {
    lc.stop();
    removeMarker();
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lng').value = e.latlng.lng;
    L.marker(e.latlng, { name: 'marker', icon: redIcon })
        .addTo(map)
        .bindPopup(`ตำแหน่งที่เลือก
            <br>พิกัด: ${(e.latlng.lat).toFixed(4)}, ${(e.latlng.lng).toFixed(4)}
            <br><button class="btn btn-info" onclick="openModal()">เพิ่มข้อมูลให้ตำแหน่งนี้</button>`)
        .openPopup();

    map.setView([e.latlng.lat, e.latlng.lng]);
}

const updateMarker = () => {
    lc.stop();
    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    removeMarker();
    L.marker([lat, lng], { name: 'marker', icon: redIcon })
        .addTo(map)
        .bindPopup(`ตำแหน่งที่เลือก
            <br>พิกัด: ${lat}, ${lng}
            <br><button class="btn btn-info" onclick="openModal()">เพิ่มข้อมูลให้ตำแหน่งนี้</button>`)
        .openPopup();

    map.setView([lat, lng], 16);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.on('click', onMapClick);

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

// document.getElementById('cddate').valueAsDate = new Date();
