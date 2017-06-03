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
    const t = this;
    setTimeout(function(){
      t.setState({
        data: [1,2,3]
      });
    }, 1000);
  }

  onUp() {
    const t = this;
  	setTimeout(function(){
      t.setState({
        data: [...t.state.data,1,2,3]
      });
    }, 1000);
  }

  render() {
    return (
        <IscrollLuo id="test"
			detectionHeight={true}
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
