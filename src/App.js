import React, { Component } from 'react';
// import logo from './logo.svg';
import styles from './App.css';
import { fullStyle, fullMarkdown } from './assets/data';
import StyleEditor from './components/StyleEditor';
import ResumeEditor from './components/ResumeEditor';

class App extends Component {

  state = {
    interval: 40,
    currentStyle: '',
    currentMarkdown: '',
    enableHtml: false,
    fullStyle,
    fullMarkdown
  }

  componentDidMount() {
    this.makeResume();
  }

  // TODO: cleatTimeout
  sleep(interval) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
  }

  async makeResume() {
    await this.progressivelyShowStyle(0);
    await this.progressivelyShowResume();
    await this.progressivelyShowStyle(1);
    await this.showHtml();
    await this.progressivelyShowStyle(2);
  }

  showHtml() {
    return new Promise((resolve, reject) => {
      this.setState({ enableHtml: true });
      // TODO: this.setState({ enableHtml: true }, () => resolve());
      resolve();
    });
  }

  async progressivelyShowStyle(n) {
    const { interval, fullStyle } = this.state;
    let style = fullStyle[n];
    for (let i = 0; i < style.length; i++) {
      let char = style.substring(i, i + 1) || ' ';
      // for 循环内部如果不用 await 获取不到更新后的 state 值
      let currentStyle = this.state.currentStyle + char;

      this.setState({ currentStyle }, () => {
        style.substring(i - 1, i) === "\n" && this._styleEditor.goBottom();
      });
      await this.sleep(interval);
    }
  }

  async progressivelyShowResume() {
    const { interval, fullMarkdown } = this.state;
    for (let i = 0; i < fullMarkdown.length; i++) {
      let currentMarkdown = fullMarkdown.substring(0, i + 1);
      let preChar = currentMarkdown[i - 1];
      // let preChar = currentMarkdown.slice(-2, -1);
      // let preChar = currentMarkdown[currentMarkdown.length - 2];
      this.setState({ currentMarkdown }, () => {
        preChar === "\n" && this._resumeEditor.goBottom();
      });
      await this.sleep(interval);
    }
  }

  render() {
    const {
      currentMarkdown,
      enableHtml,
      currentStyle
    } = this.state;

    return (
      <div id={styles.app}>
        <StyleEditor
          code={currentStyle}
          ref={ref => this._styleEditor = ref}
        />
        <ResumeEditor
          markdown={currentMarkdown}
          enableHtml={enableHtml}
          ref={ref => this._resumeEditor = ref}
        />
      </div>
    );
  }
}

export default App;
