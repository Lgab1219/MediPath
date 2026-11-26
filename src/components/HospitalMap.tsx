import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme';
import { ChevronLeft } from 'lucide-react-native';
import { Map, Camera, Marker } from '@maplibre/maplibre-react-native';
import { getCurrentLocation } from '../functions/requestLocation';
import { useState, useRef, useEffect } from 'react';

import type { CameraRef } from '@maplibre/maplibre-react-native';

function HospitalMap() {

  const [ coords, setCoords ] = useState<{ latitude: number; longitude: number } | null>(null);

  const navigation = useNavigation();

  const cameraRef = useRef<CameraRef>(null);

  const hospitals = [
    { id: "h1", name: "Sample Hospital", lat: 13.7565, lng: 121.0583 },
    { id: "h2", name: "Sample Clinic", lat: 13.77, lng: 121.07 },
  ];

  useEffect(() => {
    
    let cancelled = false;

    async function requestLocation() {
    const position = await getCurrentLocation();

    if (cancelled || !position) return;
    
    const { latitude, longitude } = position.coords;

    setCoords({longitude, latitude});

    cameraRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 12
    })
  }

  requestLocation();

  // If the user leaves this screen before GPS responds, cancel async function
  return () => {
    cancelled = true;
  };
  }, []);
    
    return (
        <ScrollView style={styles.appContainer}>

        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <ChevronLeft size={24} color={colors.primary} />
          </Pressable>

        <View>
            <Text style={styles.headerText}>Nearest Hospitals</Text>
            <Text style={styles.headerSubText}>Sorted by distance from you</Text>
        </View>

        </View>

        <View style={styles.sectionContainer}>
            <Map style={styles.map} mapStyle="https://tiles.openfreemap.org/styles/liberty">
                <Camera ref={cameraRef} initialViewState={{ center: [121.0583, 13.7565], zoom: 12 }} />

                {
                  hospitals.map((hospital) => (
                    <Marker key={hospital.id} lngLat={[hospital.lng, hospital.lat]}>
                      <View style={styles.pin} />
                    </Marker>
                  ))
                }
            </Map>
        </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
  header: { 
    minHeight: 64, 
    paddingHorizontal: 4, 
    marginVertical: 15,
    flexDirection: "row", 
    alignItems: "center",
    gap: 12, 
  },

  headerText: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: colors.navy 
  },

  headerSubText: { 
    fontSize: 12, 
    color: colors.muted, 
    marginTop: 2 
  },

  appContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 24,
    textAlign: 'center',
  },

  map: { 
    flex: 1,
    width: 305,
    height: 200,
  },

  pin: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E11D48",
    borderWidth: 2,
    borderColor: "white",
  },

  sectionContainer: {
    flex: 1,
    marginVertical: 10,
    padding: 8,
  },

  pressedBtn: {
    backgroundColor: '#a5231a',
    borderColor: '#D92D20',
    borderWidth: 1,
  },

  submitBtn: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#D92D20',
    alignItems: 'center',
    marginBottom: 10,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  
    pressed: { 
        opacity: 0.75 ,
  },

});

export default HospitalMap;