// const updateProfile = (params) => {
//     console.log(params);
// }

// liff.init({
//     liffId: "2006072569-DYNRWJaX", 
//     withLoginOnExternalBrowser: true, 
// }).then(() => {
//     liff.getProfile().then(profile => {
//         const userId = profile.userId;
//         const displayName = profile.displayName;
//         const pictureUrl = profile.pictureUrl;
//         document.getElementById('login').style.display = 'none';
//         document.getElementById('logout').style.display = 'block';
//         document.getElementById('pictureUrl').src = pictureUrl;
//         document.getElementById('displayName').innerHTML = displayName;
//         document.getElementById('userid').value = userId;

//         fetch('/api/user', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 userid: userId,
//                 username: displayName
//             })
//         }).then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     console.log('ok');
//                 } else {
//                     console.error('Error:', data.error);
//                 }
//             }).catch(
//                 err => console.error(err)
//             );
//     }).catch(
//         err => console.error(err)
//     );
//     console.log('LIFF init success');

// });

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

const showCheckdam = () => {
    fetch('/api/getcheckdam').then(response => response.json())
        .then(data => {
            if (data.success) {
                data.data.forEach(item => {
                    const marker = L.marker([item.lat, item.lng]).addTo(map);
                    marker.bindPopup(`<b>${item.cdname}</b><br>${item.cdcreator}<br>${item.cddetail}`);
                });
            } else {
                console.error('Error:', data.error);
            }
        }).catch(
            err => console.error(err)
        );
}

showCheckdam();