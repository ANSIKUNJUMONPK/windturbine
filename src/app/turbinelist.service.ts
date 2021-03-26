import { Injectable } from '@angular/core';
import { Wtgs } from './models/wtgs.model';
import { wtgsList } from './sample-data.helper';
import { inspectiondata } from './models/inspection.model';
import { InspectionData } from './inspection-data.helper';
@Injectable({
  providedIn: 'root',
})
export class TurbinelistService {
  wtgsList: Wtgs[] = wtgsList;
  InspectionData: inspectiondata[] = InspectionData;
  constructor() {}
}
