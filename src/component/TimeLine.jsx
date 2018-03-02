import { Component } from "rainbowui-core";
import TimeLineItem from "./TimeLineItem";
import { Util } from "rainbow-foundation-tools";
import config from "config";
import PropTypes from 'prop-types';
import "../css/TimeLine.css";

export default class TimeLine extends Component {

	renderComponent() {
		if ("horizontal" == this.props.layout) {
			return this.renderHorizontalTimeLine();
		} else {
			return this.renderVerticalTimeLine();
		}
	}

	renderHorizontalTimeLine() {
		return (
			<div style={{ display: "inline-block", width: "auto", "overflow-y": "auto" }}>
				<ul className={"timeline timeline-horizontal"}>
					{this.renderTimeLine()}
				</ul>
			</div>
		);
	}

	renderVerticalTimeLine() {
		return (
			<ul className="timeline">
				{this.renderTimeLine()}
			</ul>
		);
	}

	renderTimeLine() {

		let { dataSource, children, format } = this.props;

		if (dataSource) {
			return this.renderTimeLineDataSource();
		} else {
			if (React.Children.count(children) == 0) { return null; }

			else if (React.Children.count(children) == 1) {
				let newChildren = { ...children };
				newChildren.props = { ...children.props };
				if (Util.isArray(children) && children.length == 1) {

					newChildren[0].props.format = format;
				} else {
					newChildren.props.format = format;
				}
				children = newChildren;
				return children;
			}
			else {
				return children.map(function (child, index) {
					let newChild = { ...child };
					newChild.props = { ...child.props };
					newChild.props.format = format;
					child = newChild;
					return child;
				});
			}
		}
	}

	renderTimeLineDataSource() {
		var _self = this, timeLineArray = [];

		this.getDataSource().forEach(function (item) {
			timeLineArray.push(
				<TimeLineItem {...
					{

						title: item.title,
						content: item.content,
						dateTime: item.dateTime,
						format: _self.props.format,
						styleClass: item.styleClass
					}
				} />
			);
		}, this);

		return timeLineArray;
	}

	getDataSource() {
		let { dataSource } = this.props;
		return Util.isFunction(dataSource) ? dataSource() : dataSource;
	}

};

TimeLine.propTypes = $.extend({}, Component.propTypes, {
	layout: PropTypes.oneOf()["horizontal", "vertical"],
	format: PropTypes.string,
	dataSource: PropTypes.array
});

TimeLine.defaultProps = $.extend({}, Component.defaultProps, {
	layout: "vertical",
	format: config.DEFAULT_DATETIME_FORMATER
});
