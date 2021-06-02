import {Component, ElementRef, ViewChild} from '@angular/core';
import {WebSocketSubject} from 'rxjs/webSocket';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-server-websockets'
  text = 'Not action yet'

  @ViewChild('viewer') private viewer?: ElementRef;

  private socket;

  constructor() {

    //this.socket = new WebSocket('ws://' + location.host);
    this.socket = new WebSocket("wss://echo.websocket.org/");
    this.socket.onopen = function() {
      alert("[open] Connection established");
      alert("Sending to server");
    };
  }

  public send(): void {
    this.socket.send("I'm alive! Hello server");
  }


}
