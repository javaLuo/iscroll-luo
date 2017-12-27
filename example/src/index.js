import React from 'react';
import IscrollLuo from '../../dist/index.js';
import ReactDom from 'react-dom';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: [1,2,3],
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
    }, 1000);
  }

  onUp() {
    const t = this;
    console.log('触发了吗');
  	setTimeout(function(){
      t.setState({
        data: [1,2,3,4,5,6]
      });
    }, 1000);
  }

  render() {
    console.log('是个什么：', this.state.data);
    return (
        <IscrollLuo id="test"
    			onPullDownRefresh={() => this.onDown()}
    			onPullUpLoadMore={()=> this.onUp()}
    		>
  			<div>
  				{this.state.data.map((v, i) => {
  					return <div key={i}>{v}</div>
  				})}
  			</div>
  		</IscrollLuo>
    );
  }
}

ReactDom.render(
	<Test />,
	document.getElementById('box')
);
