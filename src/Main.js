//Fuentes consultadas https://reactstrap.github.io/components/layout/
//Fuentes consultadas https://reactjs.org/tutorial/tutorial.html
//Oscar Sanchez

import React, { Component } from 'react';
import {Row, Col } from 'reactstrap';
import Card from './Index_cartas'
import './Main.css';
import './Index_cartas.css';

//imagenes importadas
import bowser from './img/bowser.png'
import DK from './img/DK.png'
import fox from './img/fox.png'
import kirby from './img/kirby.png'
import link from './img/link.png'
import mario from './img/mario.png'
import pikachu from './img/pikachu.png'
import samus from './img/samus.png'
import win from './img/gano.png'// no la use XD


//import logo from './logo.svg';
//import './Index.css';
class Main extends Component {
  constructor(props) {
    super(props);

        var Mis_cartas = this.llenar();

        localStorage.setItem('valor', JSON.stringify(null));
        localStorage.setItem('puntos', JSON.stringify(0));

        this.state = {
            cartas: Mis_cartas,
            initialcartas: Mis_cartas,
            valor: null
        }

        this.llenar = this.llenar.bind(this);
        this.Renderizar = this.Renderizar.bind(this);
        this.Cara= this.Cara.bind(this);
        this.Pareja = this.Pareja.bind(this);

  }
  Pareja(value, id) {
        var previous = JSON.parse(localStorage.getItem('valor'));
        if (!previous) {
            localStorage.setItem('valor', JSON.stringify({ value: value, id: id }));
            return 'null';
        } else {
            if ((value === previous.value) && (id !== previous.id)) {
                localStorage.setItem('valor', JSON.stringify(null));

                setTimeout(() => {
                    document.getElementById(previous.id).style.background = '#094c1f';
                    document.getElementById(previous.id).style.pointerEvents = 'none';
                }, 1000);   
                
                var puntos = JSON.parse(localStorage.getItem('puntos'));
                puntos = puntos + 1;

                if (puntos === 8) {
                    document.getElementById('Gano').innerHTML = "Felicidades Gano!!!";

                }

                localStorage.setItem('puntos', JSON.stringify(puntos));

                return 'puntea';
            } else {
                localStorage.setItem('valor', JSON.stringify(null));                
                return 'no_puntea';
            };
        }
    }//<img src={require('/images/image-name.png')}
    llenar() {
        var vals = [
            { val: 1, Img_cartas: bowser},
            { val: 1, Img_cartas: bowser},
            { val: 2, Img_cartas: DK},
            { val: 2, Img_cartas: DK},
            { val: 3, Img_cartas: fox},
            { val: 3, Img_cartas: fox},
            { val: 4, Img_cartas: kirby},
            { val: 4, Img_cartas: kirby},
            { val: 5, Img_cartas: link},
            { val: 5, Img_cartas: link},
            { val: 6, Img_cartas: mario},
            { val: 6, Img_cartas: mario},
            { val: 7, Img_cartas: pikachu},
            { val: 7, Img_cartas: pikachu},
            { val: 8, Img_cartas: samus},
            { val: 8, Img_cartas: samus}
        ];
        var cartas = [];
        for (var i = vals.length-1; i >= 0; i--) {
            var element = vals.splice(Math.floor(Math.random()*vals.length), 1).pop();
            cartas.push({ id: i, value: element.val, Img_cartas: element.Img_cartas });
        }

        return cartas;
    }
     Renderizar() {
        var cartas = this.Cara();
        var finalcartas = [];

        for (var j = 0; j < 4; j++) {
            finalcartas.push(
                <Row>
                    { cartas.pop() }
                    { cartas.pop() }
                    { cartas.pop() }
                    { cartas.pop() }
                </Row>
            );
        }

        return finalcartas.map((card, Main) => {
            return(
                <div key={ Main }>
                    { card }
                </div>
            );
        });
        
    }
    Cara() {
        var cartas = [];
        var statecartas = this.state.cartas;
        for (var i = 0; i < 16; i++) {
            var card = statecartas.pop();
            cartas.push(
                <Col className="Mesa">
                    <Card 
                        id={ card.id } 
                        value={ card.value } 
                        Img_cartas={ card.Img_cartas } 
                        Pareja={ this.Pareja }
                        isFlipped={ false }
                    />                
                </Col>
            );
        }
        return cartas;
    }

//<img src={require('./img/mario.png')}/>

  render() {
    return (
        <div className="Pagina">
            <div className="Pagina-header">
            <h2>MemoriaWEB_LAB_6</h2> 
            <div className="wrapper"> 
            {this.Renderizar()}   
             </div>   
             <div className="Gano" id="Gano">
                    </div>
            </div>
        </div>    
                  
        );
    }
}

export default Main;
