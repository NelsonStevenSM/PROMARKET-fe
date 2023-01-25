import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VERSION } from '@angular/material';
import { Router } from '@angular/router';
import { GrupoOpcionDto } from './model/grupoOpcion-dto';
import { NavItem } from './model/nav-item';
import { NavService } from './service/nav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit, OnInit {

  @ViewChild('sidenav', { static: true }) sidenav: ElementRef;

  grupoOpciones: GrupoOpcionDto[];
  version = VERSION;
  options: FormGroup;
  navItems: NavItem[];

  constructor(fb: FormBuilder, private router: Router,
    private navService: NavService) {
  }

  loadMenu() {
    this.navItems = [];

    let navItem = {} as NavItem;
    navItem.displayName = "Gestión de Proyectos";
    //navItem.iconName = grupoOpcion.grpoIcono;

    let children: NavItem[];
    children = [];

    let itemChild = {} as NavItem;
    //itemChild.iconName = opcion.opcIcono;
    itemChild.displayName = "Proyecto 1";
    itemChild.route = "proyecto1";
    children.push(itemChild);

    itemChild = {} as NavItem;
    //itemChild.iconName = opcion.opcIcono;
    itemChild.displayName = "Proyecto 2";
    itemChild.route = "proyecto2";
    children.push(itemChild);
    
    navItem.children = children;
    this.navItems.push(navItem);

    navItem = {} as NavItem;
    navItem.displayName = "Gestión de Usuarios";

    children = [];

    itemChild = {} as NavItem;
    //itemChild.iconName = opcion.opcIcono;
    itemChild.displayName = "Usuarios";
    itemChild.route = "usuarios";
    children.push(itemChild);

    navItem.children = children;
    this.navItems.push(navItem);

  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.sidenav;
    this.loadMenu();
  }

  ngOnInit() {
    this.loadMenu();
  }

  logout(): void {
    this.router.navigate(['/authentication']);
  }
}
