import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../card/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {

  cards: Array<Card> = [];
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }
}
