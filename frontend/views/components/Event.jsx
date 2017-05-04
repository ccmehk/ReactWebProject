var React = require('react');
var Modal = require('react-bootstrap/lib/Modal');
var ClassNames = require('classnames')

class Event extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			events: [],
			sortCol: "name",
			showModal: false,
			event: {
				id: -1,
				name: "",
				date: -1,
				location: "",
				price: -1,
				image_url: "",
				org_id: -1
			},
			eventUsers: [],
			orgUsers: [],
			remainUsers: []
		};

		this.sortColumn = this.sortColumn.bind(this);
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.update = this.update.bind(this);
		this.calcRemainUsers = this.calcRemainUsers.bind(this);
	}

	close() {
		this.setState({showModal: false});
	}

	open(event) {
		this.setState({event: event});
		fetch("http://localhost:3000/api/event/" + event.id + "/user").then(response => response.json()).then(json => {
			this.setState({eventUsers: json});
			this.calcRemainUsers(json, this.state.orgUsers)
		});
		this.setState({showModal: true});
	}

	calcRemainUsers(eventUsers, orgUsers) {
		console.log("calcRemainUsers");
		console.log(eventUsers);
		console.log(orgUsers);
		var remainUsers = orgUsers.slice();;
		for (var i = 0; i < eventUsers.length; ++i) {
			console.log(eventUsers[i].id);
			for (var j = 0; j < remainUsers.length; ++j) {
				if (eventUsers[i].id == remainUsers[j].id) {
					remainUsers.splice(j, 1);
				}
			}
		}
		this.setState({remainUsers: remainUsers});
		console.log(remainUsers);
	}

	update(evtId, usrId) {
		console.log("main update");
		console.log(evtId);
		console.log(usrId);
		var that = this;
		fetch("http://localhost:3000/api/event/" + evtId + "/user", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'userId=' + usrId
		}).then(function(res) {
			console.log(res);
			if (res.status == 201) {
				that.open(that.state.event);
			} else {
				alert(res);
			}
		})
	}

	sortColumn(column) {
		var param = "";
		switch (column) {
			case "NAME":
			case "DATE":
			case "LOCATION":
			case "PRICE":
				param = column.toLowerCase();
				break;
		}
		if (param == this.state.sortCol) {
			param = "-" + param;
		}
		this.state.sortCol = param;
		fetch("http://localhost:3000/api/event?filter=1&sort=" + param).then(response => response.json()).then(json => {
			this.setState({events: json});
			console.log(this.state.events);
		});
	}

	componentDidMount() {
		fetch("http://localhost:3000/api/event?filter=1&sort=" + this.state.sortCol).then(response => response.json()).then(json => {
			this.setState({events: json});
			console.log(this.state.events);
			console.log(this.state.sortCol);
		});
		fetch("http://localhost:3000/api/organization/1/user").then(response => response.json()).then(json => {
			this.setState({orgUsers: json});
		});
	}

	render() {
		return (
			<div className="event">
				<div className="container">
					<div className="row">
						<div className="col-md-12 header">
							<h1>Events</h1>
							<div className="categories">
								<span className={ClassNames('btn badge', {
									asc: this.state.sortCol == 'name'
								}, {
									desc: this.state.sortCol == '-name'
								})} onClick={() => this.sortColumn('NAME')}>Name</span>
								<span className={ClassNames('btn badge', {
									asc: this.state.sortCol == 'date'
								}, {
									desc: this.state.sortCol == '-date'
								})} onClick={() => this.sortColumn('DATE')}>Date</span>
								<span className={ClassNames('btn badge', {
									asc: this.state.sortCol == 'location'
								}, {
									desc: this.state.sortCol == '-location'
								})} onClick={() => this.sortColumn('LOCATION')}>Location</span>
								<span className={ClassNames('btn badge', {
									asc: this.state.sortCol == 'price'
								}, {
									desc: this.state.sortCol == '-price'
								})} onClick={() => this.sortColumn('PRICE')}>Price</span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-9">
							{this.state.events.map((event, i) => <EventRow key={i} data={event} open={this.open}/>)}
						</div>
						<div className="col-xs-3"></div>
					</div>
				</div>
				<EventModalView show={this.state.showModal} onHide={this.close} update={this.update} event={this.state.event} eventUsers={this.state.eventUsers} remainUsers={this.state.remainUsers}/>
			</div>
		);
	}
}

