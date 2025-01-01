liff.init({
    liffId: "2006072569-V84O0DYN",
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
                    document.getElementById('auth').value = data.data.auth;
                    getAllData();
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

// create feature group for markers
const markers = L.featureGroup();

const overlayMaps = { "ตำแหน่งฝาย": markers.addTo(map) };

L.control.layers(baseLayers, overlayMaps).addTo(map);

const redIcon = L.icon({
    iconUrl: './../assets/pin_red.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

let checkdamData = [];
const getAllData = async () => {
    try {
        const userId = document.getElementById('userid').value;
        const auth = document.getElementById('auth').value;

        console.log(userId);

        const url = auth === 'admin' ? '/checkdam/api/getcheckdam' : '/checkdam/api/getcheckdam_by_userid/' + userId;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            if ($.fn.DataTable.isDataTable('#usersTable')) {
                $('#checkdamTable').DataTable().destroy();
            }

            const table = $('#checkdamTable').DataTable({
                data: data.data,
                columns: [
                    {
                        data: 'gid',
                        render: function (data, type, row, meta) {

                            return `<button class="btn btn-danger" onclick="deleteCheckdam(${row.gid})">ลบ</button>
                                <button class="btn btn-warning" onclick="setUpdateForm(${row.gid}, '${row.userid}')">แก้ไข</button>`;
                        }
                    },
                    { data: 'cdname' },
                    { data: 'cdcreator' },
                    { data: 'cddetail' },
                    { data: 'cdtype' },
                    {
                        data: 'cddate',
                        render: function (data, type, row, meta) {
                            const thaiDate = new Date(data);
                            const options = { year: 'numeric', month: 'long', day: 'numeric' };
                            const thaiDateString = thaiDate.toLocaleDateString('th-TH', options);
                            const buddhistYear = thaiDate.getFullYear() + 543;
                            return thaiDateString.replace(thaiDate.getFullYear(), buddhistYear);
                        }
                    },
                    {
                        data: '',
                        render: function (data, type, row, meta) {
                            return `${row.lat}, ${row.lng}`;
                        }
                    },
                    // {
                    //     data: '',
                    //     render: function (data, type, row, meta) {
                    //         const img = row.cdimage ? row.cdimage : 'dashboard/placeholder-image.png';
                    //         return `<img src="/checkdam/${img}" alt="ภาพฝาย" style="width: 100px; height: 100px;">`;
                    //     }
                    // },
                ],
                scrollX: true,
                destroy: true,
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        title: 'Survey Data',
                        text: 'ดาวโหลด Excel',
                        className: 'custom-button'
                    }
                ]
            });

            $('#search').on('keyup', function () {
                let keyword = $(this).val();
                table.search(keyword).draw();
                // console.log('Current search keyword:', keyword);
            });

            $('#clearSearch').on('click', function () {
                $('#search').val('');
                table.search('').draw();
            });

            let filteredData = table.rows({ filter: 'applied' }).data().toArray();
            displayMarkers(filteredData);
            displayChart(filteredData);
            updateCards(filteredData);

            table.on('search.dt', function () {
                let filteredData = table.rows({ search: 'applied' }).data().toArray();
                displayMarkers(filteredData);
                displayChart(filteredData);
                updateCards(filteredData);
            });
        } else {
            console.error('Error (API response):', data.error);
        }
    } catch (error) {
        console.error('Error getting all checkdams:', error);
    }
}

const updateCards = (data) => {
    const totalCheckdams = data.length;
    document.getElementById('totalcd').textContent = `${totalCheckdams} ฝาย`;

    if (totalCheckdams > 0) {
        const lastCheckdam = data[data.length - 1].cdname;
        document.getElementById('lastcd').textContent = lastCheckdam;
    } else {
        document.getElementById('lastcd').textContent = 'ไม่มีข้อมูล';
    }
};

const displayChart = (data) => {
    try {
        const monthNamesThai = [
            "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
        ];

        const monthlyCounts = {};

        data.forEach(item => {
            const date = new Date(item.cddate);
            const month = date.getMonth();
            const year = date.getFullYear() + 543;

            const monthYear = `${monthNamesThai[month]} ${year}`;

            if (monthlyCounts[monthYear]) {
                monthlyCounts[monthYear]++;
            } else {
                monthlyCounts[monthYear] = 1;
            }
        });

        const categories = Object.keys(monthlyCounts).sort((a, b) => {
            const [monthA, yearA] = a.split(" ");
            const [monthB, yearB] = b.split(" ");
            const indexA = monthNamesThai.indexOf(monthA);
            const indexB = monthNamesThai.indexOf(monthB);
            if (yearA === yearB) {
                return indexA - indexB;
            }
            return parseInt(yearA) - parseInt(yearB);
        });
        const seriesData = Object.values(monthlyCounts);

        if (window.chart) {
            window.chart.destroy();
        }

        const options = {
            chart: {
                type: 'bar',
                height: 200
            },
            series: [{
                name: 'จำนวนฝาย',
                data: seriesData
            }],
            xaxis: {
                categories: categories,
                labels: {
                    rotate: -90,
                    rotateAlways: true
                }
            },
            yaxis: {
                title: {
                    text: 'จำนวนฝาย (ตัว)'
                },
                tickAmount: Math.max(...seriesData),
                min: 0,
                max: Math.max(...seriesData),
                forceNiceScale: true,
                labels: {
                    formatter: function (val) {
                        return Math.floor(val).toString();
                    }
                }
            },
            colors: ['#435ebe'],
            theme: {
                fontFamily: 'Noto Sans Thai'
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40,
                fontFamily: 'Noto Sans Thai'
            },
            labels: {
                style: {
                    fontFamily: 'Noto Sans Thai'
                }
            }
        };

        window.chart = new ApexCharts(document.querySelector("#chart_sumbymonth"), options);
        window.chart.render();
    } catch (error) {
        console.error('Error processing data for chart:', error);
    }
};

const displayMarkers = (data) => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    data.forEach(item => {
        const marker = L.marker([item.lat, item.lng], { icon: redIcon });
        marker.on('click', () => {
            document.getElementById('modal-cdname').textContent = `ชื่อฝาย-สถานที่: ${item.cdname}`;
            document.getElementById('modal-cdcreator').textContent = `ผู้สร้าง-ผู้ดูแล: ${item.cdcreator}`;
            document.getElementById('modal-cdtype').textContent = `รูปแบบฝาย: ${item.cdtype}`;
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
                cdimageElement.style.display = 'block';
            } else {
                cdimageElement.style.display = 'none';
            }

            const checkdamModal = new bootstrap.Modal(document.getElementById('checkdamModal'));
            checkdamModal.show();
        });
        markers.addLayer(marker);
    });
    // fit bounds to markers
    map.fitBounds(markers.getBounds());
};

