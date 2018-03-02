import {Component} from "rainbowui-core";
import {Util} from "rainbow-foundation-tools";
import config from "config";
import PropTypes from 'prop-types';

export default class TimeLineItem extends Component {

	renderComponent(){
		return (
			<li className="timeline-item">
				<div className={"timeline-badge " + this.props.styleClass}><i className={this.props.icon} /></div>
				<div className="timeline-panel">
					<div className="timeline-heading">
						<h4 className="timeline-title">{this.props.title}</h4>
						<p><small className="text-muted"><i className="glyphicon glyphicon-time" />{this.getDateTime()}</small></p>
					</div>
					<div className="timeline-body">
						<p>{this.getContent()}</p>
					</div>
				</div>
			</li>
		);
	}

	getContent(){
		let {content} = this.props;
		if(Util.isArray(content)){
			let contentArray = [];
			$.each(content, (index, element) => {
				contentArray.push(<div>{element}</div>);
			});
			return contentArray;
		}
		return this.props.content;
	}

	getDateTime(){
		let {dateTime, format} = this.props;
		if(dateTime != undefined){
			return moment(dateTime, config.DEFAULT_DATETIME_SUBMIT_FORMATER).format(format);
		}
	}

};


/**
 * TimeLineItem component prop types
 */
TimeLineItem.propTypes = $.extend({}, Component.propTypes, {
	icon: PropTypes.string,
	title: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
	dateTime: PropTypes.string,
	//format: PropTypes.string,
	styleClass: PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"])
});

/**
 * Get timeLineItem component default props
 */
TimeLineItem.defaultProps = $.extend({}, Component.defaultProps, {
	styleClass: config.DEFAULT_STYLE_CLASS,
	icon: "glyphicon glyphicon-time"
});