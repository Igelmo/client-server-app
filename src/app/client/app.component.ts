import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-server-websockets'
  lastGesture = 'Not action yet'
  text = 'Not action yet'

  @ViewChild('viewer') private viewer?: ElementRef;

  private socket

  constructor() {

    this.socket = new WebSocket("ws://127.0.0.1:8080");
    this.socket.onopen = function() {
      alert("[open] Connection established");
      alert("Sending to server");
    };

    this.socket.addEventListener("message", (event) => {
       this.text += '\n' + event.data;
       this.lastGesture = event.data;
    });
  }

  public send(): void {
    this.socket.send("I'm alive! Hello server");
  }

  public cleanLogs(): void {
    this.text = ""
  }
}
