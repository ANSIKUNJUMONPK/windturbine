import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CatColors } from '../CatColors';
import { Category } from '../models/wtgs.model';

@Component({
  selector: 'app-cat-options',
  templateUrl: './cat-options.component.html',
  styleUrls: ['./cat-options.component.scss'],
})
export class CatOptionsComponent implements OnInit {
  @Input() category: Category = {} as Category;
  @Input() isBlade: boolean = false;

  @Input() bladeLabel: string = '';
  @Input() isChange: boolean = false;
  @Output() catEvent = new EventEmitter<{
    bladeType: string;
  }>();
  isClicked: boolean = false;
  imageSrc: string = '';

  cat: number = -1;

  constructor() {}

  ngOnInit(): void {}

  getImgSrc(imageCat: Category,isChange: boolean): string {
    if (this.isBlade == true) {
      this.imageSrc = '../../assets/images/turbine-';
    } else {
      this.imageSrc = '../../assets/images/blade-';
    }
    this.cat = imageCat.validated ?? imageCat.auto;
    this.imageSrc += CatColors[this.cat];
    const isValidated = imageCat.validated != null;
    this.imageSrc += isValidated ? '-filled.png' : '-unfilled.png';
    return this.imageSrc;
  }

  getImgSelected(imageCat: Category,): string {
    let imageSrc = '../../assets/images/category-';
    this.cat = imageCat.validated ?? imageCat.auto;
    imageSrc += CatColors[this.cat];
    const isValidated = imageCat.validated != null;
    imageSrc += isValidated ? '-unfilled.png' : '-unfilled.png';

    return imageSrc;
  }
  OnCatClick() {
    this.isClicked = !this.isClicked;
    console.log(this.isClicked);
  }
  catColorClick(bladeID: string, color: number) {
    this.isClicked = false;
    this.category.validated = color;
    const bladeType = bladeID.slice(5, 6);
    this.catEvent.emit({
      bladeType: bladeType,
    });
  }

  resetCat(imageCat: Category) {
    this.isClicked = false;
    imageCat.validated = null;
  }
}
