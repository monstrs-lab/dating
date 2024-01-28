export abstract class GeocoderPort {
  abstract getLocation(latitude: number, longitude: number): Promise<string>
}
