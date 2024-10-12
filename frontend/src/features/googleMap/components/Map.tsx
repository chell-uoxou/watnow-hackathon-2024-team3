import { LoadScript, GoogleMap, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem", // Fixed camelCase
};
interface MapProps {
  currentLocation: {
    lat: number | null;
    lng: number | null;
  };
  defaultCenter: {
    lat: number;
    lng: number;
  };
}

export default function Map({ currentLocation, defaultCenter }: MapProps) {
  return (
    <div className="grow rounded-lg bg-clip-border">
      <LoadScript googleMapsApiKey="AIzaSyAkePaK5Cef7L8zD-A59U2dxk0t2jFEExg">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            currentLocation.lat !== null && currentLocation.lng !== null
              ? { lat: currentLocation.lat, lng: currentLocation.lng }
              : defaultCenter
          }
          zoom={17}
        >
          {currentLocation.lat !== null && currentLocation.lng !== null && (
            <InfoWindow
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
            >
              <div>You are here!</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
