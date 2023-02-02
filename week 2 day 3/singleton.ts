class empresa {
    private static sofka: empresa;
    private constructor() { }
    public static obtener(): empresa {
        if (!empresa.sofka) {
            empresa.sofka = new empresa();
        }
        return empresa.sofka;
    }
}
const colombia = empresa.obtener();
const uruguay = empresa.obtener();

if (colombia === uruguay) {
    console.log('estamos juntos y unidos');
} else {
    console.log('estamos separados :(');
}