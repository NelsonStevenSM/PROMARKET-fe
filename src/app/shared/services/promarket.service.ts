import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RqAuthentication } from "../model/authentication-dto/rq.authentication";
import { RsAuthentication } from "../model/authentication-dto/rs.authentication";
import { Ventas } from "../model/consultas-dto/ventas";
import { Puesto } from "../model/database-dto/puesto";
import { Usuario } from "../model/database-dto/usuario";

@Injectable({
    providedIn: 'root'
})
export class ProMarketService {
    constructor(private http: HttpClient) { }

    //PUESTOS
    public getPuestos = (token: string, id: string): Observable<Puesto[]> => {
        return this.http.get<Puesto[]>(this.routeProMarket('puesto/nivel/'+ id), this.generateHeaders(token));
    }

    public getPuesto = (token: string, id: string): Observable<Puesto> => {
        return this.http.get<Puesto>(this.routeProMarket('puesto/' + id), this.generateHeaders(token));
    }

    public getPuestosByFilter = (token: string, body: Puesto): Observable<Puesto[]> => {
        return this.http.post<Puesto[]>(this.routeProMarket('puesto/buscar'), body, this.generateHeaders(token));
    }

    public updatePuesto = (token: string, body: Puesto): Observable<number[]> => {
        return this.http.post<number[]>(this.routeProMarket('puesto/actualizar'), body, this.generateHeaders(token));
    }

    public savePuesto = (token: string, body: Puesto): Observable<number> => {
        return this.http.post<number>(this.routeProMarket('puesto'), body, this.generateHeaders(token));
    }

    public reiniciarPuesto = (token: string, body: Puesto): Observable<number> => {
        return this.http.post<number>(this.routeProMarket('puesto/reiniciar'), body, this.generateHeaders(token));
    }

    //LOGIN
    public getToken = (body: RqAuthentication): Observable<RsAuthentication> => {
        return this.http.post<RsAuthentication>(this.routeProMarket('authentication'), body);
    }

    //REPORTES
    public getVentas = (token: string): Observable<Ventas[]> => {
        return this.http.get<Ventas[]>(this.routeProMarket('reporte'), this.generateHeaders(token));
    }

    //USUARIOS
    public changeStatus = (token: string, body: Usuario): Observable<number> => {
        return this.http.post<number>(this.routeProMarket('usuario/estado'), body, this.generateHeaders(token));
    }

    public updateUsuario = (token: string, body: Usuario): Observable<number> => {
        return this.http.post<number>(this.routeProMarket('usuario/actualizar'), body, this.generateHeaders(token));
    }

    public createUsuario = (token: string, body: Usuario): Observable<number> => {
        return this.http.post<number>(this.routeProMarket('usuario'), body, this.generateHeaders(token));
    }

    public getUsuario = (token: string, id: string): Observable<Usuario> => {
        return this.http.get<Usuario>(this.routeProMarket('usuario/' + id), this.generateHeaders(token));
    }

    public getUsuariosByRol = (token: string): Observable<Usuario[]> => {
        return this.http.get<Usuario[]>(this.routeProMarket('usuario/by/rol'), this.generateHeaders(token));
    }

    public getUsuarios = (token: string): Observable<Usuario[]> => {
        return this.http.get<Usuario[]>(this.routeProMarket('usuario'), this.generateHeaders(token));
    }

    //INICIA RUTAS
    private routeProMarket = (route: string) => {
        return `${environment.urlAddress}/${route}`;
    }

    //GENERADOR DE HEADERS
    private generateHeaders = (token: string) => {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                "x-token": token
            })
        }
    }
}