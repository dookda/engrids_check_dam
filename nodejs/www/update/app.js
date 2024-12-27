
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

const showImages = (userid) => {
    try {
        fetch(`/checkdam/api/getimages/${userid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const images = data.data;
                if (images.length === 0) {
                    return;
                }
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = '';
                images.forEach(image => {
                    const img = image ? image : '/checkdam/upload/placeholder-image.png';
                    imageContainer.innerHTML += `<img src="/checkdam/${img}" alt="ภาพฝาย" style="width: 100px; height: 100px;">`;
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

        showImages(item.userid)

        // if (item.cdimage) {
        //     const img = row.cdimage ? row.cdimage : 'dashboard/placeholder-image.png';
        //     document.getElementById('imagePreview') = `<img src="/checkdam/${img}" alt="ภาพฝาย" style="width: 100px; height: 100px;">`;

        // } else {
        //     cdimageElement.style.display = 'none';
        // }

        const checkdamModal = new bootstrap.Modal(document.getElementById('checkdamModal'));
        checkdamModal.show();
    });
};

const getCheckdams = async (id) => {
    try {
        const response = await fetch(`/checkdam/api/getcheckdam/${id}`);
        const data = await response.json();
        console.log(data);

        if (data.success) {
            displayMarkers([data.data]);
        } else {
            console.error('Error getting checkdam:', data.error);
        }
    } catch (error) {
        console.error('Error getting checkdam:', error);
    }
}

// delete checkdam function
const deleteCheckdam = async (id) => {
    try {
        const response = await fetch(`/checkdam/api/deletecheckdam/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
            console.log('Checkdam deleted:', data.data);
            location.reload();
        } else {
            console.error('Error deleting checkdam:', data.error);
        }
    } catch (error) {
        console.error('Error deleting checkdam:', error);
    }
};

// Function to populate the update form with existing data
const setUpdateForm = async (id) => {
    try {
        const response = await fetch(`/checkdam/api/getcheckdam/${id}`);
        const data = await response.json();
        if (data.success) {
            const checkdam = data.data;

            // Populate form fields
            document.getElementById('id').value = checkdam.gid;
            document.getElementById('userid').value = checkdam.userid;
            document.getElementById('cdname').value = checkdam.cdname;
            document.getElementById('cdcreator').value = checkdam.cdcreator;
            document.getElementById('cddetail').value = checkdam.cddetail;
            document.getElementById('cdtype').value = checkdam.cdtype;
            document.getElementById('lat').value = checkdam.lat;
            document.getElementById('lng').value = checkdam.lng;

            // Display existing image if available
            const modalCdimage = document.getElementById('modalCdimage');
            modalCdimage.innerHTML = ''; // Clear previous content
            if (checkdam.cdimage) {
                const imgSrc = `/checkdam/${checkdam.cdimage}`; // Adjust the path as needed
                modalCdimage.innerHTML = `<img src="${imgSrc}" alt="ภาพฝาย" style="height: 300px;">`;
            } else {
                modalCdimage.innerHTML = `<span>ไม่มีภาพ</span>`;
            }

            const updateForm = document.getElementById('updateForm');
            updateForm.removeEventListener('submit', handleUpdateSubmit);
            updateForm.addEventListener('submit', handleUpdateSubmit);
        } else {
            console.error('Error getting checkdam:', data.error);
        }
    } catch (error) {
        console.error('Error getting checkdam:', error);
    }
};

// Handler function for form submission
const handleUpdateSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get the ID from the hidden input
    const id = document.getElementById('id').value;

    // Call the update function
    await updateCheckdam(id);
};

// Function to update the checkdam
const updateCheckdam = async (id) => {
    try {
        // Collect form data
        const userid = document.getElementById('userid').value;
        const cdname = document.getElementById('cdname').value;
        const cdcreator = document.getElementById('cdcreator').value;
        const cddetail = document.getElementById('cddetail').value;
        const cdtype = document.getElementById('cdtype').value;
        const lat = document.getElementById('lat').value;
        const lng = document.getElementById('lng').value;
        const cdimageInput = document.getElementById('cdimage');
        const cdimage = cdimageInput.files[0];

        const formData = new FormData();
        formData.append('userid', userid);
        formData.append('id', id);
        formData.append('cdname', cdname);
        formData.append('cdcreator', cdcreator);
        formData.append('cddetail', cddetail);
        formData.append('cdtype', cdtype);
        formData.append('lat', lat);
        formData.append('lng', lng);
        formData.append('cddate', new Date().toISOString());
        if (cdimage) {
            formData.append('cdimage', cdimage);
        }

        const response = await fetch(`/checkdam/api/updatecheckdam/${id}`, {
            method: 'PUT',
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            console.log('Checkdam updated:', data.data);
            // Optionally, close the modal and refresh the table without reloading the page
            $('#updateModal').modal('hide');
            // Refresh DataTable or update the row manually
            location.reload(); // Simplest way, but can be optimized
        } else {
            console.error('Error updating checkdam:', data.error);
            alert(`Error updating checkdam: ${data.error}`);
        }
    } catch (error) {
        console.error('Error updating checkdam:', error);
        alert(`Error updating checkdam: ${error.message}`);
    }
};

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
        getCheckdams(id);
        setUpdateForm(id);
    }
}
