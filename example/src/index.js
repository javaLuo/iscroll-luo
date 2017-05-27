import React from 'react';
import IscrollLuo from '../../dist/index.js';
import {render} from 'react-dom';


var element = document.getElementById('box');
render(
	<IscrollLuo id="test"
		detectionHeight={true}
		onPullDownRefresh={() => function(){}}
		onPullUpLoadMore={()=> function(){}}
	>
		<div>
		<div>A123</div>
		<div>B123</div>
		<div>C123</div>
		<div>D123</div>
		<div>E123</div>
		<div>F123</div>
		<div>A123</div>
		<div>B123</div>
		<div>C123</div>
		<div>D123</div>
		<div>E123</div>
		<div>F123</div>
		<div>A123</div>
		<div>B123</div>
		<div>C123</div>
		<div>D123</div>
		<div>E123</div>
		<div>F123</div>
		<div>A123</div>
		<div>B123</div>
		<div>C123</div>
		<div>D123</div>
		<div>E123</div>
		<div>F123</div>
		</div>
	</IscrollLuo>,
	element
	);
