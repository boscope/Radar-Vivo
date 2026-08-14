export class RadarError extends Error {

  constructor(
    message: string
  ) {

    super(message);

    this.name = "RadarError";

  }

}
