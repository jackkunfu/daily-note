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

### 渲染组件绑定事件
* <div onClick={this.fun.bind(this)}></div>
  - 如果fun方法里有用构造类的其他方法通过this调用，可能会报错
  - 绑定在dom上的方法去调用类中别的方法，可能this为undefined，所以应加上.bind(this)来绑定this


### 组件异步传递数据
* 用高阶组件给组件的子组件异步传递数据，貌似除了组件的子组件的render方法里能获取props传递来的数据的异步变化
```
// 在render中直接赋值给子组件属性
render(){
  // 直接赋值this.props给子组件的属性，可以监测到异步数据的变化
  return <Table dataSource={this.props.tableData} pagination={{total: this.props.total}} />
  // 也可以在render（）里获取到值，经过自己处理，赋值给子组件属性
  var data = this.props.tableData;
  var total = this.props.total;
  return <Table columns={this.state.columns} dataSource={data} pagination={{total: total}} />
}
```
* 直接放在constructor里给this.state，,render里使用this.state获取赋值，监测不大变化
```
  constructor(props){
    super(props);
    this.state = {
        data: this.props.tableData,  //  props异步来的数据触发不了这层更新
        total: 0
    }
  }

  // render里赋值this.state，监测不到props的变化
  return <Table dataSource={this.state.data} />   

```
* 可能是上层组件检测数据变化后，只触发子组件的render方法重绘，只有render能获取到上层组件props传递过来的异步数据


