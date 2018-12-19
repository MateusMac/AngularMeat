import { Component, OnInit } from '@angular/core';
import { RestaurantesService } from '../restaurantes/restaurantes.service';
import { Restaurante } from 'app/restaurantes/restaurante/restaurante.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurante-detail',
  templateUrl: './restaurante-detail.component.html'
})
export class RestauranteDetailComponent implements OnInit {

  restaurante: Restaurante

  constructor(private restaurantesService: RestaurantesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.restaurantesService.restauranteById(this.route.snapshot.params['id']).subscribe(restaurante => this.restaurante = restaurante)
  }

}
