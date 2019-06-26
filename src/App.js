import React from 'react';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import {Icon, notification} from 'antd';
import './App.css';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
class App extends React.Component {
  constructor(props){
    super(props);
    // initial state
    this.state = {
      videos: [],
      search: true,
      selectedVideo: {}
    };
    
    this.welcome();
  }
  welcome = () => {
    console.log(`API_KEY`, API_KEY);
    notification.open({
        message: 'Hey nice to see you here',
        description: 'Let us start by searching for some videos',
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />
    })
  };
  videoSearch(term) {
    console.log(term);
    if(this.state.search) {
      YTSearch({key: API_KEY, term}, (result)=>{
        try {
          console.log(result);
          if(result && result.data && result.data.error.message) {
            console.log('result',result);
            throw new Error('YTSearch error');
          }
          this.setState({videos: result, selectedVideo: result[0]});
          console.log(this.state.videos);
        } catch(err) {
          console.log(`YTSearch error : `,err);
          notification.error({
            message: "Daily Limit Exceeded",
            description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then."
          });
        }
      });
    }
  }

  handleChange = (value)=>{
    setTimeout(()=>{
      if( value === ''){
        this.setState({ videos: [], selectedVideo: null });
        return;
      }

      if( this.state.search ) {
        this.videoSearch( value );
      }

      setTimeout( () => {
        this.setState({ search: true });
      }, 5000);
    }, 2000);
  };

  render() {
    return (
      <div style={{ "display": "flex", "flexDirection": "column"  }}>
        <div style={{ "display": "flex", "justifyContent": "space-between", "background": "#123456"}}>
          <h1 style={{ "color": "#fff", "alignSelf": "center", "flexBasis": "4", "paddingTop": "20px", "paddingLeft": "30px" }}>YTSearch <Icon type={"search"}/></h1>
          <SearchBar videos={ this.state.videos } video={ this.state.selectedVideo } onChange={ this.handleChange } handleSearch={ (video) => { this.setState({ selectedVideo: this.state.videos[video], search: false })}}/>
        </div>
        <div style={{ "display" : "flex" }}>
          <VideoDetail video={ this.state.selectedVideo }/>
          <VideoList
              videos={ this.state.videos }
              onVideoSelect={ ( userSelected ) => { this.setState({ selectedVideo: this.state.videos[ userSelected ] }) }}
          />
        </div>
      </div>
    );
  }
}

export default App;
