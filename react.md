### React
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};     // this.state 在构建时声明
  }

  componentDidMount() {      // 组件加载渲染完成事件

  }

  componentWillUnmount() {    // 组件将要加载渲染完成之前事件

  }

  render() {
    return (
      <div>
        <h1 style={}>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

### 组件名称首字母必须大写

### 标签上增加类名用className     className="container"

### 标签上增加样式   
        style={{width:'100px',height: '100px'}}
        或者:
                var cssObj = {
                    width:'100px',
                    height: '100px'
                }
                style = {cssObj}

### this.props
this.props是调用组件时  组件标签上传入的 attrs 
例如Clock组件 <Clock data={a:'1'}/>
this.props.data的值就是传入的 {a:1}

### this.state
用es6写法时  在constructor方法里声明 
用React.createClass 声明组件时，在getInitialState方法中return对象返回

### defaultProps 
* 定义组件的默认props
* AppComponent.defaultProps = { key: value, ... }

