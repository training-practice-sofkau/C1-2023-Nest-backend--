export class CopaMundo {
  private static instance: CopaMundo;
  private message: string;
  private constructor(message: string) {
    this.message = message;
  }
  static getInstance(): CopaMundo {
    if (!CopaMundo.instance) {
      CopaMundo.instance = new CopaMundo('Ninguno');
    }

    return CopaMundo.instance;
  }
  setGanador(pais: string): void {
    this.message = pais;
  }

  getGanador(): string {
    return this.message;
  }
}
