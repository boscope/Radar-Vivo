export class GoogleIntegrationError
extends Error {

  constructor(message: string) {

    super(message);

    this.name =
      "GoogleIntegrationError";

  }

}
