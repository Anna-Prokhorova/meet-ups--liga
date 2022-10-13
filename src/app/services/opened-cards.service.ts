import { Injectable } from '@angular/core';
import { IMeetup } from '../entities/meetup';

@Injectable({
  providedIn: 'root'
})
export class OpenedCardsService {
  cards: number[] = [];
  constructor() { 
    const opened = localStorage.getItem('opened_cards')?.split(' ').map((el) => +el);
    if (opened) {
      this.cards = opened;
    }
    else {
      localStorage.setItem('opened_cards',this.cards.join(' '))
    }
  }

  public initOpenedCards(){
    localStorage.setItem('opened_cards',this.cards.join(' '))
  }

  public addOpenedCard(meetup: IMeetup) {
    this.cards.push(meetup.id);
    this.initOpenedCards();
  }

  public removeOpenedCard(meetup: IMeetup) {
    this.cards.splice(this.cards.indexOf(meetup.id),1);
    this.initOpenedCards();
  }

  public getOpenedCards() {
    return localStorage.getItem('opened_cards')?.split(' ').map((el) => +el)
  }
}
