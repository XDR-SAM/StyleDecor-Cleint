import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ServiceCoverageMap = () => {
  // Default center: Dhaka, Bangladesh
  const center = [23.8103, 90.4125];
  
  // Major cities in Bangladesh
  const locations = [
    { name: 'Dhaka', position: [23.8103, 90.4125] },
    { name: 'Chittagong', position: [22.3569, 91.7832] },
    { name: 'Sylhet', position: [24.8949, 91.8687] },
    { name: 'Rajshahi', position: [24.3745, 88.6042] },
    { name: 'Khulna', position: [22.8456, 89.5403] },
    { name: 'Barisal', position: [22.7010, 90.3535] },
  ];

  const customIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={location.position} icon={customIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-orange-500">{location.name}</h3>
                <p className="text-sm text-gray-600">We provide services here!</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ServiceCoverageMap;

