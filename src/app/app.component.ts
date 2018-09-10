import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
    
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
        
export class AppComponent implements OnInit {
    title = 'Trip Planner';
    city= 'Edmonton';
    currentWeather = '';
    currentTemperature = '';
    cityName = '';
    summary = '';
    forecastWeather = '';
    year = new Date().getFullYear();
           
    constructor(private http: HttpClient){
        
    }

    ngOnInit(): void {
        this.updateInfo(this.city);
    }
    
    //On city selector changed
    public onChangeCity(event): void { 
        const city = event.target.value;        
        this.updateInfo(city);
    }
    
    /**
     * Updates city info for a given city
     */
    private updateInfo(city){
            
        //Query the open weather map api for current weather
        this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=7e1ede4276f9c1ac7d8134c59abf9036')
            .subscribe((data:any) => {
            this.currentWeather =  data.weather[0].description;
            this.cityName =  data.name;
            this.currentTemperature = Math.round(data.main.temp - 273.15) + '  C';//convert Kelvin result to celsius
        });

        //Query the wikipedia API
        this.http.get('https://en.wikipedia.org/w/api.php?action=query&titles=' + city + '&prop=extracts&format=json&rvprop=content&origin=*&exintro&explaintext').subscribe((data:any) => {
            var pageInfo = data.query.pages;            
            this.summary = pageInfo[Object.keys(pageInfo)[0]].extract;
        });
    }
    
    /**
     * Gets a city's 5 day forecast
     */
    private getForecast(city){
        //Query the open weather map API for 5 day forecast weather
        this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=7e1ede4276f9c1ac7d8134c59abf9036').subscribe(data => {
            
        });        
    }
}
