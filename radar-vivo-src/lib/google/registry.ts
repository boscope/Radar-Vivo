import {
  ProviderRegistry,
} from "@/lib/core";

import type {
  GoogleProvider,
} from "./provider";

import {
  createGoogleProvider,
} from "./factory";

export class GoogleRegistry {

  private registry =
    new ProviderRegistry<GoogleProvider>();

  constructor() {

    this.registry.register(
      "google",
      createGoogleProvider()
    );

  }

  getProvider() {

    return this.registry.get(
      "google"
    )!;

  }

}
