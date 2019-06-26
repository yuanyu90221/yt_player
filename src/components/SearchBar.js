import React, {Component} from 'react';
import { AutoComplete, Button, Icon } from 'antd';
const Option = AutoComplete.Option;
class SearchBar extends Component{
  state = {
    videos: []
  };
  componentDidUpdate(prevProps){
    if(this.props.videos && prevProps.videos !== this.props.videos){
      this.setState({videos: this.props.videos});
    }
  }
  onSelect = ( value, index ) => {
    let val = parseInt(index.key, 10);
    this.props.handleSearch(val);
  };

  render() {
    return (
      <div style={{"textAlign": "cetner", "background":"#123456", "padding": "35px" }}>
        <AutoComplete
          size={"large"}
          style={{width:400}}
          onSelect={this.onSelect}
          onChange={this.props.onChange}
          placeholder={"Search Video"}
        >
          { this.state.videos.map((video, index)  => <Option key={ index } >{ video.snippet.title }</Option> ) }
        </AutoComplete>
        <Button tyle={{ "marginLeft":"5px" }} size={"large"}><Icon type={"search"}/></Button>        
      </div>
    )
  }
};

export default SearchBar;