class LatLng {
  lat: number | string;
  lng: number | string;
  value: string;

  constructor(lat: string | number, lng: string | number) {
    // Define a helper function to validate if a value is a number or a number-like string.
    const isNumberOrNumberString = (val: any) => {
      if (typeof val === 'number') return true;
      return typeof val === 'string' && /^\d+(\.\d+)?$/.test(val);
    };

    // Validate lat
    if (!isNumberOrNumberString(lat)) {
      console.warn("Latitude must be a number or a string that represents a number");
    }

    // Validate lng
    if (!isNumberOrNumberString(lng)) {
      console.warn("Longitude must be a number or a string that represents a number");
    }

    // If both are valid, store as is; otherwise store anyway but invalid inputs have triggered warnings.
    this.lat = lat;
    this.lng = lng;
    this.value = `${this.lat},${this.lng}`;

    // Optionally, you could convert valid strings to numbers.
    // If you want that, you can do:
    // if (latValid && typeof lat === 'string') this.lat = parseFloat(lat);
    // if (lngValid && typeof lng === 'string') this.lng = parseFloat(lng);
  }

  toString() {
    return `${this.lat},${this.lng}`;
  }
}

export default LatLng;
