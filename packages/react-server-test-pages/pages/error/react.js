import {RootElement} from "react-server";
import {Component} from "react";

class InteractiveComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {clicked: false};
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.setState({clicked: true});
	}
	render() {
		if (this.state.clicked) {
			return <div>{this.props.surprise ? this.props.surprise : "It worked!"}</div>;
		} else {
			return <div onClick={this.onClick}>{this.props.children}</div>;
		}
	}
}

/*eslint-disable*/
class BadRenderComponent extends Component {
	render() {
		//let's use an undefined variable
		return <div>
			{poop}
			{this.props.children}
		</div>
	}
}

class BadlyMountedComponent extends Component {
	componentDidMount() {
		//do something evil
		3 + poop;
	}
	render() {
		return <div>
			{this.props.children}
		</div>
	}
}

class ComponentThatUsesABadRef extends Component {
	componentDidMount() {
		this.refs.bad.innerHTML = "I am dying";
		this.refs.worse.innerHTML = "death";
		this.refs.bad.innerHTML = "I am getting better!"; //won't run
	}
	render() {
		return <div>
			<div ref="bad">I am evil</div>
			{this.props.children}
		</div>
	}
}
/*eslint-enable*/

export default class ReactErrorsPage {
	getElements() {
		return [
			<RootElement>
				<InteractiveComponent>This should be interactive</InteractiveComponent>
			</RootElement>,
			<RootElement>
				<InteractiveComponent>
					You probably won't even see me
					<BadRenderComponent>b/c I am evil!</BadRenderComponent>
				</InteractiveComponent>
			</RootElement>,
			<RootElement>
				<InteractiveComponent surprise="Psych!">
					This one might not be interactive anymore
					<BadlyMountedComponent>Because of me :(</BadlyMountedComponent>
				</InteractiveComponent>
			</RootElement>,
			<RootElement>
				<ComponentThatUsesABadRef/>
			</RootElement>,
			<RootElement>
				<div>Should see this!</div>
			</RootElement>,
			<RootElement>
				<InteractiveComponent>This should also be interactive</InteractiveComponent>
			</RootElement>,
		]
	}
}
