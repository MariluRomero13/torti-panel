import { Component } from '@angular/core';
import { MaterialSvgService } from './services/material-svg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private materialSvg: MaterialSvgService) {
    this.materialSvg.init();
  }
}
