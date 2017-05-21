import React from 'react';
import PropTypes from 'prop-types';
import IScroll from 'iscroll/build/iscroll-probe';

import iconSldown from './assets/icon_sldown.png';
import iconSlup from './assets/icon_slup.png';
import iconLoading from './assets/loading.gif';

import './index.css';

class IscrollLuo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yesDown: false, // 是否已到了下拉刷新的高度
      yesUp: false, // 是否已到了上拉加载的高度
      data: null, // 数据缓存,
      loadingDownShow: false, // 是否处于刷新中状态
      loadingUpShow: false, // 是否属于加载中状态
      iscrollOptions: { // iscroll 所需参数
        probeType: 3,
        preventDefault: false,
      },
      options: {
        backgroundColor: '#f5f5f5', // 背景颜色
        fontColor: '#888888', // 文字颜色
        beyondHeight: 30, // 超过此长度后触发下拉或上拉,单位px
        pulldownInfo: '下拉刷新',
        pulldowningInfo: '刷新中…',
        pullupInfo: '加载更多',
        pullupingInfo: '加载中…'
      }
    };
    this.timer = null;
    this.myScroll = null; // 保存当前iscroll实例
    this.iState = { // 自定义的各种状态
      mousedown: false,
      mouseenter: false,
      pulldowntype: false,
      pulluptype: false,
    };
  }

  // 组件挂载完毕之前触发 初始化一些参数
  componentWillMount() {
    if(this.props.options) {
      this.setState({
        options: Object.assign({}, this.state.options, this.props.options),
      });
    }
    if(this.props.iscrollOptions) {
      this.setState({
        iscrollOptions: Object.assign({}, this.state.iscrollOptions, this.props.iscrollOptions),
      });
    }
  }

  // 组件初始化完毕时触发
  componentDidMount() {
    this.myScroll = new IScroll(`#${this.props.id}_warpper`, this.state.iscrollOptions);
    this.myScroll.on('scroll', () => {

      const myScroll = this.myScroll;

      if(myScroll.y >= this.state.options.beyondHeight && !this.state.yesDown) {
        this.setState({
          yesDown: true,
        });
        this.iState.pulldowntype = true;
      } else if (myScroll.y > 0 && myScroll.y < this.state.options.beyondHeight && this.state.yesDown) {
        this.setState({
          yesDown: false,
        });
        if(!this.iState.mousedown) {
          this.iState.pulldowntype = false;
        }
      } else if (myScroll.y < myScroll.maxScrollY && myScroll.y > myScroll.maxScrollY - this.state.options.beyondHeight && this.state.yesUp) {
        this.setState({
          yesUp: false,
        });
        if(!this.iState.mousedown) {
          this.iState.pulluptype = false;
        }
      } else if (myScroll.y < myScroll.maxScrollY - this.state.options.beyondHeight && !this.state.yesUp) {
        this.setState({
          yesUp: true,
        });
        this.iState.pulluptype = true;
      }
    });

    this.myScroll.on('scrollEnd', () => {
      const myScroll = this.myScroll;
      if(this.iState.mouseenter) {
        return;
      }
      if(this.iState.pulldowntype) {
        if(this.props.onPullDownRefresh) {
          this.setState({
            loadingDownShow: true,
            loadingUpShow: false,
          });
          this.iState.pulldowntype = false;
          this.props.onPullDownRefresh();
        }
      } else if (this.iState.pulluptype) {
        if(this.props.onPullUpLoadMore) {
          this.setState({
            loadingDownShow: false,
            loadingUpShow: true,
            pulluptype: false,
          });
          this.iState.pulluptype = false;
          this.props.onPullUpLoadMore();
        }
      }
    });

    this.setState({
      data: this.props.children,
    });
  }

  /* children内容改变时触发,表示已完成了刷新或加载 */
  componentWillReceiveProps(nextProps) {
    if(this.props.children !== nextProps.children) {
      this.setState({
        data: nextProps.children,
        loadingDownShow: false,
        loadingUpShow: false,
      }, () => this.onRefresh());
    }
  }

  /* 组件即将销毁时触发，销毁当前iscroll实例 */
  componentWillUnmount() {
    this.myScroll.destroy();
  }

  /** 刷新ISCROLL **/
  onRefresh() {
    const myScroll = this.myScroll;
    console.log('是什么；', this, myScroll);
    window.clearTimeout(this.timerRefresh);
    this.timerRefresh = window.setTimeout(() => {
      myScroll.refresh();
    }, 200);
  }

  onMouseDown() {
    console.log('mouseDOwn了');
    this.iState.mousedown = true;
  }

  onMouseUp() {
    console.log('触发几次');
    if(!this.iState.mousedown) {
      return;
    }

    this.iState.mousedown = false;

    const myScroll = this.myScroll;
    if(myScroll.y >= this.state.options.beyondHeight) {
      if(this.props.onPullDownRefresh) {
        this.setState({
          loadingDownShow: true,
          loadingUpShow: false,
        });
        this.props.onPullDownRefresh();
      }
    } else if (myScroll.y < myScroll.maxScrollY - this.state.options.beyondHeight) {
      if(this.props.onPullUpLoadMore) {
        this.setState({
          loadingDownShow: false,
          loadingUpShow: true,
        });
        this.props.onPullUpLoadMore();
      }
    }
  }

  onMouseover() {
    this.iState.mouseenter = true;
  }

  onMouseLeave() {
    this.iState.mouseenter = false;
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className ? `iscroll-luo-box ${this.props.className}` : 'iscroll-luo-box'}
        style={{ backgroundColor: this.state.options.backgroundColor }}
        onMouseDown={() => this.onMouseDown()}
        onMouseUp={() => this.onMouseUp()}
        onTouchStart={() => this.onMouseDown()}
        onTouchEnd={() => this.onMouseUp()}
        onMouseEnter={() => this.onMouseover()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        <div className={this.state.loadingDownShow ? 'sl_down sl_show' : 'sl_down'} style={{ backgroundColor: this.state.options.backgroundColor, color: this.state.options.fontColor }}><img src={iconLoading} />{this.state.options.pulldowningInfo}</div>
        <div
          id={`${this.props.id}_warpper`}
          className="sl_scroller"
        >
          <div>
            <div className="scroller-pullDown">
              <span className={this.state.yesDown ? 'icon reverse_icon' : 'icon'}><img src={iconSldown} /></span>
              <span className = "msg" style={{ color: this.state.options.fontColor }}>{this.state.options.pulldownInfo}</span>
            </div>
            <div className="scroller-content">{this.state.data}</div>
            <div className="scroller-pullUp">
              <span className={this.state.yesUp ? 'icon reverse_icon' : 'icon'}><img src={iconSlup} /></span>
              <span className = "msg" style={{ color: this.state.options.fontColor }}>{this.state.options.pullupInfo}</span>
            </div>
          </div>
        </div>
        <div className={this.state.loadingUpShow ? 'sl_up sl_show' : 'sl_up'} style={{ backgroundColor: this.state.options.backgroundColor, color: this.state.options.fontColor }}><img src={iconLoading} />{this.state.options.pullupingInfo}</div>
      </div>
    );
  }
}

IscrollLuo.propTypes = {
  id: PropTypes.string,
  children: PropTypes.object,
  options: PropTypes.object,
  iscrollOptions: PropTypes.object,
  className: PropTypes.string,
  onPullDownRefresh: PropTypes.func, // 下拉刷新
  onPullUpLoadMore: PropTypes.func, // 上拉加载更多
};

export default IscrollLuo;
