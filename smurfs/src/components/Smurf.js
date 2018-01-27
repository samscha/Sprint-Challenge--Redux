import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editSmurf, deleteSmurf } from '../actions';

import EditSmurf from './EditSmurf';

import '../styles/Smurf.css';

class Smurf extends Component {
	state = {
		id: null,
		name: null,
		age: null,
		height: null,
		isEditing: null,
		isFavorited: null,
	};

	componentDidMount() {
		this.setState({
			id: this.props.smurf.id,
			name: this.props.smurf.name,
			age: this.props.smurf.age,
			height: this.props.smurf.height,
			isEditing: false,
			isFavorited: false,
		});
	}

	editButtonClickedHandler = _ => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	editSmurfHandler = editedSmurf => {
		this.props.editSmurf({ ...editedSmurf, id: this.state.id });
	};

	deleteSmurfButtonClicked = _ => {
		if (
			window.confirm(
				`Are you sure you want to evict ${this.state.name} from the village?`
			)
		)
			this.props.deleteSmurf(this.state.id);
	};

	favoriteButtonClicked = _ => {
		this.setState({ isFavorited: !this.state.isFavorited });
	};

	render() {
		return (
			<div
				className="Smurf"
				style={!this.state.isFavorited ? {} : { backgroundColor: '#ff4d5c' }}
			>
				<div className="ButtonsHeader">
					<div className="DeleteSmurfButtonContainer">
						<button
							className="DeleteSmurfButton"
							disabled={this.state.isEditing}
							onClick={this.deleteSmurfButtonClicked}
						>
							&#215;
						</button>
					</div>

					{!this.state.isEditing ? (
						<div className="EditButtonContainer">
							<button
								className="EditButton"
								onClick={this.editButtonClickedHandler}
							>
								edit
							</button>
						</div>
					) : (
						<div className="IsEditingSmurf">
							<div className="CancelEditButtonContainer">
								<button
									className="CancelEditButton"
									onClick={this.editButtonClickedHandler}
								>
									cancel
								</button>
							</div>
						</div>
					)}
					<div className="HeartButtonContainer">
						<button
							className="HeartButton"
							disabled={this.state.isEditing}
							onClick={this.favoriteButtonClicked}
							style={
								!this.state.isFavorited ? {} : { backgroundColor: '#ff9aa2' }
							}
						>
							&hearts;
						</button>
					</div>
				</div>

				<div className="SmurfMainContainer">
					{!this.state.isEditing ? (
						<div className="SmurfInfo">
							<li className="Smurf__listItem">
								<h2 className="Smurf__listItem--name">{this.state.name}</h2>
							</li>

							<li className="Smurf__listItem">
								<div className="Smurf__listItem--age">{this.state.age} old</div>
							</li>

							<li className="Smurf__listItem">
								<div className="Smurf__listItem--height">
									{this.state.height}
								</div>
							</li>
						</div>
					) : (
						<EditSmurf
							smurf={this.state}
							editSmurfHandler={this.editSmurfHandler}
						/>
					)}
				</div>

				<div className="SmurfsDetailedHeader" />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		//
	};
};

export default connect(mapStateToProps, { editSmurf, deleteSmurf })(Smurf);
