import {Inject, Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl: string) {
  }


  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl + hubUrl;

    //if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
    const builder: HubConnectionBuilder = new HubConnectionBuilder();

    const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();
    hubConnection.start().then(() => {
      console.log("SignalR Connected");

    })
      .catch(err => setTimeout(() => this.start(hubUrl), 2000));
    // this._connection = hubConnection;
    //}

    hubConnection.onreconnected(connectionId => console.log("SignalR Reconnected"));
    hubConnection.onreconnecting(error => console.log("SignalR Reconnecting"));
    hubConnection.onclose(error => console.log("SignalR Closed"));

    return hubConnection;
  }

  invoke(hubUrl: string, procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) {

    this.start(hubUrl).invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);

  }

  on(hubUrl: string, procedureName: string, callBack: (...message) => void) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