document.getElementById('search').addEventListener('input', function () {
    try {
        const searchText = this.value.toLowerCase();
        const filteredData = checkdamData.filter(item =>
            item.cdname.toLowerCase().includes(searchText) ||
            item.cdcreator.toLowerCase().includes(searchText) ||
            item.cddetail.toLowerCase().includes(searchText)
        );

        displayMarkers(filteredData);
        displayChart(filteredData);
        updateCards(filteredData);
    } catch (error) {
        console.error('Error processing search input:', error);
    }
});

const openToast = () => {
    var toast = new bootstrap.Toast(document.getElementById('myToast'));
    toast.show();

    setTimeout(function () {
        toast.hide();

    }, 3000);
}

// delete checkdam function
const deleteCheckdam = async (id) => {
    try {
        const response = await fetch(`/checkdam/api/deletecheckdam/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
            openToast();
            getAllData();
        } else {
            console.error('Error deleting checkdam:', data.error);
        }
    } catch (error) {
        console.error('Error deleting checkdam:', error);
    }
};

// Function to populate the update form with existing data
const setUpdateForm = async (id, userid) => {
    try {
        window.location.href = `/checkdam/update/index.html?id=${id}&userid=${userid}`;

    } catch (error) {
        console.error('Error getting checkdam:', error);
    }
};

document.getElementById('clearSearch').addEventListener('click', function () {
    try {
        document.getElementById('search').value = '';
        displayMarkers(checkdamData);
        displayChart(checkdamData);
        updateCards(checkdamData);
    } catch (error) {
        console.error('Error resetting search:', error);
    }
});
