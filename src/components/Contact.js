import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Card, { CardTitle, CardContent, CardImage } from 'calcite-react/Card';
import {
  CalciteP,
  CalciteH2,
  CalciteOl,
  CalciteLi,
  CalciteUl,
  CalciteA,
} from 'calcite-react/Elements';

export class Contact extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Card
          wide
          style={{
            width: '80%',
            textAlign: 'left',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '30px',
            display: 'block',
          }}
        >
          {/* <CardImage
            wide
            src={}
            caption="Florida, January 1954"
            alt="Bridge Club, 1954"
          /> */}
          <CardContent wide>
            <CalciteH2>Drop me a line</CalciteH2>
            <p>
              Got questions or comments? Contact Kevin by email at
              <CalciteA> cheriyan@umd.edu</CalciteA> or on{' '}
              <CalciteA href="https://twitter.com/kevincheriyan">
                Twitter
              </CalciteA>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Contact;
