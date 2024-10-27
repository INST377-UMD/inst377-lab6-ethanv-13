function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([37.8, -96], 4); // Center of US

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const coordinates = [
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
    ];

    coordinates.forEach((coord, index) => {
        const marker = L.marker([coord.lat, coord.lng]).addTo(map);
        marker.bindPopup(`Marker ${index + 1}`).openPopup();
        
        document.getElementById(`marker${index + 1}`).textContent = `Latitude: ${coord.lat}, Longitude: ${coord.lng}`;
        
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lng}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
                document.getElementById(`locality${index + 1}`).textContent = data.locality || 'Unknown';
            });
    });
});
