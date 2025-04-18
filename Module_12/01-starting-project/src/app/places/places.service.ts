import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError, Observable, tap } from 'rxjs';
import { ErrorService } from '../../../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject (ErrorService);
  private httpClient = inject(HttpClient);

  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces("places", "Something went wrong fetching the available places. Please try again later.");
  }

  loadUserPlaces() {
    return this.fetchPlaces("user-places", "Something went wrong fetching your favorite places. Please try again later.")
      .pipe(tap({
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      }))
    ;
  
  
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if(!prevPlaces.some(e => e.id === place.id)){
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put("http://localhost:3000/user-places", {
      placeId: place.id
    })
    .pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);

        this.errorService.showError("Failed to store selected place");

        return throwError(() => new Error("Failed to store selected place"))
      })
    )
    ;
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if(prevPlaces.some(e => e.id === place.id)){
      this.userPlaces.set(prevPlaces.filter(e => e.id != place.id));
    }


    return this.httpClient.delete(`http://localhost:3000/user-places/${place.id}`)
    .pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);

        this.errorService.showError("Failed to delete selected place");

        return throwError(() => new Error("Failed to delete selected place"))
      })
    )
  }

  private fetchPlaces(endpoint: string, errorMessage: string): Observable<Place[]> {
    return this.httpClient.get<{places: Place[]}>(`http://localhost:3000/${endpoint}`, {
        observe: "body"
       })
       .pipe(
          map((resData) => resData.places),
          catchError((error, observable) => {
            console.log(error);
            return throwError(() => 
              new Error(errorMessage));
          })
       );
  }
}
