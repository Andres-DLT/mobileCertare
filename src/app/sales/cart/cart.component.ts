import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  get totalProducts(): number {
    return this.cartService.getTotalUnits();
  }

  get totalCost(): number {
    return this.cartService.getTotalCost();
  }

  removeUnit(item: CartItem) {
    this.cartService.removeUnit(item);
  }

  addUnit(item: CartItem) {
    this.cartService.addUnit(item);
  }
}
