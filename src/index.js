import React, { Component } from "react";
import ReactDOM from "react-dom";

import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

import _ from "lodash";
import YTSearch from "youtube-api-search";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const API_KEY = "***";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch("surfboards");
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, videos => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce(term => {
			this.videoSearch(term);
		}, 500);
		return (
			<div>
				<SearchBar onSearchTermSearch={videoSearch} />
				<div className='row'>
					<VideoDetail video={this.state.selectedVideo} />
					<VideoList
						onVideoSelect={selectedVideo =>
							this.setState({ selectedVideo })
						}
						videos={this.state.videos}
					/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
