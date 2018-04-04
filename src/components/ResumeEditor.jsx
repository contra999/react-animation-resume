
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import marked from 'marked';

import styles from './ResumeEditor.css'

export default class ResumeEditor extends Component {

  static propTypes = {
    enableHtml: PropTypes.bool.isRequired,
    markdown: PropTypes.string.isRequired
  }

  goTop() {
    this._container.scrollTop = 0;
  }

  goBottom() {
    this._container.scrollTop = 100000;
  }

  render() {
    const { enableHtml, markdown } = this.props;
    const result = enableHtml ? marked(markdown) : markdown;
    return (
      <div
        className={classNames('resumeEditor', {
          [styles.htmlMode]: enableHtml  // 对象计算属性
        })}
        ref={ref => this._container = ref}  // 无状态组件没有不支持 ref
      >
        {
          enableHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: result }}
            ></div>
          ) : (
              <pre>{result}</pre>
            )
        }
      </div>
    );
  }
}