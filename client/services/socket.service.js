(function() {
    angular
        .module('headphonesStore')
        .factory('socketService', SocketService);

    function SocketService() {
        var self = this;
        self.socket = io();

        var service = {
            on: on,
            emit: emit,
            socket: self.socket
        }

        return service;

        function on(event, callback) {
            self.socket.on(event, callback);
        }

        function emit(event, data) {
            self.socket.emit(event, data);
        }
    }
})();