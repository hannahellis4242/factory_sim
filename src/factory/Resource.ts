export default class Resource {
  constructor(public name: string, private _quantity: number) {}
  add(n: number) {
    this._quantity += n;
  }
  take(n: number): number {
    const out = Math.min(n, this.quantity);
    this._quantity -= out;
    return out;
  }
  check(n: number): boolean {
    return this.quantity >= n;
  }
  public get quantity() {
    return this._quantity;
  }
}
