//garantiza que una clase solo tenga una instancia y proporciona un punto de acceso global a ella
//solo una conexion a la base de datos
class DataBase {
  private static instance: DataBase;
  private port: string;

  private constructor(port: string) {
    this.port = port;
  }

  static connection(port: string) {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase(port);
      console.log('se crea la conexion');
    }
    return DataBase.instance;
  }
}

console.log(DataBase.connection('8080'));
console.log(DataBase.connection('3030'));
