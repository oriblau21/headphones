const http = require('http');
const socketio = require('socket.io');
let io = null;

module.exports.init = (app) => {
    const server = http.createServer(app);

    io = socketio.listen(server);

    io.on('connection', (socket) => {
        
    });

    return server;
}

module.exports.getSocket = () => {
    if (!io) {
        throw new Error('socket object is not initialized');
    }

    return io;
};

module.exports.emit = (event, data) => {
    this.getSocket().emit(event, data);
};

module.exports.on = (event, callback) => {
    this.getSocket().on(event, callback);
};