export class FullName {
  constructor(private readonly value: string) {
    this.validate(value);
  }

  private validate(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('El nombre no puede estar vacio');
    }

    if (name.trim().length < 2) {
      throw new Error('El nombre debe tener mas de dos caracteres');
    }

    if (name.trim().length > 100) {
      throw new Error('El nombre no puede pasar de 100 caracteres');
    }
  }

  getValue(): string {
    return this.value.trim();
  }

  equals(other: FullName): boolean {
    return this.getValue() === other.getValue();
  }

  toString(): string {
    return this.getValue();
  }
}
