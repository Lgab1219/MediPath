import { PermissionsAndroid, Alert, Linking } from "react-native";
import Geolocation from "react-native-geolocation-service";

async function requestLocationPermission(): Promise<boolean> {
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);

  return (
    result["android.permission.ACCESS_FINE_LOCATION"] === "granted" ||
    result["android.permission.ACCESS_COARSE_LOCATION"] === "granted"
  );
}

export async function getCurrentLocation() {
  const granted = await requestLocationPermission();

  if (!granted) {
    Alert.alert(
      "Location needed",
      "Enable location access in Settings to find places near you.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }

  return new Promise<Geolocation.GeoPosition | null>((resolve) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => {
        console.warn(error.code, error.message);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        showLocationDialog: true, // prompts the user to turn on GPS if it's off
      }
    );
  });
}