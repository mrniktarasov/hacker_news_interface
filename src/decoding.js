import SanitizedHTML from 'react-sanitized-html';
import React from "react";


export function getDate(time) {
    const dateObject = new Date(time*1000);
    const options = {
        year: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    return dateObject.toLocaleString('en-US', options);
}

export function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

export function createSanitizedHTML(html) {
    const options = {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
        allowedAttributes: {
            'a': ['href']
        },
    };
    return (
      <SanitizedHTML
        html={html}
        allowedTags={options.allowedTags}
        allowedAttributes={options.allowedAttributes}
      />
    );
}