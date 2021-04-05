import { Component, OnInit } from '@angular/core';
import { TurbinelistService } from '../turbinelist.service';
import { Wtgs } from '../models/wtgs.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  columnDefs: any[] = [];
  rowDataList: Wtgs[] = JSON.parse(
    JSON.stringify(this.turbinelistService.wtgsList)
  ); // Deep copy
  farmList: string[] = [];
  inspectionDateList: string[] = [];
  wtgIdList: string[] = [];
  wtgCatList: any[] = [];
  filterFarmList: string[] = [];
  filterInspectionDateList: string[] = [];
  filterWtgIdList: string[] = [];
  filterWtgCatList: string[] = [];

  constructor(
    private turbinelistService: TurbinelistService,
    private router: Router
  ) {}
  ngOnInit() {
    this.setColoumDef();
    this.setFilters();
  }
  onRowClick(data: any) {
    // console.log(data);
    this.router.navigate([
      '/details',
      data.wtg_id,
      data.inspection_date.slice(0, 10),
    ]);
  }
  onFarmReset() {
    this.filterFarmList = [];
  }
  onDateReset() {
    this.filterInspectionDateList = [];
  }
  onIdReset() {
    this.filterWtgIdList = [];
  }
  onCatReset() {
    this.filterWtgCatList = [];
  }
  //Filter
  onToggleFilter(isOpen: boolean): void {
    if (isOpen) {
      return;
    }

    if (
      this.filterFarmList.length +
        this.filterInspectionDateList.length +
        this.filterWtgIdList.length +
        this.filterWtgCatList.length >
      0
    ) {
      this.rowDataList = this.turbinelistService.wtgsList.filter((wtg) => {
        const isValidFarm =
          this.filterFarmList.length > 0
            ? this.filterFarmList.includes(wtg.farm)
            : true;

        const isValidInspectionDate =
          this.filterInspectionDateList.length > 0
            ? this.filterInspectionDateList.includes(
                wtg.inspection_date.slice(0, 4)
              )
            : true;

        const isValidWtgId =
          this.filterWtgIdList.length > 0
            ? this.filterWtgIdList.includes(wtg.wtg_id)
            : true;

        const wtgCat =
          wtg.WTG_cat.validated != null
            ? 'V' + wtg.WTG_cat.validated
            : 'A' + wtg.WTG_cat.auto;
        const isValidWtgCat =
          this.filterWtgCatList.length > 0
            ? this.filterWtgCatList.includes(wtgCat)
            : true;

        return (
          isValidFarm && isValidInspectionDate && isValidWtgId && isValidWtgCat
        );
      });
    } else {
      this.rowDataList = JSON.parse(
        JSON.stringify(this.turbinelistService.wtgsList) // Deep copy
      );
    }
  }
  //Table
  private setColoumDef(): void {
    this.columnDefs = [
      { field: 'wtg_class' },
      { field: 'farm' },
      { field: 'wtg_id' },
      { field: 'wtg_model' },
      { field: 'blade_model' },
      {
        headerName: 'Last Inspection',
        field: 'inspection_date',
        cellRenderer: (data: { value: string | number | Date }) => {
          return data.value ? new Date(data.value).toLocaleDateString() : '';
        },
      },
      {
        headerName: 'Next Inspection',
        field: 'next_inspection',
        cellRenderer: (data: { value: string | number | Date }) => {
          return data.value ? new Date(data.value).toLocaleDateString() : '';
        },
      },
      {
        headerName: 'WTG Category',
        field: 'WTG_cat.auto',
        valueGetter: (params: any) => {
          const wtg: Wtgs = params.data;
          return wtg.WTG_cat.validated != null
            ? 'V' + wtg.WTG_cat.validated
            : 'A' + wtg.WTG_cat.auto;
        },
      },

      {
        headerName: 'Blade 1',
        children: [
          {
            headerName: 'Serial_No',
            field: 'blades',
            valueGetter: 'data.blades[0].serial_number',
          },
          {
            field: 'Cat',
            valueGetter: (params: { data: any }) =>
              params.data.blades[0].blade_cat.auto,
          },
        ],
      },
      {
        headerName: 'Blade 2',
        children: [
          {
            field: 'Serial No',
            valueGetter: (params: { data: any }) =>
              params.data.blades[1].serial_number,
          },
          {
            field: 'Cat',
            valueGetter: (params: { data: any }) =>
              params.data.blades[1].blade_cat.auto,
          },
        ],
      },

      {
        headerName: 'Blade 3',
        children: [
          {
            field: 'Serial No',
            valueGetter: (params: { data: any }) =>
              params.data.blades[2].serial_number,
          },
          {
            field: 'Cat',
            valueGetter: (params: { data: any }) =>
              params.data.blades[2].blade_cat.auto,
          },
        ],
      },
    ];
  }

  private setFilters(): void {
    const farmList: string[] = [];
    const inspectionDateList: string[] = [];
    const wtgIdList: string[] = [];

    this.rowDataList.forEach((element) => {
      farmList.push(element.farm);
      inspectionDateList.push(element.next_inspection.slice(0, 4));
      wtgIdList.push(element.wtg_id);
    });
    //sorting farmlist
    farmList.sort((a, b) => {
      const lowerA = a.trim().toLowerCase(); //trim-to avoid spaces
      const lowerB = b.trim().toLowerCase();

      return lowerA === lowerB ? 0 : lowerA > lowerB ? 1 : -1;
    });
    //sorting inspection date list
    inspectionDateList.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));
    //sorting wtg id list
    wtgIdList.sort((a, b) => {
      const lowerA = a.trim().toLowerCase();
      const lowerB = b.trim().toLowerCase();

      return lowerA === lowerB ? 0 : lowerA > lowerB ? 1 : -1;
    });
    //to avoid repetation
    this.farmList = Array.from(new Set(farmList));
    this.inspectionDateList = Array.from(new Set(inspectionDateList));
    this.wtgIdList = Array.from(new Set(wtgIdList));
    //category list in filter
    this.wtgCatList = [
      {
        label: 'cat. 5',
        value: 'V5',
        imgSrc: 'assets/images/category-red-filled.png',
      },
      {
        label: 'cat. 4',
        value: 'V4',
        imgSrc: 'assets/images/category-orange-filled.png',
      },
      {
        label: 'cat. 3',
        value: 'V3',
        imgSrc: 'assets/images/category-yellow-filled.png',
      },
      {
        label: 'cat. 2',
        value: 'V2',
        imgSrc: 'assets/images/category-green-filled.png',
      },
      {
        label: 'cat. 1',
        value: 'V1',
        imgSrc: 'assets/images/category-azure-filled.png',
      },
      {
        label: 'cat. 5',
        value: 'A5',
        imgSrc: 'assets/images/category-red-unfilled.png',
      },
      {
        label: 'cat. 4',
        value: 'A4',
        imgSrc: 'assets/images/category-orange-unfilled.png',
      },
      {
        label: 'cat. 3',
        value: 'A3',
        imgSrc: 'assets/images/category-yellow-unfilled.png',
      },
      {
        label: 'cat. 2',
        value: 'A2',
        imgSrc: 'assets/images/category-green-unfilled.png',
      },
      {
        label: 'cat. 1',
        value: 'A1',
        imgSrc: 'assets/images/category-azure-unfilled.png',
      },
    ];
  }
}
