
const map = L.map('map').setView([19.01056856174532, 99.0359886593147], 13);

const gmap_road = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const gmap_sat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const gmap_terrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 22,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const gmap_hybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 22,
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

const redIcon = L.icon({
    iconUrl: './../assets/pin_red.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const removeMarker = () => {
    map.eachLayer((layer) => {
        if (layer.options.name === 'marker') {
            map.removeLayer(layer);
        }
    });
}

const openToast = () => {
    var toast = new bootstrap.Toast(document.getElementById('myToast'));
    toast.show();

    setTimeout(function () {
        toast.hide();

    }, 3000);
}

const onMapClick = (e) => {
    removeMarker();
    document.getElementById('lat').value = e.latlng.lat;
    document.getElementById('lng').value = e.latlng.lng;
    L.marker(e.latlng, { name: 'marker', icon: redIcon })
        .addTo(map)
        .bindPopup(`ตำแหน่งที่เลือก
            <br>พิกัด: ${(e.latlng.lat).toFixed(4)}, ${(e.latlng.lng).toFixed(4)}`)
        .openPopup();

    map.setView([e.latlng.lat, e.latlng.lng]);
}

map.on('click', onMapClick);

const updateMarker = () => {
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

const showImages = (userid, cdimage) => {
    try {
        fetch(`/checkdam/api/getimages/${userid}/${cdimage}`)
            .then(response => response.json())
            .then(data => {
                const images = data.data;
                if (images.length === 0) {
                    return;
                }
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = '';
                images.forEach(image => {
                    const img = image.pathimage ? image.pathimage : 'uploads/placeholder-image.png';
                    imageContainer.innerHTML += `<img src="/checkdam/${img}" alt="ภาพฝาย" class="rounded img-fluid mx-auto mb-1">`;
                });
            });

    } catch (error) {
        console.error('Error getting images:', error);
    }
}

const displayMarkers = (data) => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    data.forEach(item => {
        const marker = L.marker([item.lat, item.lng], { name: 'marker', icon: redIcon }).addTo(map);
        marker.bindPopup(`<b>${item.cdname}</b><br>${item.cddetail}`).openPopup();

        map.setView([item.lat, item.lng], 13);

        document.getElementById('lat').value = item.lat;
        document.getElementById('lng').value = item.lng;
        document.getElementById('userid').value = item.userid;
        document.getElementById('cdimage').value = item.cdimage;

        document.getElementById('cdname').value = `${item.cdname}`;
        document.getElementById('cdcreator').value = `${item.cdcreator}`;
        document.getElementById('cdtype').value = `${item.cdtype}`;
        document.getElementById('cddetail').value = `${item.cddetail}`;

        const thaiDate = new Date(item.cddate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const thaiDateString = thaiDate.toLocaleDateString('th-TH', options);
        const buddhistYear = thaiDate.getFullYear() + 543;
        const formattedThaiDate = thaiDateString.replace(thaiDate.getFullYear(), buddhistYear);
        document.getElementById('cddate').value = formattedThaiDate;

        showImages(item.userid, item.cdimage);
    });
};

const getCheckdams = async (id, userid) => {
    try {
        const response = await fetch(`/checkdam/api/getcheckdam_by_id/${id}/${userid}`);
        const data = await response.json();

        if (data.success) {
            displayMarkers([data.data]);
        } else {
            console.error('Error getting checkdam:', data.error);
        }
    } catch (error) {
        console.error('Error getting checkdam:', error);
    }
}

const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    const cdimage = document.getElementById('cdimage').value;
    const userid = document.getElementById('userid').value;
    formData.append('cdimage', cdimage);
    formData.append('userid', userid);
    formData.append('image', file);

    try {
        const response = await fetch('/checkdam/api/submitimage', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Upload success:', result);

        if (result.success) {
            showImages(userid, cdimage);
            document.getElementById('imageUpload').value = '';
        }
    } catch (error) {
        console.error('Upload error:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const userid = urlParams.get('userid');
    if (id && userid) {
        getCheckdams(id, userid);
    }

    const form = document.getElementById('checkDamForm');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const lat = document.getElementById('lat').value;
        const lng = document.getElementById('lng').value;
        formData.append('lat', lat);
        formData.append('lng', lng);

        try {
            const response = await fetch('/checkdam/api/updatecheckdam/' + id, {
                method: 'PUT',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // form.reset();
            openToast();
        } catch (error) {
            console.error('Error:', error);
        }
    });

});
