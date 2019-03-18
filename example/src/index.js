import React from 'react';
// import Luo from '../../dist/index.js';
import Luo from 'iscroll-luo';
import ReactDom from 'react-dom';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3],
      noUp: false,
      noDown: false,
    };
  }

  // 组件初始化完毕时触发
  componentDidMount() {}

  onDown() {
    console.log('触发了吗111');
    const t = this;
    setTimeout(function() {
      t.setState({
        data: [1, 2, 3],
      });
    }, 3000);
  }

  onUp() {
    const t = this;
    console.log('触发了吗');
    setTimeout(function() {
      t.setState({
        data: [...t.state.data, 1, 2, 3, 4, 5, 6],
      });
    }, 2000);
  }
  onCanUp() {
    this.setState({
      noUp: !this.state.noUp,
    });
  }

  onCanDown() {
    this.setState({
      noDown: !this.state.noDown,
    });
  }
  render() {
    console.log('是个什么：', this.state.data);
    return [
      <Luo
        key="0"
        id="test"
        iscrollOptions={{
          preventDefault: false,
          mouseWheel: true,
        }}
        onDown={() => this.onDown()}
        onUp={() => this.onUp()}
        noUp={this.state.noUp}
        noDown={this.state.noDown}
        noUpStr={'已全部加载完毕'}
        noDownStr={'asfadfdddddddddddd'}>
        <div>
          {this.state.data.map((v, i) => {
            return (
              <div key={i} onClick={() => alert(`点击:${v}`)}>
                {v}
              </div>
            );
          })}
        </div>
      </Luo>,
      <button key="1" onClick={() => this.onCanUp()}>
        noUp:{String(this.state.noUp)}
      </button>,
      <button key="2" onClick={() => this.onCanDown()}>
        noDown:{String(this.state.noDown)}
      </button>,
    ];
  }
}

ReactDom.render(<Test />, document.getElementById('box'));
