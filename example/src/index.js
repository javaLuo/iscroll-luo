import React from 'react';
import Aaa from '../../dist/index.js';
import {render} from 'react-dom';


var element = document.getElementById('box');
render(<Aaa id="test"><span>123</span></Aaa>, element);
