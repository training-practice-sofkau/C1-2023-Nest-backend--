class OnlyInstance {
    private static instance: OnlyInstance;
    private saldo: number;
    private constructor(saldo: number) {
        this.saldo = saldo
    }
    public static getInstance(): OnlyInstance {
        if (!OnlyInstance.instance) {
            OnlyInstance.instance = new OnlyInstance(0)
        }
        return this.instance;
    }
    private getSaldo() {
        return this.saldo;
    }
    private addSaldo(amount: number) {
        this.saldo = this.saldo + amount
        return this.saldo;
    }
    private removeSaldo(amount: number) {
        if (this.saldo > amount) this.saldo = this.saldo - amount
        return this.saldo
    }
}

let uni = OnlyInstance;
const only=uni.getInstance()
console.log(only)