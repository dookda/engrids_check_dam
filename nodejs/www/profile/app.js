const updateProfile = (params) => {
    console.log(params);
}

liff.init({
    liffId: "2006072569-5Qb1xK2R",
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

const openToast = () => {
    var toast = new bootstrap.Toast(document.getElementById('myToast'));
    toast.show();

    setTimeout(function () {
        toast.hide();

    }, 3000);
}

const showImages = (userid, cdimage) => {
    try {
        fetch(`/checkdam/api/getimages/${userid}/${cdimage}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
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

const getCheckdams = async (id) => {
    try {
        const response = await fetch(`/checkdam/api/getcheckdam/${id}`);
        const data = await response.json();
        // console.log(data);

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
    if (id) {
        getCheckdams(id);
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
