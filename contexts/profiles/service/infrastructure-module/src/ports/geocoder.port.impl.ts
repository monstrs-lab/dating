import { Injectable }   from '@nestjs/common'

import { GeocoderPort } from '@profiles/application-module'

@Injectable()
export class GeocoderPortImpl extends GeocoderPort {
  override async getLocation(latitude: number, longitude: number): Promise<string> {
    const url = new URL('/reverse', 'http://nominatim.openstreetmap.org')

    url.searchParams.set('lat', String(latitude))
    url.searchParams.set('lon', String(longitude))
    url.searchParams.set('format', 'json')
    url.searchParams.set('featureType', 'city')

    const response = await fetch(url.toString())

    const { address }: { address: { city: string } } = await response.json()

    return address.city
  }
}
