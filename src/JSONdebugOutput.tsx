import React from 'react';
import styles from './jsondebugoutput.module.scss';

function syntaxHighlight(json: string) {
    if (!json) return ''; // no JSON from response
    json = json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = styles.number;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = styles.key;
            } else {
                cls = styles.string;
            }
        } else if (/true|false/.test(match)) {
            cls = styles.boolean;
        } else if (/null/.test(match)) {
            cls = styles.null;
        }
        return `<span class="${cls}">${match}</span>`;
    });
}

export default function JsonDebugOutput({ json, title = 'debug' }: { json: any; title?: string }) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <pre
                className={styles.pre}
                dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(JSON.stringify(json, undefined, 4)),
                }}
            />
        </div>
    );
}
