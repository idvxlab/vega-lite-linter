import React, { Component } from 'react'
import './index.css'
// import Editor from "@monaco-editor/react";
// import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { MonacoDiffEditor } from 'react-monaco-editor';

export default class index extends Component {

    editorDidMount(editor, monaco) {
        editor.focus();
    }

    onChange(newValue, e) {
        try {
            this.props.onEndEdit(JSON.parse(newValue));
        } catch (error) {
            console.log("json parse error:" + error);
        }
    }

    endEditing = () => {
        if (this.node) {
            try {
                this.props.onEndEdit(JSON.parse(this.node.innerText));
            } catch (error) {
                console.log("json parse error:" + error);
            }
        }
    }

    handleEditorChange = (value, event) => {
        try {
            this.props.onEndEdit(JSON.parse(value));
        } catch (error) {
            console.log("json parse error:" + error);
        }
    }

    render() {
        let spec = this.props.spec;
        let originalSpec = this.props.originalSpec;
        const options = {
            // renderSideBySide: false
        };
        return (
            <div>
                {/* <Editor
                    height="80vh"
                    defaultLanguage="json"
                    defaultValue={JSON.stringify(spec, null, 2)}
                    onChange={this.handleEditorChange}
                    ref={(node) => this.node = node}
                /> */}

                <div>
                    <div className="editor-title">Original Code(read-only)</div>
                    <div className="editor-title">Current Code(editable)</div>
                </div>

                {/* <DiffEditor
                    height="80vh"
                    language="json"
                    original={JSON.stringify(spec, null, 2)}
                    modified={JSON.stringify(spec, null, 2)}
                /> */}

                <MonacoDiffEditor
                    height="80vh"
                    language="json"
                    original={JSON.stringify(originalSpec, null, 2)}
                    value={JSON.stringify(spec, null, 2)}
                    options={options}
                    onChange={this.onChange.bind(this)}
                    // editorDidMount={this.editorDidMount}
                />
            </div>
        )
    }
}
