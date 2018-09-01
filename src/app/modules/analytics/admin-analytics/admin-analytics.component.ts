import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'tm-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {

  public selectedValue = [];

  expanded = false;

  selectedAll = [];
  statusType: any;
  selectedAllStatus: any;

  allDocType: any;
  selectedAllDocType: any;

  constructor() {
    this.selectedAll = ['nnnn'];
    this.statusType = [
      { name: 'Verified', selected: false },
      { name: 'Non-Verified', selected: false },
    ];
    this.allDocType = [
      { name: 'Site Specific', selected: false },
      { name: 'Global', selected: false },
    ];


  }


  //  ======table checkbox filter =====

  selectAllStatus() {
    for (let i = 0; i < this.statusType.length; i++) {
      if (this.statusType[i].selected === true) {
        this.selectedAll.push(this.statusType[i].name);
      }
      this.statusType[i].selected = this.selectedAllStatus;
    }
  }
  checkIfAllStatusSelected() {
    this.selectedAllStatus = this.statusType.every(function (item: any) {
      return item.selected === true;
    });
  }

  selectAllDocs() {
    for (let i = 0; i < this.allDocType.length; i++) {
      this.allDocType[i].selected = this.selectedAllDocType;
    }
  }
  checkIfAllDocsSelected() {
    this.selectedAllDocType = this.allDocType.every(function (item: any) {
      return item.selected === true;
    });
  }

  showCheckboxes() {
    const checkboxes = document.getElementById('checkboxes');
    if (!this.expanded) {
      checkboxes.style.display = 'block';
      this.expanded = true;
    } else {
      checkboxes.style.display = 'none';
      this.expanded = false;
    }
  }

  toggleChildList(e) {
    const prev = e.target.parentElement.previousElementSibling;
    const next = e.target.parentElement.nextElementSibling;
    if (prev !== null && prev.classList.contains('active')) {
      e.target.parentElement.previousElementSibling.classList.remove('active');
    } else if (next !== null && next.classList.contains('active')) {
      e.target.parentElement.nextElementSibling.classList.remove('active');
    }
    e.target.parentElement.classList.toggle('active');
  }

  //  ======table checkbox filter end=====

  ngOnInit() {


  } // ngOnInit end

}
