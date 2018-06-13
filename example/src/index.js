import React from 'react';
import Luo from '../../dist/index.js';
import ReactDom from 'react-dom';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: [1,2,3],
        canUp: true,
        canDown: true,
    };
  }

  // 组件初始化完毕时触发
  componentDidMount() {
  }

  onDown() {
    console.log('触发了吗111');
    const t = this;
    setTimeout(function(){
      t.setState({
        data: [1,2,3]
      });
    }, 10000);
  }

  onUp() {
    const t = this;
    console.log('触发了吗');
  	setTimeout(function(){
      t.setState({
        data: [...t.state.data, 1,2,3,4,5,6]
      });
    }, 10000);
  }
    onCanUp(){
      this.setState({
          canUp: !this.state.canUp
      })
    }

    onCanDown(){
        this.setState({
            canDown: !this.state.canDown,
        })
    }
  render() {
    console.log('是个什么：', this.state.data);
    return [
        <Luo key="0" id="test"
    			onDown={() => this.onDown()}
    			onUp={()=> this.onUp()}
                canUp={this.state.canUp}
                canDown={this.state.canDown}
    		>
  			<div>
  				{this.state.data.map((v, i) => {
  					return <div key={i}>{v}</div>
  				})}
  			</div>
  		</Luo>,
        <button key="1" onClick={()=>this.onCanUp()}>canUp:{String(this.state.canUp)}</button>,
        <button key="2" onClick={()=>this.onCanDown()}>canDown:{String(this.state.canDown)}</button>
    ];
  }
}

ReactDom.render(
	<Test />,
	document.getElementById('box')
);
