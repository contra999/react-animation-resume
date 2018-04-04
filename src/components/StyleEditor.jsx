
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Prism from 'prismjs';

import styles from './StyleEditor.css'

export default class StyleEditor extends Component {

  static propTypes = {
    code: PropTypes.string.isRequired,
  }

  goBottom() {
    this._container.scrollTop = 100000;
  }

  render() {
    const { code } = this.props
    const codeInStyleTag = `<style>${code}</style>`;
    const highlightedCode = Prism.highlight(code, Prism.languages.css);

    return (
      <div
        className='styleEditor'
        ref={ref => this._container = ref}
      >
        <div
          className={styles.code}
          dangerouslySetInnerHTML={{ __html: codeInStyleTag }}
        ></div>
        <pre
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        ></pre>
      </div>
    );
  }
}