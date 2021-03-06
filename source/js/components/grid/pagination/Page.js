import React, {Component} from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

export default class Page extends Component {


    render() {
        let el;

        const className = classNames({
            "active": this.props.isActive
        });

        let text = this.props.pageText || this.props.pageNumber;


            el = (
                <li className={className}>
                    <a onClick={this.props.onClick.bind(this, this.props.pageNumber)} href="javascript:void(0)">
                        { text }
                    </a>
                </li>
            );


        return el;
    }
};

Page.propTypes = {
    pageText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    pageNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired
}
