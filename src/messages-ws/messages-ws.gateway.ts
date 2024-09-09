import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';


@WebSocketGateway({ cors: true })
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server
  constructor(
    private readonly messagesWsService: MessagesWsService
  ) { }

  handleDisconnect(client: Socket) {
    this.messagesWsService.registerclient(client);

    //decimos ele evento que queremo emitir,
    //segundo parametro puede ser un objeto,un arreglo o un string
    this.wss.emit('clients-update', this.messagesWsService.getConnectedClien())

  }
  handleConnection(client: Socket) {
    this.messagesWsService.removeClient(client.id)
    this.wss.emit('clients-update', this.messagesWsService.getConnectedClien())
  }

}
