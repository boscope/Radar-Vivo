export interface Provider<T> {

  find(
    value: string
  ): Promise<T | null>;

}
