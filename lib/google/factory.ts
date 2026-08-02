import {
  GoogleProviderImpl,
} from "./provider-impl";

import {
  GoogleClientImpl,
} from "./client-impl";

export function createGoogleProvider() {

  return new GoogleProviderImpl();

}

export function createGoogleClient() {

  return new GoogleClientImpl();

}
