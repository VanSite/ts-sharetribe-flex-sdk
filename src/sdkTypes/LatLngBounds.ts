import LatLng from './LatLng';

class LatLngBounds {
  ne: LatLng | { lat: number | string; lng: number | string };
  sw: LatLng | { lat: number | string; lng: number | string };
  value: string;

  constructor(
    ne: LatLng | { lat: number; lng: number },
    sw: LatLng | { lat: number; lng: number }
  ) {
    let isValid = true;

    // Helper function to check if a value is an object with numeric lat/lng
    const isLatLngObject = (val: any) =>
      val &&
      typeof val === 'object' &&
      typeof val.lat === 'number' &&
      typeof val.lng === 'number';

    // Validate ne
    let neLatLng: LatLng;
    if (ne instanceof LatLng) {
      neLatLng = ne;
    } else if (isLatLngObject(ne)) {
      neLatLng = new LatLng(ne.lat, ne.lng);
    } else {
      console.warn("Invalid 'ne' value. Must be an instance of LatLng or an object with lat and lng numbers.");
      isValid = false;
      neLatLng = new LatLng(Number(ne.lat), Number(ne.lng));
    }

    // Validate sw
    let swLatLng: LatLng;
    if (sw instanceof LatLng) {
      swLatLng = sw;
    } else if (isLatLngObject(sw)) {
      swLatLng = new LatLng(sw.lat, sw.lng);
    } else {
      console.warn("Invalid 'sw' value. Must be an instance of LatLng or an object with lat and lng numbers.");
      isValid = false;
      swLatLng = new LatLng(Number(sw.lat), Number(sw.lng));
    }

    this.ne = neLatLng;
    this.sw = swLatLng;
    this.value = `${this.ne.toString()},${this.sw.toString()}`;

    if (!isValid) {
      console.warn("LatLngBounds must be an object with valid ne and sw values.");
    }
  }

  toString() {
    return `${this.ne.toString()},${this.sw.toString()}`;
  }
}

export default LatLngBounds;
