import { Component, OnInit } from '@angular/core';
import { RecBullService } from './rec-bull.service';

@Component({
  selector: 'app-rec-bull',
  templateUrl: './rec-bull.component.html',
  styleUrls: ['./rec-bull.component.scss']
})
export class RecBullComponent implements OnInit {
  bulletins: any[] = [];

  constructor(private recBullService: RecBullService) { }

  ngOnInit(): void {
    this.fetchBulletins();
  }

  fetchBulletins() {
    this.recBullService.getBulletins().subscribe(
      (data: any[]) => {
        this.bulletins = data;
      },
      error => {
        console.error('Error fetching bulletins:', error);
      }
    );
  }

  // Méthode pour télécharger les données au format CSV
  downloadCSV() {
    const csvContent = this.convertArrayOfObjectsToCSV(this.bulletins);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'bulletins.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Convertit un tableau d'objets en format CSV
  convertArrayOfObjectsToCSV(data: any[]) {
    const csv = [];
    const headers = Object.keys(data[0]);
    csv.push(headers.join(','));
    data.forEach(item => {
      const values = headers.map(header => this.sanitizeValue(item[header]));
      csv.push(values.join(','));
    });
    return csv.join('\n');
  }

  // Nettoie les valeurs pour le format CSV
  sanitizeValue(value: any) {
    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '""')}"`;
    } else {
      return value;
    }
  }

  // Télécharger un seul bulletin au format CSV
  downloadSingleRowCSV(refBS: string) {
    const bulletin = this.bulletins.find(b => b.refBS === refBS);
    if (!bulletin) {
      console.error('Bulletin not found for refBS:', refBS);
      return;
    }
    const csvContent = this.convertArrayOfObjectsToCSV([bulletin]);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bulletin_${refBS}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
