import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';
import { ProMarketService } from 'src/app/shared/services/promarket.service';
import { NavItem } from '../menu/model/nav-item';
import { NavService } from '../menu/service/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  azure: string;
  flagLogueo :boolean = false;
  username;
  navItems: NavItem[];
  constructor(private router: Router,
    public navService: NavService,
    private event: EventService,
    private service: ProMarketService) {
  }
  toggleActive = false;

  ngOnInit() {
    if (sessionStorage.getItem("flagLogueo") == null) {
      this.flagLogueo = false
    } else {
      this.flagLogueo = !!sessionStorage.getItem("flagLogueo");
    }
    this.getUsuario()
  }

  logout(): void {
    this.flagLogueo = false;
    sessionStorage.clear()
    this.router.navigate(['/authentication']);
    this.event.rutaEvent.emit('/authentication');
  }

  private getUsuario() {
    this.service.getUsuario(sessionStorage.getItem('token'), sessionStorage.getItem("username"))
      .subscribe(
        r => {
          sessionStorage.setItem("rol", r.rol.toString())
          this.loadMenu()
        }
      )
  }

  private loadMenu() {
    this.navItems = [];

    let navItem = {} as NavItem;
    navItem.displayName = "Gestión de Proyectos";

    let children: NavItem[];
    children = [];

    let itemChild = {} as NavItem;
    itemChild.iconName = "storefront"
    itemChild.displayName = "Proyecto 1";
    itemChild.route = "proyecto1";
    children.push(itemChild);

    itemChild = {} as NavItem;
    itemChild.iconName = "storefront"
    itemChild.displayName = "Proyecto 2";
    itemChild.route = "proyecto2";
    children.push(itemChild);

    navItem.children = children;
    this.navItems.push(navItem);

    // console.log(sessionStorage.getItem("rol"))

    if (+sessionStorage.getItem("rol") === 1) {
      navItem = {} as NavItem;
      navItem.displayName = "Gestión de Usuarios";

      children = [];

      itemChild = {} as NavItem;
      itemChild.iconName = "manage_accounts"
      itemChild.displayName = "Usuarios";
      itemChild.route = "usuario";
      children.push(itemChild);

      navItem.children = children;
      this.navItems.push(navItem);

      //REPORTERIA
      navItem = {} as NavItem;
      navItem.displayName = "Módulo de Consulta";

      children = [];

      itemChild = {} as NavItem;
      itemChild.iconName = "assignment"
      itemChild.displayName = "Puestos Vendidos";
      itemChild.route = "venta";
      children.push(itemChild);

      navItem.children = children;
      this.navItems.push(navItem);
    }
  }
}
