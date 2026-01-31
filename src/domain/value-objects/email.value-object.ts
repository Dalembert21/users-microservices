export class Email {
  constructor(private readonly value: string) {
    this.validate(value);
  }

  private validate(email: string): void {
    if (!email || email.trim().length === 0) {
      throw new Error('El correo no puede ser vacio');
    }


    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      throw new Error(`Formato invalido: ${email}. Formato valido: admin@dominio.com`);
    }

    // Validaciones adicionales
    if (email.length > 254) {
      throw new Error('El correo es muy largo');
    }

    const [localPart, domain] = email.split('@');
    
    if (localPart.length > 64) {
      throw new Error('Es demasiado largo');
    }

    if (domain.length > 253) {
      throw new Error('El dominio es muy largo.');
    }

    if (domain.startsWith('.') || domain.endsWith('.')) {
      throw new Error('Ningun correo termina en punto');
    }

    if (domain.includes('..')) {
      throw new Error('El dominio no puede contener puntos consecutivos');
    }
  }

  getValue(): string {
    return this.value.toLowerCase();
  }

  equals(other: Email): boolean {
    return this.getValue() === other.getValue();
  }

  toString(): string {
    return this.getValue();
  }
}
