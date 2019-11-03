
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';

export default class Maps extends React.Component {
    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        latitude: 0,
        longitude: 0,
        region: 0
    };

    watchID: ?number = null;

    componentDidMount() {
        this.getLocation()
    }

    async getLocation() {
        await Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                this.setState({
                    initialPosition,
                });
            },
            error => ('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = Geolocation.watchPosition(position => {
            const lastPosition = JSON.stringify(position);
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                lastPosition
            });
        });
    }



    componentWillUnmount() {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region) {
        this.setState({
            region
        });
    }

    render() {

        return (
            <>

                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                    title={"Arkademy Bogor"} 
                    coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                     
                    }}>
                    </Marker>
                </MapView>



            </>
        );
    }

}





