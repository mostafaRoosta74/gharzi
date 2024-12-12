import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'

export const MapPage = () => {
    const position = [51.505, -0.09]
    const position2 = {
        lat:51.505,
        lng: -0.09
    }

    return(
        <div style={{height:"200px",width:"200px"}}>
            <MapContainer center={position2} zoom={13} scrollWheelZoom={false} style={{ height: "calc(100vh - 112px)",width:"100vw" }}>
                <Marker position={position2}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>)
}