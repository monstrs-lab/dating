import { Guard }   from '@monstrs/guard-clause'
import { Against } from '@monstrs/guard-clause'

export class ProfileGeoposition {
  #latitude!: number

  #longitude!: number

  get latitude(): number {
    return this.#latitude
  }

  private set latitude(latitude: number) {
    this.#latitude = latitude
  }

  get longitude(): number {
    return this.#longitude
  }

  private set longitude(longitude: number) {
    this.#longitude = longitude
  }

  @Guard()
  static create(
    @Against('latitude').Empty() latitude: number,
    @Against('longitude').Empty() longitude: number
  ): ProfileGeoposition {
    const profileGeoposition = new ProfileGeoposition()

    profileGeoposition.latitude = latitude
    profileGeoposition.longitude = longitude

    return profileGeoposition
  }
}