class EventModalView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem1: null,
			selectedItem2: null
		}
		this.removeFromGuess = this.removeFromGuess.bind(this);
		this.addToGuess = this.addToGuess.bind(this);
		this.handleOnChange1 = this.handleOnChange1.bind(this);
		this.handleOnChange2 = this.handleOnChange2.bind(this);
	}

	removeFromGuess() {
		console.log("removeFromGuess");
	}

	addToGuess() {
		console.log("addToGuess");
		console.log(this.state.selectedItem2);
		if (this.state.selectedItem2 == null) {
			alert("Please select an item");
		} else {
			this.props.update(this.props.event.id, this.state.selectedItem2);
		}
	}

	handleOnChange1(event) {
		console.log("handleOnChange1");
		this.setState({selectedItem1: event.target.value});
	}

	handleOnChange2(event) {
		console.log("handleOnChange2");
		this.setState({selectedItem2: event.target.value});
	}

	render() {
		return (
			<div>
				<Modal show={this.props.show} onHide={this.props.onHide}>
					<Modal.Header closeButton>
						<Modal.Title>Event: {this.props.event.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<div className="row">
							<div className="col-lg-5">
								<h5 className="text-center">Assigned Event Guess</h5>
								<div className="form-group">
									<div className="input-group">
										<input id="box1Filter" type="text" placeholder="Filter" className="form-control"/>
										<span className="input-group-btn">
											<button id="box1Clear" className="btn" type="button">x</button>
										</span>
									</div>
								</div>

								<div className="form-group">
									<select id="box1View" className="form-control" size="20" onChange={this.handleOnChange1}>
										{this.props.eventUsers.map((user, i) => <option key={i} value={user.id}>{user.name}</option>)}
									</select>
									<hr/>
									<div className="alert alert-block">
										<span id="box1Counter" className="countLabel">Showing {this.props.eventUsers.length}
											of {this.props.eventUsers.length}</span>
									</div>
								</div>

							</div>

							<div className="col-lg-2">
								<div className="btn-group btn-group-vertical swap-btn-group">
									<button id="to2" type="button" className="btn btn-primary" onClick={this.removeFromGuess}>
										<i className="fa fa-arrow-right icon-white"></i>
									</button>
									<button id="to1" type="button" className="btn btn-danger" onClick={this.addToGuess}>
										<i className="fa fa-arrow-left icon-white"></i>
									</button>
								</div>
							</div>

							<div className="col-lg-5">
								<h5 className="text-center">Remain Users</h5>
								<div className="form-group">
									<div className="input-group">
										<input id="box2Filter" type="text" placeholder="Filter" className="form-control"/>
										<span className="input-group-btn">
											<button id="box2Clear" className="btn" type="button">x</button>
										</span>
									</div>
								</div>

								<div className="form-group">
									<select id="box2View" className="form-control" size="20" onChange={this.handleOnChange2}>
										{this.props.remainUsers.map((user, i) => <option key={i} value={user.id}>{user.name}</option>)}
									</select>
									<hr/>
									<div className="alert alert-block">
										<span id="box2Counter" className="countLabel">Showing {this.props.remainUsers.length}
											of {this.props.remainUsers.length}
										</span>
									</div>
								</div>

							</div>

						</div>
					</Modal.Body>
					<Modal.Footer></Modal.Footer>
				</Modal>
			</div>
		);
	}
}

class EventRow extends React.Component {
	constructor(props) {
		super(props);
		this.openModal = this.openModal.bind(this);
	};

	openModal() {
		console.log("modal click");
		console.log(this.props);
	}

	render() {
		const flex = {
			display: 'flex',
			marginBottom: 15
		};
		return (
			<div className="row event-row" style={flex} onClick={() => this.props.open(this.props.data)}>
				<div className="col-xs-3">
					<img className="event-image" src={`/public/${this.props.data.image_url}`}/>
				</div>
				<div className="col-xs-9">
					<div className="right-box">
						<div className="date">{this.props.data.date}</div>
						<h3>{this.props.data.name}</h3>
						<div>
							<i className="fa fa-map-marker"></i>
							<span className="small-space">{this.props.data.location}</span>
						</div>
						<div>
							<i className="fa fa-usd"></i>
							<span className="small-space">HKD {this.props.data.price}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Event;
