import { Type } from '@mikro-orm/core'
import { raw }  from '@mikro-orm/core'

export class Point {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number
  ) {}
}

export class PointType extends Type<Point | undefined, { x: number; y: number } | undefined> {
  override convertToDatabaseValue(value: Point | undefined): { x: number; y: number } | undefined {
    if (!value) {
      return value
    }

    return raw(`POINT(${value.longitude}, ${value.latitude})`)
  }

  override convertToJSValue(value: { x: number; y: number } | undefined): Point | undefined {
    if (!value) {
      return value as undefined
    }

    return new Point(value.x, value.y)
  }

  override compareValues(a: any, b: any): boolean {
    return a.sql === b.sql
  }

  override getColumnType(): string {
    return 'point'
  }
}
