# iscroll-luo

React组件、下拉刷新上拉加载更多、PC端移动端支持

基于iscroll



## 1. 安装

````bash
npm install --save iscroll-luo
````

## 2. 使用

````bash
import React from 'react';
import IscrollLuo from 'iscroll-luo';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	data: [1, 2, 3],
	};
  }

  onDown() {
  	this.setState({
  		data: [1, 2, 3],
  	});
  }

  onUp() {
  	this.setState({
  		data: [...this.state.data, 1, 2, 3],
  	});
  }

  render() {
  	return (
		/** 务必用一个具有高度的容器包裹iscroll-luo组件 **/
  		<div style={{ height: '500px' }}>
  			<IscrollLuo
  				id='id'
  				onPullDownRefresh={() => this.onDown()}
            			onPullUpLoadMore={() => this.onUp()}
  			>
  				{
	  				this.state.data.map((v, i) =>
	  					<div key={i}>{v}</div>
	  				)
  				}						
  			</IscrollLuo>
  		</div>
  	);
  }
}
````

## 3. 参数

````bash
id  				// 必需 string	一个唯一的ID
onPullDownRefresh		// 可选	func	触发下拉刷新时的回调函数
onPullUpLoadMore		// 可选	func	触发上拉加载时的回调函数
className			// 可选 string	额外的class,会添加到iscroll-luo组件的包裹元素上
iscrollOptions			// 可选 object	iscroll的原生参数，初始化时会作为iscroll的options
options: {			// 可选 object	自定义参数
	backgroundColor: '#f5f5f5',	// 背景颜色，是滑动底层的背景颜色
	fontColor: '#888888', 		// 文字颜色，是下拉刷新、上拉加载那些文字的颜色
	beyondHeight: 30,		// 超过此长度后触发下拉或上拉,单位px
	pulldownInfo: '下拉刷新',	// 下拉刷新的文字
	pulldowningInfo: '刷新中…',	// 刷新中的文字
	pullupInfo: '加载更多',	// 上拉加载的文字
	pullupingInfo: '加载中…',		// 加载中的文字
}
````

## 4. 机制

传入iscroll-luo中的数据改变时，即this.props.children改变时，
iscroll-luo认为已经成功刷新或成功加载更多了，iscroll-luo会刷新内部状态

