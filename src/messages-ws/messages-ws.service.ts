import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConnecteDClients {
    [id: string]: Socket
}

@Injectable()
export class MessagesWsService {

    private connectedclients: ConnecteDClients = {

    }

    registerclient(client: Socket) {
        this.connectedclients[client.id] = client
    }

    removeClient(clientId: string) {
        delete this.connectedclients[clientId]
    }

    getConnectedClien(): string[] {
        return Object.keys(this.connectedclients)
    }
}
