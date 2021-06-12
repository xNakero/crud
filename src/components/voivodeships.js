import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/voivodeships'
})

class Voivodeships extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            voivodeships: [{
                id: null,
                name: null,
                country: null,
             }],
            name: null,
            country: null
        }
    }

    getVoivodeships = () => {
        api.get("")
            .then(res => 
                this.setState({
                    voivodeships:res.data
                })
            )
    }

    createVoivodeship = () => {
        var data = {
            name: this.state.name,
            country: this.state.country
        }
        api.post("", data)
    }

    deleteVoivodeship = (id) => {
        api.delete("/" + id)
    }

    updateVoivodeship = (id) => {
        var data = {
            name: this.state.name,
            country: this.state.country
        }
        api.put("/" + id, data)
    }

    componentDidMount() {
            this.getVoivodeships()
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

    componentWillUpdate() {
        this.getVoivodeships()
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
                        <button onClick = { () => this.updateVoivodeship(voivodeship.id) }>Edit</button>
                        <button onClick = { () => this.deleteVoivodeship(voivodeship.id) }>Delete</button>
                    </li>  
                )}
                <br></br>   
                Name:
                <input onChange = {this.handleNameChange} type = "text"/>
                Country:
                <input onChange = {this.handleCountryChange} type = "text"/>
                <button onClick = {this.createVoivodeship}>Add</button>    
            </div>
        )
    }
}

export default Voivodeships