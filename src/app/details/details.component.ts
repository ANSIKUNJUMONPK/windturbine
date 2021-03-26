import { Component, OnInit } from '@angular/core';
import { TurbinelistService } from '../turbinelist.service';
import { Category, Note, Wtgs } from '../models/wtgs.model';
import { inspectiondata } from '../models/inspection.model';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';
import { Console } from 'node:console';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CatColors } from '../CatColors';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  route: any;
  data: any = [];
  loadArray: any = [];
  inspectionArray: any[] = [];
  inspectionBladeA: any = {};
  inspectionBladeB: any = {};
  inspectionBladeC: any = {};
  wtgIdList: string[] = [];
  inspectionDateFilterList: string = '';
  wtgIdFilterList: string = '';
  dateList: string[] = [];
  idSelected: string = '';
  imageIndex: number = 0;
  dateSelected: string = '';
  sidenavOpen: boolean = false;
  notes: Note[] = [];
  noteSet: Note[] = [];
  JSON = JSON;

  noteForm = new FormGroup({
    notes: new FormControl('', Validators.required),
  });

  index: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private turbinelistService: TurbinelistService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ActivatedRoute.params.subscribe((params) => {
      this.data = params;
      this.onLoadRow();
      this.setFilter();
      this.inspectionDateFilterList = this.data.date;
      this.wtgIdFilterList = this.data.id;
    });
  }

  rowDataList: Wtgs[] = JSON.parse(
    JSON.stringify(this.turbinelistService.wtgsList)
  );
  inspectionList: inspectiondata[] = JSON.parse(
    JSON.stringify(this.turbinelistService.InspectionData)
  );

  private setFilter(): void {
    const wtgIdList: string[] = [];
    const dateList: string[] = [];
    this.rowDataList.forEach((element) => {
      wtgIdList.push(element.wtg_id);
      dateList.push(element.inspection_date.slice(0, 10));
    });

    wtgIdList.sort((a, b) => {
      const lowerA = a.trim().toLowerCase();
      const lowerB = b.trim().toLowerCase();

      return lowerA === lowerB ? 0 : lowerA > lowerB ? 1 : -1;
    });
    dateList.sort((a: any, b: any) => {
      var val1: any = new Date(a.inspection_date).getTime();
      var val2: any = new Date(b.inspection_date).getTime();
      return val1 > val2 ? -1 : 1;
    });
    this.dateList = Array.from(new Set(dateList));
    this.wtgIdList = Array.from(new Set(wtgIdList));
  }

  onToggleFilter(f: MatSelectChange): void {
    this.router.navigate([
      'details',
      this.wtgIdFilterList,
      this.inspectionDateFilterList,
    ]);
    this.loadArray = [];
    this.inspectionBladeA = '';
    this.inspectionBladeB = '';
    this.inspectionBladeC = '';
  }

  onLoadRow() {
    this.rowDataList.forEach((element) => {
      if (this.data.id == element.wtg_id) {
        JSON.stringify(this.loadArray.push(element));
        this.inspectionList.forEach((element) => {
          if (
            this.data.id == element.blade_id.slice(0, 4) &&
            this.data.date == element.inspection_date.slice(0, 10)
          ) {
            this.inspectionArray.push(element);

            this.inspectionBladeA = this.inspectionArray.find((element) => {
              return element.blade_id.slice(5, 6) == 'A';
            });
            this.inspectionBladeB = this.inspectionArray.find((element) => {
              return element.blade_id.slice(5, 6) == 'B';
            });
            this.inspectionBladeC = this.inspectionArray.find((element) => {
              return element.blade_id.slice(5, 6) == 'C';
            });
          }
        });
      }
    });

    console.log(this.inspectionBladeA);
    console.log(this.inspectionBladeB);
    console.log(this.inspectionBladeC);
  }
  getImgSrc(imageCat: Category): string {
    let imageSrc = '../../assets/images/blade-';

    const cat = imageCat.validated ?? imageCat.auto;
    imageSrc += CatColors[cat];

    const isValidated = imageCat.validated != null;
    imageSrc += isValidated ? '-filled.png' : '-unfilled.png';

    return imageSrc;
  }
  bladeClick(notes: Note[]) {
    this.sidenavOpen = true;
    this.noteSet = notes;
  }
  imageClick(date: string, id: string, j: number, notes: Note[]) {
    this.dateSelected = date;
    this.idSelected = id;
    this.imageIndex = j + 1;
    this.sidenavOpen = true;
    this.noteSet = notes;
  }
  openModal(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  saveNote() {
    let date = new Date().getTime();
    let note: Note = {
      text: this.noteForm.controls['notes'].value,
      date: date,
    };
    this.noteSet.push(note);
    console.log(note);
    console.log(this.noteSet);
    this.noteForm.reset();
  }
  clearInput() {
    (document.getElementById('input') as HTMLInputElement).value = '';
    this.noteForm.reset();
  }
  deleteInput(index: number) {
    this.index = index;
    console.log(index);
  }

  deleteConfirm() {
    if (this.index > -1) {
      this.noteSet.splice(this.index, 1);
      this.dialog.closeAll();
    }
  }

  editInput(index: number) {
    this.index = index;
    console.log(index);
    this.noteForm.patchValue({
      notes:this.noteSet[index].text
    })
  }
  editNote(){
    this.dialog.closeAll();
    this.noteSet[this.index].text=this.noteForm.controls['notes'].value;
    this.noteForm.reset();
    (document.getElementById('input') as HTMLInputElement).value='';
  }

}
