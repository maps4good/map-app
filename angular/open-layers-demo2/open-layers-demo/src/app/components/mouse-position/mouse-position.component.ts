import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
} from '@angular/core';
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';
import { CoordinateFormatterService } from '../../services/coordinate-formatter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mouse-position',
  template: ``,
  styles: [],
  standalone: true,
  imports: [CommonModule],
  providers: [CoordinateFormatterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MousePositionComponent implements OnInit {
  @Input() map!: Map;
  @Input() positionTemplate!: string;
  control!: ControlMousePosition;

  constructor(
    private element: ElementRef,
    private coordinateFormatter: CoordinateFormatterService
  ) {}

  ngOnInit() {
    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      coordinateFormat: (coordinates: number[] | undefined) => {
        if (coordinates) {
          return this.coordinateFormatter.numberCoordinates(
            coordinates,
            4,
            this.positionTemplate
          );
        }
        else {
          return '';
        }
      },
        
      target: this.element.nativeElement,
    });
    this.map.addControl(this.control);
  }
}
