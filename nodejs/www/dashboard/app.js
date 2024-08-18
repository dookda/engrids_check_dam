
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
            displayMarkers(checkdamData);
            displayChart(checkdamData);
            updateCards(checkdamData);
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(err => console.error(err));

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
        const marker = L.marker([item.lat, item.lng]).addTo(map);
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
    });
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
