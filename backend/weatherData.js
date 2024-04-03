class WeatherData {

    constructor(temp, humidity, airPressure, UpdatedDateTime, district) {
        this._temp = temp;
        this._humidity = humidity;
        this._airPressure = airPressure;
        this._UpdatedDateTime = UpdatedDateTime;
        this._district = district;
    }

    get temperature() {
        return this._temp;
    }

    set temperature(value) {
        this._temp = value;
    }

    get humidity() {
        return this._humidity;
    }

    set humidity(value) {
        this._humidity = value;
    }

    get airPressure() {
        return this._airPressure;
    }
    
    set airPressure(value) {
        this._airPressure = value;
    }

    get lastUpdatedDateTime() {
        return this._UpdatedDateTime;
    }
    
    set lastUpdatedDateTime(value) {
        this._UpdatedDateTime = value;
    }

    get district() {
        return this._district;
    }
    
    set district(value) {
        this._district = value;
    }
}

module.exports = WeatherData;