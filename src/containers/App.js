import React, { Component } from 'react';
import './App.css';
import HouseMap from './HouseMap';
import axios from 'axios';
import { findIndex, map } from 'lodash';
import uuidv1 from 'uuid/v1';
import Button from '@material-ui/core/Button';

class App extends Component {
    state = {
        data: null,
        templates: null,
        template: null
    };

    componentDidMount() {
        axios
            .get('http://demo4452328.mockable.io/properties')
            .then(response => this.setState({ data: response.data.data }))
            .catch(error => console.log(error));

        axios
            .get('http://demo4452328.mockable.io/templates')
            .then(response =>
                this.setState({
                    templates: response.data,
                    template: response.data[0]
                })
            )
            .catch(error => console.log(error));
    }

    handleNextTemplateClick = () => {
        this.setState(state => {
            let targetIndex = findIndex(
                state.templates,
                template => template.id === state.template.id
            );
            if (targetIndex < state.templates.length - 1) {
                return { template: state.templates[targetIndex + 1] };
            }
        });
    };

    handleBackTemplateClick = () => {
        this.setState(state => {
            let targetIndex = findIndex(
                state.templates,
                template => template.id === state.template.id
            );

            if (targetIndex > 0) {
                return { template: state.templates[targetIndex - 1] };
            }
        });
    };

    render() {
        const { data, template } = this.state;
        return (
            <div>
                <div className='NavContainer'>
                    Change Template:
                    <Button
                        onClick={this.handleBackTemplateClick}
                        color='secondary'
                    >
                        Back
                    </Button>
                    <Button
                        onClick={this.handleNextTemplateClick}
                        color='primary'
                    >
                        Forward
                    </Button>
                </div>
                <div className='App'>
                    {map(data, item => (
                        <HouseMap
                            key={uuidv1()}
                            data={item}
                            template={template && template.template}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
