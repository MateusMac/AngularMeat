import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.services';
import { CartItem } from 'app/restaurante-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup
  delivery: number = 8
  orderId: string

  //emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  paymentOptions: RadioOption[] = [

    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Referição', value: 'CRE' }
  ]

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {

    this.orderForm = new FormGroup({

      name: new FormControl('', { validators: [Validators.required, Validators.minLength(5)] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      emailConfirmation: new FormControl('', { validators: [Validators.required, Validators.email] }),
      adress: new FormControl('', { validators: [Validators.required, Validators.minLength(5)] }),
      number: new FormControl('', { validators: [Validators.required, Validators.pattern(this.numberPattern)] }),
      optionalAdress: new FormControl(''),
      paymentOption: new FormControl('', { validators: [Validators.required] })
    }, { validators: [OrderComponent.equalsTo], updateOn: 'change' })
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {

    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if (!email || !emailConfirmation) {

      return undefined
    }

    if (email.value !== emailConfirmation.value) {

      return { emailsNotMatch: true }
    }
  }

  itemsValue(): number {

    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {

    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {

    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {

    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {

    this.orderService.remove(item)
  }

  isOrderCompleted(): boolean {

    return this.orderId !== undefined
  }

  checkOrder(order: Order) {

    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order).pipe(tap((orderId: string) => { this.orderId = orderId })).subscribe((orderId: string) => {

      this.router.navigate(['/order-summary'])
      this.orderService.clear()
    })
  }
}
