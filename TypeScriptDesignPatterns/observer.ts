interface Observable {
    registerObserver(o: Observer);
    removeObserver(o: Observer);
    notifyObservers();
}

interface Observer {
    update(temperature: number);
}

class WeatherStation implements Observable {
    private temperature: number;
    private observers: Observer[] = [];

    setTemperature(temp: number) {
        console.log("WeatherStation: new temperature measurement" + temp);
        this.temperature = temp
        this.notifyObservers();
    }

    registerObserver(o: Observer) {
        this.observers.push(o);
    }

    removeObserver(o: Observer) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }

    notifyObservers() {
        for(let observer of this.observers) {
            observer.update(this.temperature);
        }
    }
}

class TemperatureDisplay implements Observer {
    private observable: Observable;

    constructor(weatherStation: Observable) {
        this.observable = weatherStation;
        weatherStation.registerObserver(this);
    }

    update(temperature: number) {
        console.log('TemperatureDisplay: I need to update my display.');
        //logic here
    } 
}

class Fan implements Observer {
    private observable: Observable;

    constructor(weatherStation: Observable) {
        this.observable = weatherStation;
        weatherStation.registerObserver(this);
    }

    update(temperature: number) {
        if(temperature > 25) {
            console.log('Fan: its hot here, turning myself on...')
            // logic here
        } else {
            console.log('Fan: its nice and cool, turning myself off...')
            //logic here
        }
    } 
}

let weatherStation = new WeatherStation();

let tempDisplay = new TemperatureDisplay(weatherStation);
let fan = new Fan(weatherStation);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);