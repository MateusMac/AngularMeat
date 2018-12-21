import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";

export class LeaveOrderguard implements CanDeactivate<OrderComponent> {

    canDeactivate(orderComponent: OrderComponent, activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {

        if (!orderComponent.isOrderCompleted()) {

            return window.confirm('Deseja dsistir da compra?')
        } else {

            return true
        }
    }
}