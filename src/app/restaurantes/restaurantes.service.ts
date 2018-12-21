import { Restaurante } from "./restaurante/restaurante.model";
import { MEAT_API } from '../app.api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { MenuItem } from "app/restaurante-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantesService {

    constructor(private http: HttpClient) { }

    restaurantes(search?: string): Observable<Restaurante[]> {

        let params: HttpParams = undefined

        if (search) {

            params = new HttpParams().append('q', search)
        }

        return this.http.get<Restaurante[]>(`${MEAT_API}/restaurants`, { params: params })
    }

    restauranteById(id: string): Observable<Restaurante> {

        return this.http.get<Restaurante>(`${MEAT_API}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id: string): Observable<any> {

        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    menuOfRestaurante(id: string): Observable<MenuItem[]> {

        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
    }
}