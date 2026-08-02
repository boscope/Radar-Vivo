export class ProviderRegistry<T> {

  private providers = new Map<
    string,
    T
  >();

  register(
    name: string,
    provider: T
  ) {
    this.providers.set(name, provider);
  }

  get(
    name: string
  ) {
    return this.providers.get(name);
  }

  list() {
    return [...this.providers.keys()];
  }

}
