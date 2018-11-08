//Fuentes consultadas https://reactstrap.github.io/components/layout/
//Fuentes consultadas https://reactjs.org/tutorial/tutorial.html
//Fuentes consultadas https://www.w3schools.com/css/css3_animations.asp
//Oscar Sanchez

import React, { Component } from 'react';
import './Index_cartas.css';
import logo from './logo.png'

class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id || 100,
            value: this.props.value || 100,
            isFlipped: this.props.isFlipped || false,
            Img_cartas: this.props.Img_cartas || './img/logo.svg',
            locked: this.props.locked || false
        }
        
        this.flipCard = this.flipCard.bind(this);
        this.flipAndCheck = this.flipAndCheck.bind(this);
    }

    flipCard() {
        var status = this.state.isFlipped;
        this.setState({ isFlipped: !status });
    }

    flipAndCheck() {
        this.flipCard();
        var check = this.props.Pareja(this.state.value, this.state.id);

        if (check === 'puntea') {
            setTimeout(() => {
                this.setState({ locked: true });
            }, 1000);            
        } else if (check === 'no_puntea') {
            setTimeout(() => {
                this.setState({ isFlipped: false });
            }, 1000);
        } if (check === 'null') {
            setTimeout(() => {
                this.setState({ isFlipped: false });
            }, 2000); 
        }
    }

    render() {
        if (this.state.locked) {
            return (
                <div className="Usada" id={ this.state.id } >
                    <img width="70%" src={logo} />
                </div>
            );
        } else if (this.state.isFlipped) {
            return (
                <div className="boca_arriba" onClick={ () => this.flipCard() } id={ this.state.id }>
                    <img width="30" src={ this.state.Img_cartas } />
                </div>
            );
        } else {
            return (
                <div className="boca_abajo" onClick={ () => this.flipAndCheck() } id={ this.state.id }>
                    <img width="70%" src={logo} />
                </div>
            );
        }
    }

}

export default Card;