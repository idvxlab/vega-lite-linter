import React, { Component } from 'react'
import './index.css'
// import Editor from "@monaco-editor/react";
// import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import MonacoEditor, { MonacoDiffEditor } from 'react-monaco-editor';

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
        let {spec, isPreview, linterSpec} = this.props;
        let originalSpec = this.props.originalSpec;
        const options = {
            renderSideBySide: false,
            readOnly: true
        };

        let editor = isPreview ? <MonacoDiffEditor
            height="79vh"
            language="json"
            original={JSON.stringify(originalSpec, null, 2)}
            value={JSON.stringify(linterSpec, null, 2)}
            options={options}
            onChange={this.onChange.bind(this)}
        // editorDidMount={this.editorDidMount}
        /> :
            <MonacoEditor
                height="79vh"
                language="json"
                value={JSON.stringify(spec, null, 2)}
                onChange={this.onChange.bind(this)}
                editorDidMount={this.editorDidMount}
            />

        return (
            <div>
                {editor}        
            </div>
        )
    }
}
