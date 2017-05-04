var React = require('react');

const divStyle = {
	float: 'left'
};

class Cover extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		fetch("http://localhost:3000/api/organization/1").then(response => response.json()).then(json => {
			this.setState({data: json});
		});
	}

	render() {
		return (
			<div className="container cover-container">
				<div className="row cover-profile">
					<div className="col-md-12">
						<div style={divStyle} className="cover-profile-bg">
							<div className="cover-overlap"></div>
							<img className="cover-profile-bg-img" src={`/public/${this.state.data.cover_image_url}`}/>
						</div>
						<img style={divStyle} className="cover-profile-image thumbnail" src={`/public/${this.state.data.profile_image_url}`}/>

						<div className="cover-profile-details">
							<h1>{this.state.data.name}
								<span>{this.state.data.description}</span>
							</h1>
						</div>
						<div className="clearfix"></div>
						<div className="cover-profile-headline">
							<div className="left-align">
								<div>
									<i className="fa fa-building-o"></i>
									<span>Founded in {this.state.data.created_at}</span>
								</div>
								<div>
									<i className="fa fa-map-marker"></i>
									<span>{this.state.data.location}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
  
}

export default Cover;
