export  abstract class BaseRepository<T> {
    protected readonly database: T[];

    constructor() {
        this.database = new Array<T>()
    }
    
}