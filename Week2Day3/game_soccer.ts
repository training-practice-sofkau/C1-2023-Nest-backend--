// Metodo singleton

class GameRegistry {
    // Almacenar la única instancia de la clase
    private static instance: GameRegistry;

    // Mapa para almacenar los juegos
    private games: Map<string, any>;

    // Constructor privado para evitar la creación de múltiples instancias
    private constructor() {
        this.games = new Map<string, any>();
    }

    // Método estático para obtener la única instancia de la clase
    public static getInstance(): GameRegistry {
        // Si la instancia no existe, crear una nueva instancia
        if (!GameRegistry.instance) {
            GameRegistry.instance = new GameRegistry();
        }

        // Devolver la instancia existente
        return GameRegistry.instance;
    }

    // Método para agregar un juego al mapa
    public addGame(gameId: string, gameInfo: any): void {
        this.games.set(gameId, gameInfo);
    }

    // Método para eliminar un juego del mapa
    public removeGame(gameId: string): void {
        this.games.delete(gameId);
    }

    // Método para obtener un juego específico del mapa
    public getGame(gameId: string): any {
        return this.games.get(gameId);
    }

    // Método para obtener todos los juegos del mapa
    public getAllGames(): Map<string, any> {
        return this.games;
    }
}
// Crear una instancia de la clase GameRegistry
const gameRegistry = GameRegistry.getInstance();

// Agregar juegos al mapa
gameRegistry.addGame("game1", {name: "Game 1", developer: "Developer 1"});
gameRegistry.addGame("game2", {name: "Game 2", developer: "Developer 2"});
gameRegistry.addGame("game3", {name: "Game 3", developer: "Developer 3"});

// Obtener un juego específico
const game1 = gameRegistry.getGame("game1");
console.log(game1);

// Obtener todos los juegos
const allGames = gameRegistry.getAllGames();
console.log(allGames);
