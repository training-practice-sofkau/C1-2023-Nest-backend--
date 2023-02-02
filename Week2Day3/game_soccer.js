// Metodo singleton
var GameRegistry = /** @class */ (function () {
    // Constructor privado para evitar la creación de múltiples instancias
    function GameRegistry() {
        this.games = new Map();
    }
    // Método estático para obtener la única instancia de la clase
    GameRegistry.getInstance = function () {
        // Si la instancia no existe, crear una nueva instancia
        if (!GameRegistry.instance) {
            GameRegistry.instance = new GameRegistry();
        }
        // Devolver la instancia existente
        return GameRegistry.instance;
    };
    // Método para agregar un juego al mapa
    GameRegistry.prototype.addGame = function (gameId, gameInfo) {
        this.games.set(gameId, gameInfo);
    };
    // Método para eliminar un juego del mapa
    GameRegistry.prototype.removeGame = function (gameId) {
        this.games["delete"](gameId);
    };
    // Método para obtener un juego específico del mapa
    GameRegistry.prototype.getGame = function (gameId) {
        return this.games.get(gameId);
    };
    // Método para obtener todos los juegos del mapa
    GameRegistry.prototype.getAllGames = function () {
        return this.games;
    };
    return GameRegistry;
}());
