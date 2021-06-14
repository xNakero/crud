import React from 'react'
import axios from 'axios'
import '../css/styles.css';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/voivodeships'
})

class VoivodeshipsCities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            voivodeships: [{
                id: null,
                name: null,
                country: null,
             }],
            name: null,
            country: null,
            current_voivodeship: null,
            current_voivodeship_name: null, 
            cities: [{
                id: null,
                name: null,
                population: null,
                area: null
            }],
            city_name: null,
            population: null,
            area: null
        }
    }

    updateVoivodeships = () => {
        this.forceUpdate()
    }

    getVoivodeships = () => {
        api.get("")
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        voivodeships:res.data
                    })
                }} 
            )
    }

    createVoivodeship = () => {
        var data = {
            name: this.state.name,
            country: this.state.country
        }
        api.post("", data)
            .then(res => {
                if (res.status === 201) {
                   this.setState({
                      voivodeships: this.state.voivodeships.concat([res.data])
                   })
                   this.forceUpdate()
                }
            })
    }

    deleteVoivodeship = (id) => {
        api.delete("/" + id)
            .then(res => {
                if (res.status === 200) {
                    var index = this.state.voivodeships
                        .findIndex(x => x.id === id)
                    this.state.voivodeships.splice(index, 1)
                    if (this.state.current_voivodeship === id) {
                        this.setState({
                            cities: []
                        })
                    }
                    this.setState({
                        current_voivodeship: null,
                        current_voivodeship_name: null
                    })
                    this.forceUpdate()
                }
            })
    }

    updateVoivodeship = (id) => {
        var data = {
            name: this.state.name,
            country: this.state.country
        }
        api.put("/" + id, data)
            .then(res => {
                if (res.status === 200) {
                    var index = this.state.voivodeships
                        .findIndex(x => x.id === id)
                    this.state.voivodeships[index].name = data.name
                    this.state.voivodeships[index].country = data.country
                    this.forceUpdate()
                }
            })
    }
    
    initCities = () => {
        this.setState({
            cities: []
        })
    }

    getCities = (id) => {
        api.get("/" + id + "/cities")
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        cities: res.data,
                        current_voivodeship: id,
                        current_voivodeship_name: this.state.voivodeships
                            .filter(x => x.id === id)
                            .map(function(item) {return item.name})
                    })
                }   
            })
    }

    createCity = () => {
        var data = {
            name: this.state.city_name,
            population: this.state.population,
            area: this.state.area
        }
        if (this.state.current_voivodeship !== null) {
            api.post("/" + this.state.current_voivodeship + "/cities", data)
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        cities: this.state.cities.concat([res.data])
                    })
                    this.forceUpdate()
                }
            })
        }
        
    }

    deleteCity = (id) => {
        api.delete("/" + this.state.current_voivodeship + "/cities/" + id)
            .then(res => {
                if (res.status === 200) {
                    var index = this.state.cities
                        .findIndex(x => x.id === id)
                    this.state.cities.splice(index, 1)
                    this.forceUpdate()
                }
            })
    }

    updateCity = (id) => {
        var data = {
            name: this.state.city_name,
            population: this.state.population,
            area: this.state.area
        }
        api.put("/" + this.state.current_voivodeship + "/cities/" + id, data)
            .then(res => {
                if (res.status === 200) {
                    var index = this.state.cities
                        .findIndex(x => x.id === id)
                    this.state.cities[index].name = data.name
                    this.state.cities[index].population = data.population
                    this.state.cities[index].area = data.area
                    this.forceUpdate()
                }
            })
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleCountryChange = (e) => {
        this.setState({
            country: e.target.value
        })
    }

    handleCityNameChange = (e) => {
        this.setState({
            city_name: e.target.value
        })
    }

    handlePopulationChange = (e) => {
        this.setState({
            population: e.target.value
        })
    }

    handleAreaChange = (e) => {
        this.setState({
            area: e.target.value
        })
    }

    componentDidMount() {
        this.getVoivodeships()
        this.initCities()
    }

    render() {
        return (
            <div>
                <h2>Województwa</h2>
                {this.state.voivodeships.map(voivodeship => 
                    <li key={voivodeship.id}>
                        {
                            ["Name: ", voivodeship.name, ", Country: ", voivodeship.country]
                        }
                        <button class = "button-edit" onClick = { () => this.updateVoivodeship(voivodeship.id) }>Edit</button>
                        <button class = "button-delete" onClick = { () => this.deleteVoivodeship(voivodeship.id) }>Delete</button>
                        <button class = "button-show-cities" onClick = { () => this.getCities(voivodeship.id) }>Show Cities</button>
                    </li>  
                )} 
                <p>Name</p>
                <p>
                    <input onChange = {this.handleNameChange} type = "text"/>
                </p>
                <p>Country</p>
                <p>
                    <input onChange = {this.handleCountryChange} type = "text"/>
                </p>
                <p>
                    <button class = "button-add" onClick = {this.createVoivodeship}>Add</button>
                </p>
                <h2>Miasta {this.state.current_voivodeship_name}</h2>
                {this.state.cities.map(city => 
                    <li key = {city.id}>
                        {
                            ["Name: ", city.name, " Population: ", city.population, " Area: ",city.area]
                        }
                        <button class = "button-edit" onClick = { () => this.updateCity(city.id) }>Edit</button>
                        <button class = "button-delete" onClick = { () => this.deleteCity(city.id) }>Delete</button>  
                    </li>
                )}
                <p>Name</p>
                <p>
                    <input onChange = {this.handleCityNameChange} type = "text"/>
                </p>
                <p>Population</p>
                <p>
                    <input onChange = {this.handlePopulationChange} type = "number"/>
                </p>
                <p>Area</p>
                <p>
                    <input onChange = {this.handleAreaChange} type = "number"/>
                </p>
                <p>
                    <button class = "button-add" onClick = {this.createCity}>Add</button>
                </p>
            </div>
        )
    }
}

export default VoivodeshipsCities